// ==========================================
// THE CLOSET — Shop Page Logic
// ==========================================

// ---------- 1. Product Data ----------
const allProducts = [
    { id: 1,  name: "Premium Wool Coat",      category: "jackets",     price: 199, oldPrice: 249, rating: 5, badge: "New",  colors: ["#0f172a", "#8B5CF6"], sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",  desc: "A timeless wool coat tailored for a sharp silhouette. Crafted from premium blended wool to keep you warm without compromising on style." },
    { id: 2,  name: "Classic White Sneakers", category: "shoes",       price: 89,  oldPrice: 120, rating: 4, badge: "Sale", colors: ["#f8fafc"],            sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",     desc: "Minimalist white sneakers that go with everything. Cushioned sole, breathable fabric and a silhouette that never goes out of fashion." },
    { id: 3,  name: "Minimal Black Watch",    category: "accessories", price: 150, oldPrice: 0,   rating: 5, badge: "",     colors: ["#0f172a"],            sizes: [],                    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",  desc: "A sleek matte-black timepiece with a stainless steel mesh strap. Understated luxury for your everyday wrist." },
    { id: 4,  name: "Leather Biker Jacket",   category: "jackets",     price: 220, oldPrice: 280, rating: 5, badge: "Sale", colors: ["#b45309", "#0f172a"], sizes: ["M", "L", "XL"],      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",     desc: "Full-grain leather biker jacket with asymmetric zip and quilted shoulders. Built to age beautifully with every wear." },
    { id: 5,  name: "Urban Graphic Tee",      category: "tshirts",     price: 35,  oldPrice: 45,  rating: 4, badge: "Sale", colors: ["#f8fafc", "#0f172a"], sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",  desc: "100% combed cotton tee with a bold urban graphic. Pre-shrunk, breathable and made for daily rotation." },
    { id: 6,  name: "Aviator Sunglasses",     category: "sunglasses",  price: 65,  oldPrice: 0,   rating: 5, badge: "New",  colors: ["#0f172a"],            sizes: [],                    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",  desc: "Iconic aviator frame with UV400 polarized lenses. A classic that instantly upgrades any outfit." },
    { id: 7,  name: "Classic Denim Jacket",   category: "jackets",     price: 95,  oldPrice: 0,   rating: 4, badge: "Hot",  colors: ["#06B6D4"],            sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",     desc: "A wardrobe essential — rugged denim jacket with a relaxed fit, button front and chest flap pockets." },
    { id: 8,  name: "Running Sport Shoes",    category: "shoes",       price: 110, oldPrice: 0,   rating: 4, badge: "",     colors: ["#06B6D4", "#f8fafc"], sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",     desc: "Lightweight running shoes with responsive foam cushioning and a breathable knit upper. Performance meets street style." },
    { id: 9,  name: "Oversized Comfort Hoodie",category: "tshirts",    price: 55,  oldPrice: 0,   rating: 5, badge: "Hot",  colors: ["#8B5CF6", "#0f172a"], sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",  desc: "Heavyweight fleece hoodie with a drop-shoulder oversized fit. Your new favourite layer for lazy days and city nights." },
    { id: 10, name: "Classic Leather Bag",    category: "accessories", price: 180, oldPrice: 220, rating: 5, badge: "New",  colors: ["#b45309"],            sizes: [],                    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",     desc: "Handcrafted genuine leather bag with brass hardware and a spacious interior. Carries your world, in style." },
    { id: 11, name: "Retro Round Sunglasses", category: "sunglasses",  price: 45,  oldPrice: 60,  rating: 4, badge: "Sale", colors: ["#0f172a", "#b45309"], sizes: [],                    img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80",  desc: "Vintage-inspired round frames with gradient lenses. A retro statement piece for the modern trendsetter." },
    { id: 12, name: "Essential Cotton Polo",  category: "tshirts",     price: 42,  oldPrice: 0,   rating: 4, badge: "",     colors: ["#f8fafc", "#06B6D4"], sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",  desc: "Sharp-collar piqué polo in premium cotton. Smart enough for dinner, comfortable enough for the couch." }
];

// ---------- 2. State + Storage ----------
let cart     = JSON.parse(localStorage.getItem("tc_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("tc_wishlist")) || [];

const state = {
    category: "all",
    maxPrice: 300,
    sizes: [],
    colors: [],
    search: "",
    sort: "default",
    visible: 8
};

const saveCart     = () => localStorage.setItem("tc_cart", JSON.stringify(cart));
const saveWishlist = () => localStorage.setItem("tc_wishlist", JSON.stringify(wishlist));

// ---------- 3. Element References ----------
const productGrid     = document.getElementById("productGrid");
const resultCount     = document.getElementById("resultCount");
const loadMoreBtn     = document.getElementById("loadMoreBtn");
const noResults       = document.getElementById("noResults");
const searchInput     = document.getElementById("searchInput");
const priceRange      = document.getElementById("priceRange");
const priceValue      = document.getElementById("priceValue");
const sortSelect      = document.getElementById("sortSelect");
const categoryList    = document.getElementById("categoryList");
const sizeBtns        = document.getElementById("sizeBtns");
const colorSwatches   = document.getElementById("colorSwatches");
const clearFiltersBtn = document.getElementById("clearFilters");
const gridViewBtn     = document.getElementById("gridViewBtn");
const listViewBtn     = document.getElementById("listViewBtn");
const filterSidebar   = document.getElementById("filterSidebar");
const filterToggle    = document.getElementById("filterToggle");
const filterClose     = document.getElementById("filterClose");
const filterOverlay   = document.getElementById("filterOverlay");
const quickViewModal  = document.getElementById("quickViewModal");
const cartOverlay     = document.getElementById("cartOverlay");
const cartItems       = document.getElementById("cartItems");
const toastContainer  = document.getElementById("toastContainer");

// ---------- 4. Helpers ----------
const money = (n) => "$" + n.toFixed(2);
const getProduct = (id) => allProducts.find((p) => p.id === id);

const getStars = (n) =>
    Array.from({ length: 5 }, (_, i) =>
        '<i class="fa-' + (i < n ? "solid" : "regular") + ' fa-star"></i>').join("");

function showToast(message, icon = "fa-check") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("out");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ---------- 5. Filter + Sort Logic ----------
function getFilteredProducts() {
    let list = allProducts.filter((p) =>
        (state.category === "all" || p.category === state.category) &&
        (p.price <= state.maxPrice) &&
        (state.sizes.length === 0 || p.sizes.length === 0 || p.sizes.some((s) => state.sizes.includes(s))) &&
        (state.colors.length === 0 || p.colors.some((c) => state.colors.includes(c))) &&
        (p.name.toLowerCase().includes(state.search.toLowerCase()))
    );

    switch (state.sort) {
        case "price-asc":  list.sort((a, b) => a.price - b.price); break;
        case "price-desc": list.sort((a, b) => b.price - a.price); break;
        case "name":       list.sort((a, b) => a.name.localeCompare(b.name)); break;
        case "rating":     list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
}

// ---------- 6. Render Products ----------
function cardHTML(p, i) {
    return `
    <div class="product-card" data-id="${p.id}" style="animation-delay:${i * 0.07}s">
        <div class="product-img">
            <a href="product.html?id=${p.id}">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
            </a>
            <div class="product-actions">
                <a href="#" class="action-btn ${wishlist.includes(p.id) ? "wish-active" : ""}" data-action="wish"><i class="fas fa-heart"></i></a>
                <a href="#" class="action-btn" data-action="view"><i class="fas fa-eye"></i></a>
                <a href="#" class="action-btn" data-action="cart"><i class="fas fa-cart-plus"></i></a>
            </div>
            ${p.badge ? '<span class="badge ' + p.badge.toLowerCase() + '">' + p.badge + '</span>' : ""}
        </div>
        <div class="product-info">
            <div class="stars">${getStars(p.rating)}</div>
            <h4><a href="product.html?id=${p.id}">${p.name}</a></h4>
            <div class="price">${money(p.price)} ${p.oldPrice ? '<span class="old-price">' + money(p.oldPrice) + '</span>' : ""}</div>
        </div>
    </div>`;
}

function renderProducts() {
    if (!productGrid) return;
    const list = getFilteredProducts();
    const visible = list.slice(0, state.visible);

    productGrid.innerHTML = visible.map(cardHTML).join("");
    if (noResults) noResults.style.display = list.length === 0 ? "block" : "none";
    if (loadMoreBtn) loadMoreBtn.style.display = state.visible < list.length ? "inline-flex" : "none";
    if (resultCount) resultCount.innerHTML = 'Showing <span>' + visible.length + '</span> of <span>' + list.length + '</span> products';
}

function resetAndRender() {
    state.visible = 8;
    renderProducts();
}

// ---------- 7. Cart System ----------
function addToCart(id, qty = 1, size = null) {
    const p = getProduct(id);
    size = size || (p.sizes[0] || "One Size");
    const existing = cart.find((i) => i.id === id && i.size === size);
    if (existing) existing.qty += qty;
    else cart.push({ id, qty, size });
    renderCart();
    showToast(p.name + " added to cart!", "fa-cart-plus");
}

function renderCart() {
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
    renderCart();
});

const openCartDrawer  = () => { cartOverlay.classList.add("active");  document.body.style.overflow = "hidden"; };
const closeCartDrawer = () => { cartOverlay.classList.remove("active"); document.body.style.overflow = ""; };

document.getElementById("cartClose").addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", (e) => { if (e.target === cartOverlay) closeCartDrawer(); });

// ---------- 8. Wishlist ----------
function toggleWishlist(id, btn) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter((w) => w !== id);
        btn.classList.remove("wish-active");
        showToast("Removed from wishlist", "fa-heart-crack");
    } else {
        wishlist.push(id);
        btn.classList.add("wish-active");
        showToast("Added to wishlist", "fa-heart");
    }
    saveWishlist();
}

// ---------- 9. Quick View Modal ----------
let qvProduct = null, qvSize = null, qvQtyVal = 1;

function openQuickView(id) {
    qvProduct = getProduct(id);
    qvSize = qvProduct.sizes[0] || "One Size";
    qvQtyVal = 1;

    document.getElementById("qvImage").src = qvProduct.img;
    document.getElementById("qvCategory").textContent = qvProduct.category;
    document.getElementById("qvName").textContent = qvProduct.name;
    document.getElementById("qvStars").innerHTML = getStars(qvProduct.rating);
    document.getElementById("qvPrice").textContent = money(qvProduct.price);
    document.getElementById("qvOldPrice").textContent = qvProduct.oldPrice ? money(qvProduct.oldPrice) : "";
    document.getElementById("qvDesc").textContent = qvProduct.desc;
    document.getElementById("qvQty").textContent = qvQtyVal;
    document.getElementById("qvSizes").innerHTML = qvProduct.sizes.length
        ? qvProduct.sizes.map((s, i) => '<button class="size-btn ' + (i === 0 ? "active" : "") + '" data-size="' + s + '">' + s + '</button>').join("")
        : '<button class="size-btn active">One Size</button>';

    quickViewModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeQuickView() {
    quickViewModal.classList.remove("active");
    document.body.style.overflow = "";
}

document.getElementById("qvClose").addEventListener("click", closeQuickView);
quickViewModal.addEventListener("click", (e) => { if (e.target === quickViewModal) closeQuickView(); });

document.getElementById("qvSizes").addEventListener("click", (e) => {
    const btn = e.target.closest(".size-btn");
    if (!btn) return;
    document.querySelectorAll("#qvSizes .size-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    qvSize = btn.dataset.size || "One Size";
});

document.getElementById("qvQtyMinus").addEventListener("click", () => { if (qvQtyVal > 1) document.getElementById("qvQty").textContent = --qvQtyVal; });
document.getElementById("qvQtyPlus").addEventListener("click", () => { document.getElementById("qvQty").textContent = ++qvQtyVal; });

document.getElementById("qvAddBtn").addEventListener("click", () => {
    addToCart(qvProduct.id, qvQtyVal, qvSize);
    closeQuickView();
    setTimeout(openCartDrawer, 300);
});

// ---------- 10. Product Card Actions ----------
productGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".action-btn");
    if (!btn) return;
    e.preventDefault();
    const id = +btn.closest(".product-card").dataset.id;

    if (btn.dataset.action === "cart") addToCart(id);
    if (btn.dataset.action === "wish") toggleWishlist(id, btn);
    if (btn.dataset.action === "view") openQuickView(id);
});

// ---------- 11. Filter Events ----------
categoryList.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    categoryList.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.category = btn.dataset.category;
    resetAndRender();
});

priceRange.addEventListener("input", () => {
    state.maxPrice = +priceRange.value;
    priceValue.textContent = "$" + priceRange.value;
    resetAndRender();
});

sizeBtns.addEventListener("click", (e) => {
    const btn = e.target.closest(".size-btn");
    if (!btn) return;
    btn.classList.toggle("active");
    state.sizes = [...sizeBtns.querySelectorAll(".size-btn.active")].map((b) => b.dataset.size);
    resetAndRender();
});

colorSwatches.addEventListener("click", (e) => {
    const swatch = e.target.closest(".swatch");
    if (!swatch) return;

    if (swatch.dataset.color === "all") {
        state.colors = [];
        colorSwatches.querySelectorAll(".swatch").forEach((s) => s.classList.remove("active"));
        swatch.classList.add("active");
    } else {
        swatch.classList.toggle("active");
        colorSwatches.querySelector('[data-color="all"]').classList.remove("active");
        state.colors = [...colorSwatches.querySelectorAll(".swatch.active")].map((s) => s.dataset.color);
        if (state.colors.length === 0) {
            colorSwatches.querySelector('[data-color="all"]').classList.add("active");
        }
    }
    resetAndRender();
});

let searchTimer;
searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        state.search = searchInput.value.trim();
        resetAndRender();
    }, 300);
});

clearFiltersBtn.addEventListener("click", () => {
    state.category = "all";
    state.maxPrice = 300;
    state.sizes = [];
    state.colors = [];
    state.search = "";
    searchInput.value = "";
    priceRange.value = 300;
    priceValue.textContent = "$300";

    categoryList.querySelectorAll("button").forEach((b) =>
        b.classList.toggle("active", b.dataset.category === "all"));
    sizeBtns.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
    colorSwatches.querySelectorAll(".swatch").forEach((s) =>
        s.classList.toggle("active", s.dataset.color === "all"));

    resetAndRender();
    showToast("Filters cleared", "fa-rotate-left");
});

// ---------- 12. Sort + View + Load More ----------
sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    resetAndRender();
});

gridViewBtn.addEventListener("click", () => {
    productGrid.classList.remove("list-view");
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
});

listViewBtn.addEventListener("click", () => {
    productGrid.classList.add("list-view");
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
});

loadMoreBtn.addEventListener("click", () => {
    state.visible += 8;
    renderProducts();
    showToast("More products loaded!", "fa-arrow-down");
});

// ---------- 13. Mobile Filter Sidebar ----------
const openFilters = () => {
    filterSidebar.classList.add("open");
    filterOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
};
const closeFilters = () => {
    filterSidebar.classList.remove("open");
    filterOverlay.classList.remove("active");
    document.body.style.overflow = "";
};

filterToggle.addEventListener("click", openFilters);
filterClose.addEventListener("click", closeFilters);
filterOverlay.addEventListener("click", closeFilters);

// ---------- 14. Navbar Icons ----------
document.getElementById("cartIconBtn").addEventListener("click", (e) => {
    e.preventDefault();
    openCartDrawer();
});

// ---------- 15. 404 Page Search Support (?search= param) ----------
const urlSearch = new URLSearchParams(window.location.search).get("search");
if (urlSearch) {
    state.search = urlSearch;
    searchInput.value = urlSearch;
}

// ---------- 16. ESC Key ----------
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeQuickView();
        closeCartDrawer();
        closeFilters();
    }
});

// ---------- 17. Init ----------
renderProducts();
renderCart();