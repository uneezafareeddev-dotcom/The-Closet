// ==========================================
// THE CLOSET — About Page Logic
// (Stats Counter Animation)
// ==========================================

// ---------- 1. Animated Counters 🔢 ----------
const counters = document.querySelectorAll(".counter");
const statsSection = document.getElementById("statsSection");

let counterStarted = false; // sirf ek baar chale

function animateCounter(counter) {
    const target    = +counter.dataset.target;   // e.g. 500
    const suffix    = counter.dataset.suffix || ""; // e.g. "+"
    const duration  = 2000; // 2 seconds
    const startTime = performance.now();

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out effect (pehle fast, phir slow)
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        counter.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = target + suffix;
        }
    }

    requestAnimationFrame(update);
}

// Scroll par check karo ke stats section visible hua?
function checkCounters() {
    if (counterStarted || !statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Jab section 80% viewport mein aa jaye
    if (sectionTop < windowHeight * 0.8) {
        counterStarted = true;
        counters.forEach((counter, i) => {
            // Staggered start (ek ke baad ek)
            setTimeout(() => animateCounter(counter), i * 150);
        });
    }
}

window.addEventListener("scroll", checkCounters);
checkCounters(); // agar page load par hi visible ho

// ---------- 2. Navbar Cart Badge (localStorage se sync) ----------
const cart = JSON.parse(localStorage.getItem("tc_cart")) || [];
const cartCountBadge = document.getElementById("cartCount");

if (cartCountBadge) {
    cartCountBadge.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}