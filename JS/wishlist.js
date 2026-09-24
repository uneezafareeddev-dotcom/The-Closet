// ==========================================
// THE CLOSET — Wishlist Page Logic
// ==========================================

// ---------- 1. Product Data ----------
const allProducts = [
    { id: 1,  name: "Premium Wool Coat",      category: "jackets",     price: 199, oldPrice: 249, rating: 5, badge: "New",  sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
    { id: 2,  name: "Classic White Sneakers", category: "shoes",       price: 89,  oldPrice: 120, rating: 4, badge: "Sale", sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" },
    { id: 3,  name: "Minimal Black Watch",    category: "accessories", price: 150, oldPrice: 0,   rating: 5, badge: "",     sizes: [],                    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
    { id: 4,  name: "Leather Biker Jacket",   category: "jackets",     price: 220, oldPrice: 280, rating: 5, badge: "Sale", sizes: ["M", "L", "XL"],      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" },
    { id: 5,  name: "Urban Graphic Tee",      category: "tshirts",     price: 35,  oldPrice: 45,  rating: 4, badge: "Sale", sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80" },
    { id: 6,  name: "Aviator Sunglasses",     category: "sunglasses",  price: 65,  oldPrice: 0,   rating: 5, badge: "New",  sizes: [],                    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80" },
    { id: 7,  name: "Classic Denim Jacket",   category: "jackets",     price: 95,  oldPrice: 0,   rating: 4, badge: "Hot",  sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80" },
    { id: 8,  name: "Running Sport Shoes",    category: "shoes",       price: 110, oldPrice: 0,   rating: 4, badge: "",     sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80" },
    { id: 9,  name: "Oversized Comfort Hoodie",category: "tshirts",    price: 55,  oldPrice: 0,   rating: 5, badge: "Hot",  sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80" },
    { id: 10, name: "Classic Leather Bag",    category: "accessories", price: 180, oldPrice: 220, rating: 5, badge: "New",  sizes: [],                    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
    { id: 11, name: "Retro Round Sunglasses", category: "sunglasses",  price: 45,  oldPrice: 60,  rating: 4, badge: "Sale", sizes: [],                    img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80" },
    { id: 12, name: "Essential Cotton Polo",  category: "tshirts",     price: 42,  oldPrice: 0,   rating: 4, badge: "",     sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" }
];

// ---------- 2. Helpers ----------
const money = (n) => "$" + n.toFixed(2);
const getProduct = (id) => allProducts.find((p) => p.id === id);

const getStars = (n) =>
    Array.from({ length: 5 }, (_, i) =>
        '<i class="fa-' + (i < n ? "solid" : "regular") + ' fa-star"></i>').join("");

function showToast(message, icon = "fa-check") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("out");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ---------- 3. State + Storage ----------
let wishlist = JSON.parse(localStorage.getItem("tc_wishlist")) || [];
let cart     = JSON.parse(localStorage.getItem("tc_cart")) || [];

const saveWishlist = () => localStorage.setItem("tc_wishlist", JSON.stringify(wishlist));
const saveCart     = () => localStorage.setItem("tc_cart", JSON.stringify(cart));

let sortMode = "recent";

// ---------- 4. Element References ----------
const wishGrid      = document.getElementById("wishGrid");
const suggestGrid   = document.getElementById("suggestGrid");
const wishEmpty     = document.getElementById("wishEmpty");
const wishControls  = document.getElementById("wishControls");
const suggestions   = document.getElementById("suggestionsSection");
const statCount     = document.getElementById("statCount");
const statValue     = document.getElementById("statValue");
const wishSort      = document.getElementById("wishSort");
const moveAllBtn    = document.getElementById("moveAllBtn");
const clearAllBtn   = document.getElementById("clearAllBtn");
const clearAllTxt   = document.getElementById("clearAllTxt");
const cartItems     = document.getElementById("cartItems");
const cartOverlay   = document.getElementById("cartOverlay");

// ---------- 5. Sorted Wishlist ----------
function getWishProducts() {
    let items = wishlist.map(getProduct).filter(Boolean);

    switch (sortMode) {
        case "price-asc":  items.sort((a, b) => a.price - b.price); break;
        case "price-desc": items.sort((a, b) => b.price - a.price); break;
        case "name":       items.sort((a, b) => a.name.localeCompare(b.name)); break;
        case "recent":     items.reverse(); break;
    }
    return items;
}

// ---------- 6. Card HTML ----------
function cardHTML(p, i) {
    return `
    <div class="wish-card" data-id="${p.id}" style="animation-delay:${i * 0.08}s">
        <div class="wish-img">
            <a href="product.html?id=${p.id}">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
            </a>
            <div class="wish-actions">
                <a href="product.html?id=${p.id}" class="action-btn" title="View"><i class="fas fa-eye"></i></a>
                <a href="#" class="action-btn" data-action="cart" title="Add to Cart"><i class="fas fa-cart-plus"></i></a>
                <a href="#" class="action-btn remove" data-action="remove" title="Remove"><i class="fas fa-trash-can"></i></a>
            </div>
            ${p.badge ? '<span class="badge ' + p.badge.toLowerCase() + '">' + p.badge + '</span>' : ""}
        </div>
        <div class="wish-info">
            <span class="wish-cat">${p.category}</span>
            <h4><a href="product.html?id=${p.id}">${p.name}</a></h4>
            <div class="stars">${getStars(p.rating)}</div>
            <div class="wish-price">${money(p.price)} ${p.oldPrice ? '<span class="old-price">' + money(p.oldPrice) + '</span>' : ""}</div>
            <div class="wish-btns">
                <button class="btn btn-primary btn-small" data-action="movecart">
                    Move to Cart <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>`;
}

// ---------- 7. Render Wishlist ----------
function renderWishlist() {
    const wishCountBadge = document.getElementById("wishCount");
    if (wishCountBadge) {
        wishCountBadge.textContent = wishlist.length;
        wishCountBadge.classList.remove("pulse");
        void wishCountBadge.offsetWidth;
        wishCountBadge.classList.add("pulse");
    }

    const items = getWishProducts();

    if (wishlist.length === 0) {
        wishControls.style.display = "none";
        wishEmpty.style.display = "block";
        suggestions.style.display = "none";
        wishGrid.innerHTML = "";
        return;
    }

    wishControls.style.display = "flex";
    wishEmpty.style.display = "none";
    suggestions.style.display = "block";

    wishGrid.innerHTML = items.map(cardHTML).join("");

    statCount.textContent = wishlist.length;
    const totalValue = items.reduce((sum, p) => sum + p.price, 0);
    statValue.textContent = money(totalValue);
}

// ---------- 8. Suggestions ----------
function renderSuggestions() {
    const notWished = allProducts.filter((p) => !wishlist.includes(p.id));
    const shuffled = notWished.sort(() => Math.random() - 0.5).slice(0, 4);

    if (shuffled.length === 0) {
        suggestions.style.display = "none";
        return;
    }
    suggestGrid.innerHTML = shuffled.map(cardHTML).join("");
}

// ---------- 9. Add to Cart ----------
function addToCart(id, qty = 1, size = null) {
    const p = getProduct(id);
    size = size || (p.sizes[0] || "One Size");
    const existing = cart.find((i) => i.id === id && i.size === size);
    if (existing) existing.qty += qty;
    else cart.push({ id, qty, size });
    renderCartDrawer();
    showToast(p.name + " added to cart!", "fa-cart-plus");
}

// ---------- 10. Remove from Wishlist ----------
function removeFromWishlist(id, cardEl = null) {
    const doRemove = () => {
        wishlist = wishlist.filter((w) => w !== id);
        saveWishlist();
        renderWishlist();
        renderSuggestions();
    };

    if (cardEl) {
        cardEl.classList.add("removing");
        setTimeout(doRemove, 350);
    } else {
        doRemove();
    }
    showToast("Removed from wishlist", "fa-heart-crack");
}

// ---------- 11. Grid Actions ----------
function handleGridClick(e) {
    const actionEl = e.target.closest("[data-action]");
    if (!actionEl) return;
    e.preventDefault();

    const card = actionEl.closest(".wish-card");
    const id = +card.dataset.id;
    const action = actionEl.dataset.action;

    if (action === "remove") {
        removeFromWishlist(id, card);
    }

    if (action === "cart" || action === "movecart") {
        addToCart(id);
        if (action === "movecart") {
            setTimeout(() => removeFromWishlist(id, card), 400);
        }
    }
}

wishGrid.addEventListener("click", handleGridClick);
suggestGrid.addEventListener("click", handleGridClick);

// ---------- 12. Sort ----------
wishSort.addEventListener("change", () => {
    sortMode = wishSort.value;
    renderWishlist();
});

// ---------- 13. Move All to Cart ----------
moveAllBtn.addEventListener("click", () => {
    if (wishlist.length === 0) return;

    const movedCount = wishlist.length;

    wishlist.forEach((id) => {
        const p = getProduct(id);
        const size = p.sizes[0] || "One Size";
        const existing = cart.find((i) => i.id === id && i.size === size);
        if (existing) existing.qty += 1;
        else cart.push({ id, qty: 1, size });
    });

    saveCart();
    renderCartDrawer();
    wishlist = [];
    saveWishlist();
    renderWishlist();
    renderSuggestions();
    showToast(movedCount + " items moved to cart!", "fa-cart-plus");
    setTimeout(openCartDrawer, 400);
});

// ---------- 14. Clear All (double-click confirm) ----------
let clearConfirm = false, clearTimer;

clearAllBtn.addEventListener("click", () => {
    if (wishlist.length === 0) return;

    if (!clearConfirm) {
        clearConfirm = true;
        clearAllTxt.textContent = "Sure?";
        clearAllBtn.classList.add("confirming");

        clearTimeout(clearTimer);
        clearTimer = setTimeout(() => {
            clearConfirm = false;
            clearAllTxt.textContent = "Clear All";
            clearAllBtn.classList.remove("confirming");
        }, 2500);
        return;
    }

    clearTimeout(clearTimer);
    clearConfirm = false;
    clearAllTxt.textContent = "Clear All";
    clearAllBtn.classList.remove("confirming");

    wishlist = [];
    saveWishlist();
    renderWishlist();
    renderSuggestions();
    showToast("Wishlist cleared!", "fa-heart-crack");
});

// ---------- 15. Cart Drawer ----------
function renderCartDrawer() {
    const cartCountBadge  = document.getElementById("cartCount");
    const cartDrawerCount = document.getElementById("cartDrawerCount");
    const cartSubtotal    = document.getElementById("cartSubtotal");
    const cartTotal       = document.getElementById("cartTotal");

    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    if (cartCountBadge) {
        cartCountBadge.textContent = count;
        cartCountBadge.classList.remove("pulse");
        void cartCountBadge.offsetWidth;
        cartCountBadge.classList.add("pulse");
    }
    if (cartDrawerCount) cartDrawerCount.textContent = "(" + count + ")";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-cart-shopping"></i>
                <h4>Your cart is empty</h4>
                <p>Add some style to it!</p>
            </div>`;
    } else {
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

    const total = cart.reduce((sum, i) => sum + getProduct(i.id).price * i.qty, 0);
    if (cartSubtotal) cartSubtotal.textContent = money(total);
    if (cartTotal) cartTotal.textContent = money(total);
    saveCart();
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
    renderCartDrawer();
});

const openCartDrawer  = () => { cartOverlay.classList.add("active");  document.body.style.overflow = "hidden"; };
const closeCartDrawer = () => { cartOverlay.classList.remove("active"); document.body.style.overflow = ""; };

document.getElementById("cartClose").addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", (e) => { if (e.target === cartOverlay) closeCartDrawer(); });

// ---------- 16. ESC + Init ----------
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCartDrawer();
});

renderWishlist();
renderSuggestions();
renderCartDrawer();