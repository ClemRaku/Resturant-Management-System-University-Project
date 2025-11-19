
const CART_KEY = 'restaurant_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  window.dispatchEvent(new CustomEvent('cartUpdated'));
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) existing.quantity++;
  else cart.push({ ...item, quantity: 1 });
  saveCart(cart);
  showToast`(${item.name} added to cart!)`;
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
}

function updateQuantity(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity = Math.max(0, qty);
  if (item.quantity === 0) removeFromCart(id);
  else saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
  window.dispatchEvent(new CustomEvent('cartUpdated'));
}

function getCartTotal(cart) {
  return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <p class="empty-cart">Your cart is empty<br><small>Add items from the menu to get started</small></p>
    `;
  } else {
    container.innerHTML = cart
      .map(
        item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>${item.price}tk</p>
          <div class="qty-controls">
            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `
      )
      .join('');
  }

  const subtotal = getCartTotal(cart);
  const delivery = cart.length > 0 ? 2.99 : 0; // You can also change delivery to tk if needed
  subtotalEl.textContent = `${subtotal.toFixed(2)}tk`;
  totalEl.textContent = `${(subtotal + delivery).toFixed(2)}tk`;
  updateCartCount();
  lucide.createIcons();
}

function updateCartCount() {
  const count = getCart().reduce((sum, i) => sum + i.quantity, 0);
  const el = document.getElementById('cart-count');
  const el2 = document.getElementById('cartCount');
  if (el) el.textContent = count;
  if (el2) el2.textContent = count;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('menu-cart-btn')?.addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.add('open');
  });
  document.getElementById('closeCart')?.addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.remove('open');
  });
  renderCart();
});