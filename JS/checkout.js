// ==========================================
// THE CLOSET — Checkout Page Logic
// ==========================================

// ---------- 1. Config (cart.js jaisa hi) ----------
const FREE_SHIP_LIMIT = 150;
const SHIP_COST = 15;

// ---------- 2. Product Data (mini version — sirf summary ke liye) ----------
const allProducts = [
    { id: 1,  name: "Premium Wool Coat",      category: "jackets",     price: 199, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80" },
    { id: 2,  name: "Classic White Sneakers", category: "shoes",       price: 89,  img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80" },
    { id: 3,  name: "Minimal Black Watch",    category: "accessories", price: 150, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
    { id: 4,  name: "Leather Biker Jacket",   category: "jackets",     price: 220, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80" },
    { id: 5,  name: "Urban Graphic Tee",      category: "tshirts",     price: 35,  img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80" },
    { id: 6,  name: "Aviator Sunglasses",     category: "sunglasses",  price: 65,  img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&q=80" },
    { id: 7,  name: "Classic Denim Jacket",   category: "jackets",     price: 95,  img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=200&q=80" },
    { id: 8,  name: "Running Sport Shoes",    category: "shoes",       price: 110, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&q=80" },
    { id: 9,  name: "Oversized Comfort Hoodie",category: "tshirts",    price: 55,  img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=80" },
    { id: 10, name: "Classic Leather Bag",    category: "accessories", price: 180, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80" },
    { id: 11, name: "Retro Round Sunglasses", category: "sunglasses",  price: 45,  img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=200&q=80" },
    { id: 12, name: "Essential Cotton Polo",  category: "tshirts",     price: 42,  img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80" }
];

// ---------- 3. Helpers ----------
const money = (n) => `$${n.toFixed(2)}`;
const getProduct = (id) => allProducts.find((p) => p.id === id);

function showToast(message, icon = "fa-check") {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    document.getElementById("toastContainer").appendChild(toast);
    setTimeout(() => {
        toast.classList.add("out");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ---------- 4. State ----------
let cart   = JSON.parse(localStorage.getItem("tc_cart")) || [];
let coupon = JSON.parse(localStorage.getItem("tc_coupon")) || null;

let selectedMethod = "cod";

// ---------- 5. Element References ----------
const emptyGuard     = document.getElementById("emptyGuard");
const checkoutLayout = document.getElementById("checkoutLayout");
const orderItems     = document.getElementById("orderItems");
const sumSubtotal    = document.getElementById("sumSubtotal");
const sumDiscount    = document.getElementById("sumDiscount");
const discountLine   = document.getElementById("discountLine");
const discountLabel  = document.getElementById("discountLabel");
const sumShipping    = document.getElementById("sumShipping");
const sumTotal       = document.getElementById("sumTotal");
const couponApplied  = document.getElementById("couponApplied");
const couponCodeTxt  = document.getElementById("couponCodeTxt");
const placeOrderBtn  = document.getElementById("placeOrderBtn");
const codNote        = document.getElementById("codNote");
const codAmount      = document.getElementById("codAmount");
const walletNote     = document.getElementById("walletNote");
const cardFields     = document.getElementById("cardFields");
const cartCountBadge = document.getElementById("cartCount");

const successOverlay = document.getElementById("successOverlay");
const confettiContainer = document.getElementById("confettiContainer");

// ---------- 6. Totals (cart.js jaisa hi logic) ----------
function getTotals() {
    const subtotal = cart.reduce((sum, i) => sum + getProduct(i.id).price * i.qty, 0);

    let discount = 0;
    let shipping = 0;

    if (subtotal > 0) {
        if (coupon && coupon.type === "percent" && subtotal >= coupon.min) {
            discount = subtotal * (coupon.value / 100);
        }
        const freeShip = (coupon && coupon.type === "ship") || subtotal >= FREE_SHIP_LIMIT;
        shipping = freeShip ? 0 : SHIP_COST;
    }

    return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}

// ---------- 7. Render Order Summary ----------
function renderSummary() {
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    cartCountBadge.textContent = count;

    // Empty guard
    if (cart.length === 0) {
        emptyGuard.style.display = "block";
        checkoutLayout.style.display = "none";
        return;
    }

    emptyGuard.style.display = "none";
    checkoutLayout.style.display = "grid";

    // Items
    orderItems.innerHTML = cart.map((item, i) => {
        const p = getProduct(item.id);
        return `
        <div class="order-item" style="animation-delay:${i * 0.08}s">
            <img src="${p.img}" alt="${p.name}">
            <div class="order-item-info">
                <h4>${p.name}</h4>
                <p>${p.category} &bull; Size: ${item.size} &bull; Qty: ${item.qty}</p>
            </div>
            <div class="order-item-price">${money(p.price * item.qty)}</div>
        </div>`;
    }).join("");

    // Coupon UI
    if (coupon) {
        couponApplied.style.display = "flex";
        couponCodeTxt.textContent = `${coupon.code} — ${coupon.label}`;
    } else {
        couponApplied.style.display = "none";
    }

    // Totals
    const t = getTotals();
    sumSubtotal.textContent = money(t.subtotal);

    if (t.discount > 0) {
        discountLine.style.display = "flex";
        discountLabel.textContent = `(${coupon.label})`;
        sumDiscount.textContent = `-${money(t.discount)}`;
    } else {
        discountLine.style.display = "none";
    }

    sumShipping.textContent = t.shipping === 0 ? "FREE 🎉" : money(t.shipping);
    sumTotal.textContent = money(t.total);
    codAmount.textContent = money(t.total);
}

// ---------- 8. Payment Method Switch ----------
const methodBodies = document.querySelectorAll(".pay-option");

document.getElementById("paymentMethods").addEventListener("click", (e) => {
    const option = e.target.closest(".pay-option");
    if (!option) return;

    methodBodies.forEach((o) => o.classList.remove("active"));
    option.classList.add("active");
    selectedMethod = option.dataset.method;

    // Notes toggle
    cardFields.classList.toggle("show", selectedMethod === "card");
    codNote.classList.toggle("show", selectedMethod === "cod");
    walletNote.classList.toggle("show", selectedMethod === "wallet");

    if (selectedMethod === "card") {
        showToast("Card payment selected 💳", "fa-credit-card");
    }
});

// ---------- 9. LIVE Card Preview 🔥 ----------
const cardPreview   = document.getElementById("cardPreview");
const cardNumberInp = document.getElementById("cardNumber");
const cardNameInp   = document.getElementById("cardName");
const cardExpiryInp = document.getElementById("cardExpiry");
const cardCvcInp    = document.getElementById("cardCvc");
const previewNumber = document.getElementById("previewNumber");
const previewName   = document.getElementById("previewName");
const previewExp    = document.getElementById("previewExp");
const previewCvc    = document.getElementById("previewCvc");
const brandIcon     = document.getElementById("cardBrandIcon");

// Card number formatting: 1234 5678 9012 3456
cardNumberInp.addEventListener("input", () => {
    let digits = cardNumberInp.value.replace(/\D/g, "").slice(0, 16);
    cardNumberInp.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Preview update
    previewNumber.textContent = cardNumberInp.value || "•••• •••• •••• ••••";

    // Brand detect: Visa = 4, Mastercard = 5
    if (digits.startsWith("4")) {
        brandIcon.className = "fab fa-cc-visa card-brand";
    } else if (digits.startsWith("5")) {
        brandIcon.className = "fab fa-cc-mastercard card-brand";
    } else if (digits.startsWith("3")) {
        brandIcon.className = "fab fa-cc-amex card-brand";
    } else {
        brandIcon.className = "far fa-credit-card card-brand";
    }
});

// Name on card
cardNameInp.addEventListener("input", () => {
    previewName.textContent = cardNameInp.value.toUpperCase() || "YOUR NAME";
});

// Expiry auto-format: MM/YY
cardExpiryInp.addEventListener("input", () => {
    let digits = cardExpiryInp.value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
        cardExpiryInp.value = digits.slice(0, 2) + "/" + digits.slice(2);
    } else {
        cardExpiryInp.value = digits;
    }
    previewExp.textContent = cardExpiryInp.value || "MM/YY";
});

// CVC focus = card flip!
cardCvcInp.addEventListener("focus", () => cardPreview.classList.add("flipped"));
cardCvcInp.addEventListener("blur",  () => cardPreview.classList.remove("flipped"));

cardCvcInp.addEventListener("input", () => {
    const digits = cardCvcInp.value.replace(/\D/g, "").slice(0, 3);
    cardCvcInp.value = digits;
    previewCvc.textContent = "•".repeat(digits.length) || "•••";
});

// ---------- 10. Validation ----------
function setError(inputId, hasError) {
    const input = document.getElementById(inputId);
    input.closest(".form-group").classList.toggle("error", hasError);
    return !hasError;
}

function validateForm() {
    let valid = true;

    // Shipping fields
    valid = setError("fullName", document.getElementById("fullName").value.trim().length < 3) && valid;
    valid = setError("phone", document.getElementById("phone").value.replace(/\D/g, "").length < 7) && valid;
    valid = setError("email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email").value.trim())) && valid;
    valid = setError("address", document.getElementById("address").value.trim().length < 5) && valid;
    valid = setError("city", document.getElementById("city").value.trim() === "") && valid;
    valid = setError("zip", document.getElementById("zip").value.trim() === "") && valid;
    valid = setError("country", document.getElementById("country").value === "") && valid;

    // Card fields (sirf card method par)
    if (selectedMethod === "card") {
        const numDigits = cardNumberInp.value.replace(/\D/g, "");
        valid = setError("cardNumber", numDigits.length !== 16) && valid;
        valid = setError("cardName", cardNameInp.value.trim().length < 3) && valid;

        const exp = cardExpiryInp.value;
        let expValid = /^\d{2}\/\d{2}$/.test(exp);
        if (expValid) {
            const mm = +exp.slice(0, 2);
            expValid = mm >= 1 && mm <= 12;
        }
        valid = setError("cardExpiry", !expValid) && valid;
        valid = setError("cardCvc", cardCvcInp.value.length !== 3) && valid;
    }

    return valid;
}

// Typing par error clear
document.querySelectorAll(".form-group input, .form-group select").forEach((inp) => {
    inp.addEventListener("input", () => {
        inp.closest(".form-group").classList.remove("error");
    });
});

// ---------- 11. Confetti Generator 🎊 ----------
function launchConfetti() {
    const colors = ["#8B5CF6", "#06B6D4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
    for (let i = 0; i < 80; i++) {
        const conf = document.createElement("div");
        conf.className = "confetti";
        conf.style.left = Math.random() * 100 + "%";
        conf.style.background = colors[Math.floor(Math.random() * colors.length)];
        conf.style.animationDuration = (Math.random() * 2.5 + 2) + "s";
        conf.style.animationDelay = Math.random() * 1.5 + "s";
        conf.style.width = (Math.random() * 8 + 6) + "px";
        conf.style.height = (Math.random() * 8 + 6) + "px";
        conf.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        confettiContainer.appendChild(conf);
    }
    // Cleanup
    setTimeout(() => { confettiContainer.innerHTML = ""; }, 6000);
}

// ---------- 12. Place Order ----------
placeOrderBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your cart is empty!", "fa-triangle-exclamation");
        return;
    }

    // Validation
    if (!validateForm()) {
        showToast("Please fix the highlighted fields!", "fa-triangle-exclamation");
        // Pehle error tak smooth scroll karo
        const firstError = document.querySelector(".form-group.error");
        if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    // Button loading state
    const btnText   = placeOrderBtn.querySelector(".btn-text");
    const btnLoader = placeOrderBtn.querySelector(".btn-loader");
    btnText.style.display = "none";
    btnLoader.style.display = "inline-flex";
    placeOrderBtn.disabled = true;

    // Order process simulate (1.8s)
    setTimeout(() => {
        const t = getTotals();

        // Order save karo localStorage mein (future orders page ke liye)
        const orderNum = `TC-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
        const order = {
            number: orderNum,
            items: [...cart],
            total: t.total,
            method: selectedMethod.toUpperCase(),
            name: document.getElementById("fullName").value.trim(),
            email: document.getElementById("email").value.trim(),
            date: new Date().toISOString()
        };
        const orders = JSON.parse(localStorage.getItem("tc_orders")) || [];
        orders.push(order);
        localStorage.setItem("tc_orders", JSON.stringify(orders));

        // Success details fill
        document.getElementById("successName").textContent = order.name.split(" ")[0];
        document.getElementById("orderNumber").textContent = orderNum;
        document.getElementById("orderTotal").textContent = money(t.total);
        document.getElementById("orderMethod").textContent =
            selectedMethod === "cod" ? "Cash on Delivery" :
            selectedMethod === "card" ? "Card Payment" : "Digital Wallet";
        document.getElementById("successEmail").textContent = order.email;

        // ETA (random 3-7 din)
        const eta = Math.floor(Math.random() * 5) + 3;
        document.getElementById("orderEta").textContent = `${eta}-${eta + 2} Days`;

        // Cart clear!
        cart = [];
        coupon = null;
        localStorage.setItem("tc_cart", JSON.stringify(cart));
        localStorage.setItem("tc_coupon", JSON.stringify(coupon));

        // Success overlay show
        successOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        launchConfetti();

        // Button reset
        btnText.style.display = "inline-flex";
        btnLoader.style.display = "none";
        placeOrderBtn.disabled = false;

        // Navbar badge reset
        cartCountBadge.textContent = "0";

    }, 1800);
});

// ---------- 13. Navbar Icons ----------
document.getElementById("wishIconBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const wishlist = JSON.parse(localStorage.getItem("tc_wishlist")) || [];
    showToast(`${wishlist.length} item(s) in your wishlist`, "fa-heart");
});

// ---------- 14. Init ----------
renderSummary();