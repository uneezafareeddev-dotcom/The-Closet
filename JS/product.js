// ==========================================
// THE CLOSET — Product Detail Page Logic
// ==========================================

// ---------- 1. Product Data (shop.js jaisa hi) ----------
const allProducts = [
    { id: 1,  name: "Premium Wool Coat",      category: "jackets",     price: 199, oldPrice: 249, rating: 5, badge: "New",  colors: ["#0f172a", "#8B5CF6"], sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",  desc: "A timeless wool coat tailored for a sharp silhouette. Crafted from premium blended wool to keep you warm without compromising on style." },
    { id: 2,  name: "Classic White Sneakers", category: "shoes",       price: 89,  oldPrice: 120, rating: 4, badge: "Sale", colors: ["#f8fafc"],            sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",     desc: "Minimalist white sneakers that go with everything. Cushioned sole, breathable fabric and a silhouette that never goes out of fashion." },
    { id: 3,  name: "Minimal Black Watch",    category: "accessories", price: 150, oldPrice: 0,   rating: 5, badge: "",     colors: ["#0f172a"],            sizes: [],                    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",  desc: "A sleek matte-black timepiece with a stainless steel mesh strap. Understated luxury for your everyday wrist." },
    { id: 4,  name: "Leather Biker Jacket",   category: "jackets",     price: 220, oldPrice: 280, rating: 5, badge: "Sale", colors: ["#b45309", "#0f172a"], sizes: ["M", "L", "XL"],      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",     desc: "Full-grain leather biker jacket with asymmetric zip and quilted shoulders. Built to age beautifully with every wear." },
    { id: 5,  name: "Urban Graphic Tee",      category: "tshirts",     price: 35,  oldPrice: 45,  rating: 4, badge: "Sale", colors: ["#f8fafc", "#0f172a"], sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",  desc: "100% combed cotton tee with a bold urban graphic. Pre-shrunk, breathable and made for daily rotation." },
    { id: 6,  name: "Aviator Sunglasses",     category: "sunglasses",  price: 65,  oldPrice: 0,   rating: 5, badge: "New",  colors: ["#0f172a"],            sizes: [],                    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",  desc: "Iconic aviator frame with UV400 polarized lenses. A classic that instantly upgrades any outfit." },
    { id: 7,  name: "Classic Denim Jacket",   category: "jackets",     price: 95,  oldPrice: 0,   rating: 4, badge: "Hot",  colors: ["#06B6D4"],            sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",     desc: "A wardrobe essential — rugged denim jacket with a relaxed fit, button front and chest flap pockets." },
    { id: 8,  name: "Running Sport Shoes",    category: "shoes",       price: 110, oldPrice: 0,   rating: 4, badge: "",     colors: ["#06B6D4", "#f8fafc"], sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",     desc: "Lightweight running shoes with responsive foam cushioning and a breathable knit upper. Performance meets street style." },
    { id: 9,  name: "Oversized Comfort Hoodie",category: "tshirts",    price: 55,  oldPrice: 0,   rating: 5, badge: "Hot",  colors: ["#8B5CF6", "#0f172a"], sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",  desc: "Heavyweight fleece hoodie with a drop-shoulder oversized fit. Your new favourite layer for lazy days and city nights." },
    { id: 10, name: "Classic Leather Bag",    category: "accessories", price: 180, oldPrice: 220, rating: 5, badge: "New",  colors: ["#b45309"],            sizes: [],                    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",     desc: "Handcrafted genuine leather bag with brass hardware and a spacious interior. Carries your world, in style." },
    { id: 11, name: "Retro Round Sunglasses", category: "sunglasses",  price: 45,  oldPrice: 60,  rating: 4, badge: "Sale", colors: ["#0f172a", "#b45309"], sizes: [],                    img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80",  desc: "Vintage-inspired round frames with gradient lenses. A retro statement piece for the modern trendsetter." },
    { id: 12, name: "Essential Cotton Polo",  category: "tshirts",     price: 42,  oldPrice: 0,   rating: 4, badge: "",     colors: ["#f8fafc", "#06B6D4"], sizes: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",  desc: "Sharp-collar piqué polo in premium cotton. Smart enough for dinner, comfortable enough for the couch." }
];

// Detail shots (gallery ke extra images)
const detailShots = [
    "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=800&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80"
];

// ---------- 2. Helpers ----------
const money = (n) => `$${n.toFixed(2)}`;
const getProduct = (id) => allProducts.find((p) => p.id === id);

const getStars = (n) =>
    Array.from({ length: 5 }, (_, i) =>
        `<i class="fa-${i < n ? "solid" : "regular"} fa-star"></i>`).join("");

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

// ---------- 3. Cart + Wishlist (shared localStorage) ----------
let cart     = JSON.parse(localStorage.getItem("tc_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("tc_wishlist")) || [];

const saveCart     = () => localStorage.setItem("tc_cart", JSON.stringify(cart));
const saveWishlist = () => localStorage.setItem("tc_wishlist", JSON.stringify(wishlist));

const cartItems    = document.getElementById("cartItems");
const cartOverlay  = document.getElementById("cartOverlay");
const cartCountBadge  = document.getElementById("cartCount");
const cartDrawerCount = document.getElementById("cartDrawerCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal    = document.getElementById("cartTotal");

function renderCart() {
    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    cartCountBadge.textContent = count;
    cartCountBadge.classList.remove("pulse");
    void cartCountBadge.offsetWidth;
    cartCountBadge.classList.add("pulse");
    cartDrawerCount.textContent = `(${count})`;

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
    cartSubtotal.textContent = money(total);
    cartTotal.textContent = money(total);
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

function addToCart(id, qty = 1, size = null) {
    const p = getProduct(id);
    size = size || (p.sizes[0] || "One Size");
    const existing = cart.find((i) => i.id === id && i.size === size);
    if (existing) existing.qty += qty;
    else cart.push({ id, qty, size });
    renderCart();
    showToast(`${p.name} added to cart!`, "fa-cart-plus");
}

// ---------- 4. Current Product (URL se id) ----------
const params = new URLSearchParams(window.location.search);
let currentId = parseInt(params.get("id")) || 1;
let product = getProduct(currentId);

// Agar product exist nahi karta to shop par bhej do
if (!product) {
    window.location.href = "shop.html";
}

// ---------- 5. Product Detail Render ----------
const mainImage     = document.getElementById("mainImage");
const galleryThumbs = document.getElementById("galleryThumbs");
const galleryMain   = document.getElementById("galleryMain");
const qtyNum        = document.getElementById("qtyNum");
const wishBtn       = document.getElementById("wishBtn");

let selectedSize = product.sizes[0] || "One Size";
let qty = 1;
const gallery = [product.img, detailShots[product.id % 4], detailShots[(product.id + 1) % 4]];

function renderProduct() {
    // Banner + breadcrumb
    document.getElementById("bannerTitle").textContent = product.name;
    document.getElementById("crumbCurrent").textContent = product.name;
    document.title = `${product.name} | The Closet`;

    // Basic info
    document.getElementById("pdCategory").textContent = product.category;
    document.getElementById("pdName").textContent = product.name;
    document.getElementById("pdStars").innerHTML = getStars(product.rating);
    document.getElementById("pdRatingCount").textContent = `(${product.rating * 27} reviews)`;
    document.getElementById("pdPrice").textContent = money(product.price);
    document.getElementById("pdDesc").textContent = product.desc;
    document.getElementById("tabDescMain").textContent = product.desc + " Designed in-house and made with carefully sourced materials, this piece reflects The Closet's promise of everyday luxury.";

    // Price + discount
    if (product.oldPrice > 0) {
        document.getElementById("pdOldPrice").textContent = money(product.oldPrice);
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        const discEl = document.getElementById("pdDiscount");
        discEl.textContent = `-${discount}%`;
        discEl.classList.add("show");
    } else {
        document.getElementById("pdOldPrice").textContent = "";
    }

    // Sizes
    const sizesWrap = document.getElementById("pdSizes");
    sizesWrap.innerHTML = product.sizes.length
        ? product.sizes.map((s, i) => `<button class="size-btn ${i === 0 ? "active" : ""}" data-size="${s}">${s}</button>`).join("")
        : `<button class="size-btn active">One Size</button>`;

    // Meta
    document.getElementById("pdSku").textContent = `TC-${String(product.id).padStart(4, "0")}`;
    document.getElementById("pdMetaCategory").textContent = product.category;
    document.getElementById("pdTagCat").textContent = product.category;

    // Badge (agar hai)
    if (product.badge) {
        const badgeEl = document.createElement("span");
        badgeEl.className = `badge ${product.badge.toLowerCase()}`;
        badgeEl.textContent = product.badge;
        badgeEl.style.position = "absolute";
        badgeEl.style.top = "15px";
        badgeEl.style.left = "15px";
        badgeEl.style.zIndex = "2";
        galleryMain.appendChild(badgeEl);
    }

    // Wishlist button state
    updateWishBtn();
}

// ---------- 6. Gallery ----------
function renderGallery() {
    mainImage.src = gallery[0];
    galleryThumbs.innerHTML = gallery.map((img, i) => `
        <div class="thumb ${i === 0 ? "active" : ""}" data-index="${i}">
            <img src="${img}" alt="View ${i + 1}">
        </div>`).join("");
}

galleryThumbs.addEventListener("click", (e) => {
    const thumb = e.target.closest(".thumb");
    if (!thumb) return;
    galleryThumbs.querySelectorAll(".thumb").forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
    mainImage.src = gallery[+thumb.dataset.index];
});

// Hover Zoom (desktop only)
const canHover = window.matchMedia("(hover: hover)").matches;

if (canHover) {
    galleryMain.addEventListener("mousemove", (e) => {
        const rect = galleryMain.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mainImage.style.transformOrigin = `${x}% ${y}%`;
        galleryMain.classList.add("zoomed");
    });

    galleryMain.addEventListener("mouseleave", () => {
        galleryMain.classList.remove("zoomed");
        mainImage.style.transformOrigin = "center center";
    });
}

// ---------- 7. Size + Qty Selectors ----------
document.getElementById("pdSizes").addEventListener("click", (e) => {
    const btn = e.target.closest(".size-btn");
    if (!btn) return;
    document.querySelectorAll("#pdSizes .size-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSize = btn.dataset.size || "One Size";
});

document.getElementById("qtyMinus").addEventListener("click", () => {
    if (qty > 1) qtyNum.textContent = --qty;
});

document.getElementById("qtyPlus").addEventListener("click", () => {
    qtyNum.textContent = ++qty;
});

// ---------- 8. Add to Cart / Buy Now / Wishlist ----------
document.getElementById("addToCartBtn").addEventListener("click", () => {
    addToCart(product.id, qty, selectedSize);
    setTimeout(openCartDrawer, 300);
});

document.getElementById("buyNowBtn").addEventListener("click", () => {
    addToCart(product.id, qty, selectedSize);
    setTimeout(() => { window.location.href = "cart.html"; }, 600);
});

function updateWishBtn() {
    wishBtn.classList.toggle("active", wishlist.includes(product.id));
}

wishBtn.addEventListener("click", () => {
    if (wishlist.includes(product.id)) {
        wishlist = wishlist.filter((w) => w !== product.id);
        showToast("Removed from wishlist", "fa-heart-crack");
    } else {
        wishlist.push(product.id);
        showToast("Added to wishlist", "fa-heart");
    }
    updateWishBtn();
    saveWishlist();
});

// ---------- 9. Tabs ----------
document.getElementById("pdTabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".pd-tab");
    if (!tab) return;

    document.querySelectorAll(".pd-tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
});

// ---------- 10. Related Products ----------
function renderRelated() {
    let related = allProducts
        .filter((p) => p.id !== product.id && p.category === product.category)
        .slice(0, 4);

    // Agar same category kam hai to doosre products se fill karo
    if (related.length < 4) {
        const extras = allProducts
            .filter((p) => p.id !== product.id && !related.includes(p))
            .slice(0, 4 - related.length);
        related = [...related, ...extras];
    }

    document.getElementById("relatedGrid").innerHTML = related.map((p, i) => `
        <div class="product-card" style="animation-delay:${i * 0.1}s">
            <div class="product-img">
                <a href="product.html?id=${p.id}">
                    <img src="${p.img}" alt="${p.name}" loading="lazy">
                </a>
                ${p.badge ? `<span class="badge ${p.badge.toLowerCase()}">${p.badge}</span>` : ""}
            </div>
            <div class="product-info">
                <div class="stars">${getStars(p.rating)}</div>
                <h4><a href="product.html?id=${p.id}">${p.name}</a></h4>
                <div class="price">${money(p.price)} ${p.oldPrice ? `<span class="old-price">${money(p.oldPrice)}</span>` : ""}</div>
            </div>
        </div>`).join("");
}

// ---------- 11. Navbar Icons ----------
document.getElementById("cartIconBtn").addEventListener("click", (e) => {
    e.preventDefault();
    openCartDrawer();
});

document.getElementById("wishIconBtn").addEventListener("click", (e) => {
    e.preventDefault();
    showToast(`${wishlist.length} item(s) in your wishlist`, "fa-heart");
});

// ---------- 12. ESC Key ----------
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCartDrawer();
});

// ---------- 13. Init ----------
renderProduct();
renderGallery();
renderRelated();
renderCart();