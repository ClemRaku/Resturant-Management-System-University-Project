const CART_KEY = "restaurant_cart";

let cart = [];
// -------------------------------
// DOM ELEMENTS
// -------------------------------
const cartSidebar = document.getElementById("cartSidebar");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const deliveryFeeEl = document.getElementById("deliveryFee");
const checkoutBtn = document.getElementById("checkoutBtn");
const menuCartBtn = document.getElementById("menu-cart-btn");
const closeCartBtn = document.getElementById("closeCart");

const DELIVERY_FEE = 100;

// -------------------------------
// TOAST NOTIFICATION
// -------------------------------
function createToast(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// -------------------------------
// FUNCTIONS
// -------------------------------

// Save cart to localStorage
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

// Update cart sidebar UI
function updateCartUI() {
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty<br><small>Add items from the menu to get started</small></p>`;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ""}
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>${item.price} tk</p>
          <div class="cart-qty">
            <button class="qty-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem('${item.id}')">&times;</button>
      </div>
    `).join("");
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  subtotalEl.textContent = subtotal.toFixed(2) + " tk";
  totalEl.textContent = (subtotal + DELIVERY_FEE).toFixed(2) + " tk";
  deliveryFeeEl.textContent = DELIVERY_FEE + " tk";
}

// Add item to cart
function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart();
  createToast(`${item.name} added to cart!`, 'success');
}

window.addToCart = addToCart;

// Change item quantity
function changeQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeItem(id);
  } else {
    saveCart();
  }
}

// Remove item from cart
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

// -------------------------------
// EVENT LISTENERS
// -------------------------------
menuCartBtn.addEventListener("click", () => {
  cartSidebar.style.right = "0";
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.style.right = "-400px";
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Proceeding to checkout...");
  // Here you can implement checkout logic
});

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
  cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  updateCartUI();
});
