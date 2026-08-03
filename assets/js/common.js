// ============================================================
// CRAFTY GIFTS — Shared site chrome: header, footer, mobile nav,
// cart drawer, and the cart → WhatsApp checkout flow.
// ============================================================

const WHATSAPP_NUMBER = "201000000000"; // TODO: replace with Crafty Gifts' real WhatsApp number

// ---------- Header ----------
const HEADER_HTML = `
<div class="header-top">
  <a href="index.html" class="logo-link">
    <img src="assets/brand/logo.png" alt="Crafty Gifts logo">
  </a>
  <nav class="main-nav">
    <div class="nav-item">
      <a href="shop.html" class="nav-link" data-nav="shop">Shop <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></a>
      <div class="mega-menu" id="megaMenu"></div>
    </div>
    <a href="categories.html" class="nav-link" data-nav="categories">Categories</a>
    <a href="best-sellers.html" class="nav-link" data-nav="best-sellers">Best Sellers</a>
    <a href="trending.html" class="nav-link" data-nav="trending">Trending</a>
    <a href="new-arrivals.html" class="nav-link" data-nav="new-arrivals">New Arrivals</a>
    <a href="index.html#reviews" class="nav-link" data-nav="reviews">Reviews</a>
    <a href="about.html" class="nav-link" data-nav="about">About Us</a>
    <a href="contact.html" class="nav-link" data-nav="contact">Contact</a>
  </nav>
  <div class="header-actions">
    <a href="#" class="btn btn-terracotta btn-sm wa-generic-link header-wa-btn">Order on WhatsApp</a>
    <button class="icon-btn" id="cartToggle" aria-label="Open cart">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.2a2 2 0 002-1.6L21 8H6"/><circle cx="9.5" cy="20.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="17.5" cy="20.5" r="1.2" fill="currentColor" stroke="none"/></svg>
      <span class="cart-count" id="cartCount">0</span>
    </button>
    <button class="mobile-toggle" id="mobileToggle" aria-label="Open menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
  </div>
</div>`;

const MOBILE_DRAWER_HTML = `
<div class="mobile-drawer" id="mobileDrawer">
  <div class="mobile-drawer-scrim" data-close-mobile></div>
  <div class="mobile-drawer-panel">
    <button class="mobile-drawer-close" data-close-mobile aria-label="Close menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <a href="index.html">Home</a>
    <a href="shop.html">Shop</a>
    ${CATEGORIES.map(c => `<a href="category.html?cat=${c.slug}" class="sub-link">${c.name}</a>`).join("")}
    <a href="categories.html">Categories</a>
    <a href="best-sellers.html">Best Sellers</a>
    <a href="trending.html">Trending This Month</a>
    <a href="new-arrivals.html">New Arrivals</a>
    <a href="index.html#reviews">Reviews</a>
    <a href="about.html">About Us</a>
    <a href="contact.html">Contact Us</a>
  </div>
</div>`;

const FLOAT_WA_HTML = `
<a href="#" class="wa-float wa-generic-link" aria-label="Order on WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-2.9.8.8-2.8-.2-.3C4.2 15.1 3.7 13.6 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.8 8.2-8.3 8.2z"/></svg>
</a>`;

const CART_DRAWER_HTML = `
<div class="cart-drawer" id="cartDrawer">
  <div class="cart-scrim" data-close-cart></div>
  <div class="cart-panel">
    <div class="cart-header">
      <h3>Your Selection</h3>
      <button class="cart-close" data-close-cart aria-label="Close cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <div class="cart-items" id="cartItemsList"></div>
    <div class="cart-footer">
      <div class="cart-subtotal"><span>Subtotal</span><span id="cartSubtotal">0 EGP</span></div>
      <button class="btn btn-terracotta btn-block" id="cartCheckoutBtn">Send Order via WhatsApp</button>
      <p class="cart-note">We'll confirm your final price and delivery time over WhatsApp.</p>
    </div>
  </div>
</div>`;

const FOOTER_HTML = `
<div class="wrap footer-grid">
  <div class="footer-col">
    <img src="assets/brand/logo-mono-light.png" alt="Crafty Gifts logo" class="footer-logo">
    <p>Custom engraved acrylic plaques, awards, and keepsakes — designed and made in Portsaid, Egypt.</p>
  </div>
  <div class="footer-col">
    <h4>Shop</h4>
    ${CATEGORIES.slice(0, 5).map(c => `<a href="category.html?cat=${c.slug}">${c.name}</a>`).join("")}
  </div>
  <div class="footer-col">
    <h4>Explore</h4>
    <a href="best-sellers.html">Best Sellers</a>
    <a href="trending.html">Trending This Month</a>
    <a href="new-arrivals.html">New Arrivals</a>
    <a href="about.html">About Us</a>
  </div>
  <div class="footer-col">
    <h4>Contact</h4>
    <a href="contact.html">Contact Us</a>
    <a href="#" class="wa-generic-link">WhatsApp Us</a>
    <a href="https://www.instagram.com/craftygifts98/" target="_blank" rel="noopener">Instagram</a>
    <a href="https://www.facebook.com/CraftyGifts-104866402062133" target="_blank" rel="noopener">Facebook</a>
  </div>
</div>
<div class="footer-bottom">
  <span>&copy; 2026 Crafty Gifts, Portsaid</span>
  <span>Made with care, one plaque at a time</span>
</div>`;

function waLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function buildMegaMenu() {
  const menu = document.getElementById("megaMenu");
  if (!menu) return;
  menu.innerHTML = CATEGORIES.map(c => `<a href="category.html?cat=${c.slug}">${c.name}</a>`).join("");
}

// ---------- Cart (localStorage) ----------
const CART_KEY = "crafty_cart";
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  renderCartDrawer();
  openCartDrawer();
}
function removeFromCart(id) {
  saveCart(getCart().filter((i) => i.id !== id));
  renderCartDrawer();
}
function setQty(id, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
    renderCartDrawer();
  }
}
function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = getCartCount();
}

function renderCartDrawer() {
  const listEl = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartSubtotal");
  if (!listEl) return;
  const cart = getCart();
  if (cart.length === 0) {
    listEl.innerHTML = `<div class="cart-empty">Your selection is empty.<br>Browse the shop to add a gift.</div>`;
    if (subtotalEl) subtotalEl.textContent = "0 EGP";
    return;
  }
  let subtotal = 0;
  listEl.innerHTML = cart.map((item) => {
    const p = getProductById(item.id);
    if (!p) return "";
    subtotal += p.price * item.qty;
    return `
      <div class="cart-item">
        <img src="${p.images[0]}" alt="${p.name}">
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          <div class="price">${p.price} EGP</div>
          <div class="cart-item-qty">
            <button onclick="setQty('${p.id}', ${item.qty - 1})">−</button>
            <span>${item.qty}</span>
            <button onclick="setQty('${p.id}', ${item.qty + 1})">+</button>
          </div>
          <a class="cart-item-remove" onclick="removeFromCart('${p.id}')">Remove</a>
        </div>
      </div>`;
  }).join("");
  if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString() + " EGP";
}

function openCartDrawer() { document.getElementById("cartDrawer").classList.add("open"); }
function closeCartDrawer() { document.getElementById("cartDrawer").classList.remove("open"); }

function sendCartToWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) return;
  let lines = ["Hi Crafty Gifts! I'd like to order:"];
  let total = 0;
  cart.forEach((item) => {
    const p = getProductById(item.id);
    if (!p) return;
    lines.push(`• ${p.name} x${item.qty} — ${p.price * item.qty} EGP`);
    total += p.price * item.qty;
  });
  lines.push(`Estimated total: ${total} EGP`);
  window.open(waLink(lines.join("\n")), "_blank");
}

function renderBentoGrid(container, products) {
  if (!container || products.length === 0) return;
  const slots = ["large", "small", "small", "small", "small"];
  container.innerHTML = products.slice(0, 5).map((p, i) => {
    const cat = getCategoryBySlug(p.category)?.name || "";
    return `
    <a href="product.html?id=${p.id}" class="bento-item ${slots[i] || "small"} reveal">
      <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
      <div class="bento-label">
        <span class="tag">${cat}</span>
        <h3>${p.name}</h3>
        <div class="price">${p.priceLabel}</div>
      </div>
    </a>`;
  }).join("");
  observeReveals();
}

// ---------- Reusable product card renderer ----------
function productCardHTML(p) {
  const isSpecialty = p.category === "baby-gifts";
  const badge = isSpecialty ? "Our Specialty"
    : p.tags.includes("bestseller") ? "Best Seller"
    : p.tags.includes("new") ? "New Arrival"
    : p.tags.includes("trending") ? "Trending" : "";
  return `
  <div class="product-card reveal">
    <a href="product.html?id=${p.id}" class="product-frame-link">
      <div class="product-frame">
        ${badge ? `<span class="product-badge${isSpecialty ? " specialty" : ""}">${badge}</span>` : ""}
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        <span class="price-badge">${p.priceLabel}</span>
        <button class="product-quick" onclick="event.preventDefault(); event.stopPropagation(); window.open(waLink('Hi Crafty Gifts! I\\'d like to ask about: ${p.name.replace(/'/g, "\\\\'")}'), '_blank');" aria-label="Quick order via WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-2.9.8.8-2.8-.2-.3C4.2 15.1 3.7 13.6 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.8 8.2-8.3 8.2z"/></svg>
        </button>
      </div>
    </a>
    <div class="product-info">
      <a href="product.html?id=${p.id}"><h3>${p.name}</h3></a>
      <p class="desc">${p.desc}</p>
    </div>
    <a href="${waLink('Hi Crafty Gifts! I\'d like to ask about: ' + p.name)}" target="_blank" rel="noopener" class="product-card-order">Order via WhatsApp</a>
  </div>`;
}

function renderProductGrid(container, products) {
  if (!container) return;
  if (products.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <h3>No products found</h3>
        <p>Try a different filter or check back soon — we're always adding new pieces.</p>
        <a href="shop.html" class="btn btn-outline">View All Products</a>
      </div>`;
    return;
  }
  container.innerHTML = products.map(productCardHTML).join("");
  observeReveals();
}

// ---------- Scroll reveal ----------
function observeReveals() {
  const els = document.querySelectorAll(".reveal:not(.visible)");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

// ---------- Animated text reveal (word-by-word split) ----------
function initTextReveal() {
  document.querySelectorAll(".text-reveal:not(.split-done)").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
    el.classList.add("split-done");
  });
  const els = document.querySelectorAll(".text-reveal:not(.visible)");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.4 });
  els.forEach((el) => io.observe(el));
}

// ---------- Subtle hero parallax on scroll ----------
function initParallax() {
  const layers = document.querySelectorAll("[data-parallax]");
  if (layers.length === 0) return;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    layers.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.08;
      el.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
}


// ---------- Header shrinks on scroll ----------
function initHeaderShrink() {
  const header = document.getElementById("site-header");
  if (!header) return;
  function update() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function initSiteChrome() {
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (headerPlaceholder) headerPlaceholder.id = "site-header";
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) footerPlaceholder.id = "site-footer";
  if (headerPlaceholder) headerPlaceholder.innerHTML = HEADER_HTML;
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;
  // Mobile drawer and cart drawer must NOT be nested inside the sticky header —
  // position:sticky (and transform) on an ancestor creates a new containing block
  // for position:fixed descendants, which breaks their true full-viewport positioning.
  document.body.insertAdjacentHTML("beforeend", MOBILE_DRAWER_HTML + CART_DRAWER_HTML);
  document.body.insertAdjacentHTML("beforeend", FLOAT_WA_HTML);

  buildMegaMenu();
  updateCartCount();
  renderCartDrawer();

  // Active nav state
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`.nav-link[data-nav="${page}"]`).forEach((el) => el.classList.add("active"));
  }

  // Mobile drawer
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  if (mobileToggle) mobileToggle.addEventListener("click", () => mobileDrawer.classList.add("open"));
  document.querySelectorAll("[data-close-mobile]").forEach((el) => el.addEventListener("click", () => mobileDrawer.classList.remove("open")));

  // Cart drawer
  const cartToggle = document.getElementById("cartToggle");
  if (cartToggle) cartToggle.addEventListener("click", openCartDrawer);
  document.querySelectorAll("[data-close-cart]").forEach((el) => el.addEventListener("click", closeCartDrawer));
  const checkoutBtn = document.getElementById("cartCheckoutBtn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", sendCartToWhatsApp);

  // Generic WhatsApp links (footer, header CTA, etc.)
  document.querySelectorAll(".wa-generic-link").forEach((link) => {
    link.href = waLink("Hi Crafty Gifts! I'd like to ask about an order.");
    link.target = "_blank";
    link.rel = "noopener";
  });

  observeReveals();
  initTextReveal();
  initParallax();
  initHeaderShrink();

  // Floating WhatsApp button (present on every page)
  if (!document.querySelector(".wa-float")) {
    const fab = document.createElement("a");
    fab.href = "#";
    fab.className = "wa-float";
    fab.setAttribute("aria-label", "Order on WhatsApp");
    fab.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-2.9.8.8-2.8-.2-.3C4.2 15.1 3.7 13.6 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.8 8.2-8.3 8.2z"/></svg>`;
    fab.href = waLink("Hi Crafty Gifts! I'd like to ask about an order.");
    fab.target = "_blank";
    fab.rel = "noopener";
    document.body.appendChild(fab);
  }
}

document.addEventListener("DOMContentLoaded", initSiteChrome);
