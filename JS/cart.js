// ==========================================
// THE CLOSET — Cart Page Logic
// ==========================================

// ---------- 1. Coupons Config ----------
const FREE_SHIP_LIMIT = 150;
const SHIP_COST = 15;

const coupons = {
    "CLOSET10": { type: "percent", value: 10, label: "10% OFF",  min: 0 },
    "CLOSET20": { type: "percent", value: 20, label: "20% OFF",  min: 200 },
    "FREESHIP": { type: "ship",    value: 0,  label: "Free Shipping", min: 0 }
};

// ---------- 2. Product Data (shop.js jaisa hi — same products) ----------
const allProducts = [
    { id: 1,  name: "Premium Wool Coat",      category: "jackets",     price: 199, oldPrice: 249, rating: 5, badge: "New",  img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80" },
    { id: 2,  name: "Classic White Sneakers", category: "shoes",       price: 89,  oldPrice: 120, rating: 4, badge: "Sale", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80" },
    { id: 3,  name: "Minimal Black Watch",    category: "accessories", price: 150, oldPrice: 0,   rating: 5, badge: "",     img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
    { id: 4,  name: "Leather Biker Jacket",   category: "jackets",     price: 220, oldPrice: 280, rating: 5, badge: "Sale", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80" },
    { id: 5,  name: "Urban Graphic Tee",      category: "tshirts",     price: 35,  oldPrice: 45,  rating: 4, badge: "Sale", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80" },
    { id: 6,  name: "Aviator Sunglasses",     category: "sunglasses",  price: 65,  oldPrice: 0,   rating: 5, badge: "New",  img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80" },
    { id: 7,  name: "Classic Denim Jacket",   category: "jackets",     price: 95,  oldPrice: 0,   rating: 4, badge: "Hot",  img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80" },
    { id: 8,  name: "Running Sport Shoes",    category: "shoes",       price: 110, oldPrice: 0,   rating: 4, badge: "",     img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80" },
    { id: 9,  name: "Oversized Comfort Hoodie",category: "tshirts",    price: 55,  oldPrice: 0,   rating: 5, badge: "Hot",  img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80" },
    { id: 10, name: "Classic Leather Bag",    category: "accessories", price: 180, oldPrice: 220, rating: 5, badge: "New",  img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
    { id: 11, name: "Retro Round Sunglasses", category: "sunglasses",  price: 45,  oldPrice: 60,  rating: 4, badge: "Sale", img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&q=80" },
    { id: 12, name: "Essential Cotton Polo",  category: "tshirts",     price: 42,  oldPrice: 0,   rating: 4, badge: "",     img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" }
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

// ---------- 4. State + Storage (shop.js ke keys same hain) ----------
let cart   = JSON.parse(localStorage.getItem("tc_cart")) || [];
let coupon = JSON.parse(localStorage.getItem("tc_coupon")) || null;

const saveCart   = () => localStorage.setItem("tc_cart", JSON.stringify(cart));
const saveCoupon = () => localStorage.setItem("tc_coupon", JSON.stringify(coupon));

// ---------- 5. Element References ----------
const cartTableBody = document.getElementById("cartTableBody");
const cartHead      = document.getElementById("cartHead");
const cartActions   = document.getElementById("cartActions");
const emptyCart     = document.getElementById("emptyCart");
const summaryCard   = document.getElementById("summaryCard");
const shipProgress  = document.getElementById("shipProgress");
const shipMsg       = document.getElementById("shipMsg");
const progressFill  = document.getElementById("progressFill");

const sumSubtotal   = document.getElementById("sumSubtotal");
const sumDiscount   = document.getElementById("sumDiscount");
const discountLine  = document.getElementById("discountLine");
const discountLabel = document.getElementById("discountLabel");
const sumShipping   = document.getElementById("sumShipping");
const sumTotal      = document.getElementById("sumTotal");

const couponBox     = document.getElementById("couponBox");
const couponInput   = document.getElementById("couponInput");
const couponApply   = document.getElementById("couponApplyBtn");
const couponApplied = document.getElementById("couponApplied");
const couponCodeTxt = document.getElementById("couponCodeTxt");
const couponRemove  = document.getElementById("couponRemove");

const checkoutBtn   = document.getElementById("checkoutBtn");
const clearCartBtn  = document.getElementById("clearCartBtn");

const cartItems       = document.getElementById("cartItems");
const cartOverlay     = document.getElementById("cartOverlay");
const cartCountBadge  = document.getElementById("cartCount");
const cartDrawerCount = document.getElementById("cartDrawerCount");
const cartSubtotal    = document.getElementById("cartSubtotal");
const cartTotal       = document.getElementById("cartTotal");

// ---------- 6. Totals Calculator ----------
function getTotals() {
    const subtotal = cart.reduce((sum, i) => sum + getProduct(i.id).price * i.qty, 0);

    let discount = 0;
    let shipping = 0;

    if (subtotal > 0) {
        // Coupon discount
        if (coupon && coupon.type === "percent" && subtotal >= coupon.min) {
            discount = subtotal * (coupon.value / 100);
        }
        // Shipping rule
        const freeShip = (coupon && coupon.type === "ship") || subtotal >= FREE_SHIP_LIMIT;
        shipping = freeShip ? 0 : SHIP_COST;
    }

    return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}

// ---------- 7. Render Cart Page ----------
function renderCartPage() {
    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    // Navbar badge update
    cartCountBadge.textContent = count;
    cartCountBadge.classList.remove("pulse");
    void cartCountBadge.offsetWidth;
    cartCountBadge.classList.add("pulse");
    cartDrawerCount.textContent = `(${count})`;

    // ----- Empty state -----
    if (cart.length === 0) {
        emptyCart.style.display = "block";
        cartHead.style.display = "none";
        cartActions.style.display = "none";
        cartTableBody.innerHTML = "";
        summaryCard.style.display = "none";
        shipProgress.style.display = "none";
        return;
    }

    // ----- Show table + summary -----
    emptyCart.style.display = "none";
    cartHead.style.display = "grid";
    cartActions.style.display = "flex";
    summaryCard.style.display = "block";
    shipProgress.style.display = "block";

    // Rows render (staggered animation ke saath)
    cartTableBody.innerHTML = cart.map((item, i) => {
        const p = getProduct(item.id);
        return `
        <div class="cart-row" data-key="${item.id}||${item.size}" style="animation-delay:${i * 0.08}s">
            <div class="cart-product">
                <img src="${p.img}" alt="${p.name}">
                <div>
                    <h4>${p.name}</h4>
                    <p>${p.category} &bull; Size: ${item.size}</p>
                </div>
            </div>
            <div class="cart-price">${money(p.price)}</div>
            <div class="qty-box">
                <button class="qty-btn" data-action="minus">&minus;</button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" data-action="plus">+</button>
            </div>
            <div class="row-total">${money(p.price * item.qty)}</div>
            <button class="remove-btn" data-action="remove" title="Remove">
                <i class="fas fa-trash-can"></i>
            </button>
        </div>`;
    }).join("");

    // ----- Totals -----
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

    // Drawer totals bhi sync
    cartSubtotal.textContent = money(t.subtotal);
    cartTotal.textContent = money(t.total);

    // ----- Free Shipping Progress -----
    const remaining = FREE_SHIP_LIMIT - t.subtotal;
    const pct = Math.min((t.subtotal / FREE_SHIP_LIMIT) * 100, 100);
    progressFill.style.width = `${pct}%`;

    if (t.subtotal >= FREE_SHIP_LIMIT) {
        shipMsg.innerHTML = `🎉 <strong>Congratulations!</strong> You've unlocked <strong>FREE Shipping</strong>!`;
    } else {
        shipMsg.innerHTML = `Add <strong>${money(remaining)}</strong> more to get <strong>FREE Shipping</strong>! 🚀`;
    }

    // ----- Coupon UI -----
    renderCouponUI();
    saveCart();
}

// ---------- 8. Row Actions (event delegation) ----------
cartTableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const row = btn.closest(".cart-row");
    const [idStr, size] = row.dataset.key.split("||");
    const id = +idStr;
    const item = cart.find((i) => i.id === id && i.size === size);
    if (!item) return;

    if (btn.dataset.action === "plus") {
        item.qty++;
        showToast("Quantity updated", "fa-plus");
    }
    if (btn.dataset.action === "minus") {
        item.qty--;
        if (item.qty <= 0) {
            cart = cart.filter((i) => !(i.id === id && i.size === size));
            showToast("Item removed from cart", "fa-trash-can");
        }
    }
    if (btn.dataset.action === "remove") {
        cart = cart.filter((i) => !(i.id === id && i.size === size));
        showToast("Item removed from cart", "fa-trash-can");
    }

    renderCartPage();
    renderDrawer();
});

// ---------- 9. Clear Cart ----------
clearCartBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    cart = [];
    coupon = null;
    saveCart();
    saveCoupon();
    renderCartPage();
    renderDrawer();
    showToast("Cart cleared!", "fa-trash-can");
});

// ---------- 10. Coupon System ----------
function renderCouponUI() {
    if (coupon) {
        couponApplied.style.display = "flex";
        couponBox.style.display = "none";
        couponCodeTxt.textContent = `${coupon.code} — ${coupon.label}`;
    } else {
        couponApplied.style.display = "none";
        couponBox.style.display = "flex";
    }
}

couponApply.addEventListener("click", () => {
    const code = couponInput.value.trim().toUpperCase();

    if (!code) {
        showToast("Please enter a coupon code", "fa-triangle-exclamation");
        return;
    }
    if (!coupons[code]) {
        showToast("Invalid coupon code!", "fa-circle-xmark");
        couponInput.style.borderColor = "#ef4444";
        setTimeout(() => (couponInput.style.borderColor = ""), 1500);
        return;
    }

    const c = coupons[code];
    const subtotal = cart.reduce((sum, i) => sum + getProduct(i.id).price * i.qty, 0);

    if (subtotal < c.min) {
        showToast(`This coupon needs a minimum order of ${money(c.min)}`, "fa-triangle-exclamation");
        return;
    }

    coupon = { ...c, code };
    saveCoupon();
    renderCartPage();
    showToast(`Coupon applied — ${c.label}! 🎉`, "fa-tag");
});

couponRemove.addEventListener("click", () => {
    coupon = null;
    saveCoupon();
    renderCartPage();
    showToast("Coupon removed", "fa-tag");
});

// Enter key se bhi coupon apply ho
couponInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") couponApply.click();
});

// ---------- 11. Checkout Guard ----------
checkoutBtn.addEventListener("click", (e) => {
    if (cart.length === 0) {
        e.preventDefault();
        showToast("Your cart is empty!", "fa-triangle-exclamation");
    }
});

// ---------- 12. Cart Drawer (same as shop/product pages) ----------
function renderDrawer() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-cart-shopping"></i>
                <h4>Your cart is empty</h4>
                <p>Add some style to it!</p>
            </div>`;
        return;
    }

    cartItems.innerHTML = cart.map((item) => {
        const p = getProduct(item.id);
        return `
        <div class="cart-item">
            <img src="${p.img}" alt="${p.name}">
            <div class="cart-item-info">
                <h4>${p.name}</h4>
                <p class="cart-item-size">Size: ${item.size}</p>
                <p class="cart-item-price">${money(p.price)}</p>
                <div class="cart-item-qty">
                    <button class="qty-mini" data-action="minus" data-id="${item.id}" data-size="${item.size}">&minus;</button>
                    <span class="qty-mini-val">${item.qty}</span>
                    <button class="qty-mini" data-action="plus" data-id="${item.id}" data-size="${item.size}">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-action="remove" data-id="${item.id}" data-size="${item.size}">
                <i class="fas fa-trash-can"></i>
            </button>
        </div>`;
    }).join("");
}

cartItems.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = +btn.dataset.id;
    const size = btn.dataset.size;
    const item = cart.find((i) => i.id === id && i.size === size);
    if (!item) return;

    if (btn.dataset.action === "plus") item.qty++;
    if (btn.dataset.action === "minus") item.qty--;
    if (btn.dataset.action === "remove" || item.qty <= 0) {
        cart = cart.filter((i) => !(i.id === id && i.size === size));
        showToast("Item removed from cart", "fa-trash-can");
    }
    renderCartPage();
    renderDrawer();
});

const openCartDrawer  = () => { cartOverlay.classList.add("active");  document.body.style.overflow = "hidden"; };
const closeCartDrawer = () => { cartOverlay.classList.remove("active"); document.body.style.overflow = ""; };

document.getElementById("cartClose").addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", (e) => { if (e.target === cartOverlay) closeCartDrawer(); });

// ---------- 13. Navbar Icons ----------
document.getElementById("cartIconBtn").addEventListener("click", (e) => {
    e.preventDefault();
    openCartDrawer();
});

document.getElementById("wishIconBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const wishlist = JSON.parse(localStorage.getItem("tc_wishlist")) || [];
    showToast(`${wishlist.length} item(s) in your wishlist`, "fa-heart");
});

// ---------- 14. ESC Key ----------
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCartDrawer();
});

// ---------- 15. Init ----------
renderCartPage();
renderDrawer();