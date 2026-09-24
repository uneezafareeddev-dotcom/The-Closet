// ============================================================
// THE CLOSET — MASTER SCRIPT (Har page par load hota hai)
// Navbar + Footer auto-inject | Badges sync | Preloader | Animations
// ============================================================

// ---------- 0a. Mini Toast Helper ----------
function miniToast(message, icon) {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(function () {
        toast.classList.add("out");
        setTimeout(function () { toast.remove(); }, 300);
    }, 2500);
}

// ---------- 0b. UNIFIED LAYOUT INJECTION ----------
(function () {

    // ---- Safety styles (badges har page par sahi dikhein) ----
    var style = document.createElement("style");
    style.textContent =
        '.nav-icons .icon-btn { position: relative; }' +
        '.wish-count {' +
        'position: absolute; top: -6px; right: -8px;' +
        'background: linear-gradient(135deg, #ec4899, #8B5CF6);' +
        'color: #fff; font-size: 0.62rem; font-weight: 700;' +
        'min-width: 18px; height: 18px; border-radius: 50px;' +
        'display: flex; align-items: center; justify-content: center;' +
        'padding: 0 4px; box-shadow: 0 3px 8px rgba(236,72,153,0.4); }';

    document.head.appendChild(style);

    // ---- Current page detect karo ----
    var pathParts = window.location.pathname.split("/");
    var currentPage = pathParts[pathParts.length - 1] || "index.html";
    if (currentPage === "" || currentPage === "/") currentPage = "index.html";

    function isActive(page) {
        if (page === "shop.html" && currentPage === "product.html") return true;
        return currentPage === page;
    }

    // ---- UNIFIED NAVBAR ----
    var navbar = document.getElementById("navbar");
    if (navbar) {
        navbar.innerHTML =
            '<div class="container nav-container">' +
                '<a href="index.html" class="logo">' +
                    '<i class="fas fa-gem logo-icon"></i> THE CLOSET' +
                '</a>' +
                '<nav class="nav-menu" id="navMenu">' +
                    '<ul class="nav-list">' +
                        '<li><a href="index.html" class="nav-link ' + (isActive("index.html") ? "active" : "") + '">Home</a></li>' +
                        '<li><a href="shop.html" class="nav-link ' + (isActive("shop.html") ? "active" : "") + '">Collection</a></li>' +
                        '<li><a href="about.html" class="nav-link ' + (isActive("about.html") ? "active" : "") + '">About</a></li>' +
                        '<li><a href="contact.html" class="nav-link ' + (isActive("contact.html") ? "active" : "") + '">Contact</a></li>' +
                    '</ul>' +
                    '<div class="nav-icons">' +
                        '<a href="shop.html" class="icon-btn" title="Search"><i class="fas fa-search"></i></a>' +
                        '<a href="wishlist.html" class="icon-btn" title="Wishlist">' +
                            '<i class="fas fa-heart"></i>' +
                            '<span class="wish-count" id="wishCount">0</span>' +
                        '</a>' +
                        '<a href="cart.html" class="icon-btn cart-btn" id="cartIconBtn" title="Cart">' +
                            '<i class="fas fa-shopping-bag"></i> <span class="cart-count" id="cartCount">0</span>' +
                        '</a>' +
                    '</div>' +
                '</nav>' +
                '<div class="hamburger" id="hamburger">' +
                    '<span class="bar"></span>' +
                    '<span class="bar"></span>' +
                    '<span class="bar"></span>' +
                '</div>' +
                '<span id="wishIconBtn" style="display:none"></span>' +
            '</div>';
    }

    // ---- UNIFIED FOOTER (Uneeza ki personal details ke saath) ----
    var footer = document.querySelector("footer.footer");
    if (footer) {
        footer.innerHTML =
            '<div class="container footer-container">' +
                '<div class="footer-col">' +
                    '<a href="index.html" class="logo"><i class="fas fa-gem logo-icon"></i> THE CLOSET</a>' +
                    '<p>Premium fashion, curated for those who dare to stand out. Elegance in every thread.</p>' +
                    '<div class="social-icons">' +
                        '<a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>' +
                        '<a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>' +
                        '<a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>' +
                        '<a href="#" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>' +
                    '</div>' +
                '</div>' +
                '<div class="footer-col">' +
                    '<h4>Quick Links</h4>' +
                    '<ul>' +
                        '<li><a href="index.html">Home</a></li>' +
                        '<li><a href="shop.html">Shop</a></li>' +
                        '<li><a href="wishlist.html">Wishlist</a></li>' +
                        '<li><a href="about.html">About Us</a></li>' +
                    '</ul>' +
                '</div>' +
                '<div class="footer-col">' +
                    '<h4>Contact Info</h4>' +
                    '<ul>' +
                        '<li><a href="contact.html"><i class="fas fa-map-marker-alt"></i> 123 Fashion Street, Karachi</a></li>' +
                        '<li><a href="mailto:uneezafareed@gmail.com"><i class="fas fa-envelope"></i> uneezafareed@gmail.com</a></li>' +
                        '<li><a href="tel:+923001234567"><i class="fas fa-phone"></i> +92 300 1234567</a></li>' +
                    '</ul>' +
                '</div>' +
                '<div class="footer-col">' +
                    '<h4>Newsletter</h4>' +
                    '<p>Subscribe for exclusive drops and offers.</p>' +
                    '<div class="newsletter-box">' +
                        '<input type="email" id="newsletterEmail" placeholder="Your email">' +
                        '<button id="newsletterBtn" aria-label="Subscribe"><i class="fas fa-paper-plane"></i></button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="footer-bottom">' +
                '<p>&copy; 2024 The Closet. All Rights Reserved. | Designed &amp; Developed by <strong style="color:#fff;">Uneeza Fareed</strong> with <i class="fas fa-heart"></i></p>' +
            '</div>';
    }

    // ---- Badges sync ----
    var cartCountBadge = document.getElementById("cartCount");
    if (cartCountBadge) {
        var savedCart = JSON.parse(localStorage.getItem("tc_cart")) || [];
        var totalQty = 0;
        for (var i = 0; i < savedCart.length; i++) {
            totalQty += savedCart[i].qty;
        }
        cartCountBadge.textContent = totalQty;
    }

    var wishCountBadge = document.getElementById("wishCount");
    if (wishCountBadge) {
        var savedWishlist = JSON.parse(localStorage.getItem("tc_wishlist")) || [];
        wishCountBadge.textContent = savedWishlist.length;
    }

    // ---- Newsletter ----
    var nlBtn = document.getElementById("newsletterBtn");
    if (nlBtn) {
        nlBtn.addEventListener("click", function () {
            var emailInput = document.getElementById("newsletterEmail");
            var email = emailInput.value.trim();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                miniToast("Please enter a valid email!", "fa-triangle-exclamation");
                return;
            }
            emailInput.value = "";
            miniToast("Subscribed! Welcome to the family 🎉", "fa-envelope-circle-check");
        });
    }

})();

// ==========================================
// 1. Preloader (BULLETPROOF — kabhi stuck nahi hoga!)
// ==========================================
function hidePreloader() {
    var preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.classList.add("hidden");
        setTimeout(function () {
            if (preloader.parentNode) preloader.remove();
        }, 600);
    }
}

window.addEventListener("load", hidePreloader);
setTimeout(hidePreloader, 2500); // Safety: 2.5s baad force-hide

// ==========================================
// 2. Typing Effect (sirf home page par)
// ==========================================
var typingText = document.getElementById("typing-text");

if (typingText) {
    var words = ["Autumn/Winter Collection 2024", "Premium Luxury Fashion", "Elevate Your Style"];
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function typeEffect() {
        var currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        var typeSpeed = 100;
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex++;
            typeSpeed = 500;
            if (wordIndex === words.length) wordIndex = 0;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
}

// ==========================================
// 3. Sticky Navbar
// ==========================================
var navbarEl = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    if (navbarEl) {
        if (window.scrollY > 50) {
            navbarEl.classList.add("sticky");
        } else {
            navbarEl.classList.remove("sticky");
        }
    }
});

// ==========================================
// 4. Mobile Menu Toggle
// ==========================================
var hamburger = document.getElementById("hamburger");
var navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    var menuLinks = document.querySelectorAll(".nav-list .nav-link, .nav-icons .icon-btn");
    for (var m = 0; m < menuLinks.length; m++) {
        menuLinks[m].addEventListener("click", function () {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    }

    window.addEventListener("resize", function () {
        if (window.innerWidth > 992) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
}

// ==========================================
// 5. Scroll Reveal Animation
// ==========================================
var revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    var windowHeight = window.innerHeight;
    for (var r = 0; r < revealElements.length; r++) {
        var elementTop = revealElements[r].getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            revealElements[r].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ==========================================
// 6. Scroll To Top Button
// ==========================================
var scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ==========================================
// 7. ESC Key = Mobile Menu Close
// ==========================================
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu && hamburger) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
});