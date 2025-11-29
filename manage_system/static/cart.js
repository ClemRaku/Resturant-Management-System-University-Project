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
  createCheckoutModal();
});

// Create and show checkout modal
function createCheckoutModal() {
  const modal = document.createElement('div');
  modal.id = 'checkoutModal';
  modal.style.display = "block";
  modal.style.position = "fixed";
  modal.style.left = "0";
  modal.style.top = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.5)";
  modal.style.zIndex = "9999";
  modal.innerHTML = `
    <div class="modal-content" style="position: relative; background-color: #fefefe; margin: auto; top: 50%; transform: translateY(-50%); border: 1px solid #888; width: 80%; max-width: 600px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 10px; max-height: 80vh; overflow-y: auto; padding: 25px;">
      <span id="closeCheckoutModal" style="float: right; font-size: 22px; cursor: pointer;">&times;</span>
      <h2>Checkout</h2>
      <form action="${customer_checkout_url}" method="get" id="checkoutForm">
        <label>Name</label>
        <input type="text" name="customer_name" required style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">

        <label>Address</label>
        <input type="text" name="customer_address" required style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">

        <label>Phone Number</label>
        <input type="text" name="phone" required style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">

        <h3>Order Items</h3>
        <div id="checkout-menu-items">
          ${cart.map(item => `
            <div class="menu-item" style="border-bottom: 1px solid #ddd; padding: 10px 0;">
              ${item.name} - ${item.price} tk each - Qty: ${item.quantity} - Total: ${(item.price * item.quantity).toFixed(2)} tk
              <input type="hidden" name="add_order_menu_id[]" value="${item.id}">
              <input type="hidden" name="add_order_quantity[]" value="${item.quantity}">
            </div>
          `).join('')}
        </div>

        <div class="cart-summary" style="border: 1px solid #ddd; padding: 10px; margin: 10px 0;">
          <div><span>Subtotal:</span><span>${parseFloat(subtotalEl.textContent.replace(' tk', ''))}</span></div>
          <div><span>Delivery Fee:</span><span>${DELIVERY_FEE.toFixed(2)}</span></div>
          <div><span>Total:</span><span>${parseFloat(totalEl.textContent.replace(' tk', ''))}</span></div>
        </div>

        <label>Payment Method</label>
        <select name="payment_method" required style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="mobile banking">Mobile Banking</option>
        </select>

        <button type="submit" name="checkout_submit" value="1" style="padding: 10px 20px; color: #eee; background-color: #ed9e59; font-size: 16px; font-weight: 600; border: none; border-radius: 10px;">Place Order</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('closeCheckoutModal').onclick = () => {
    modal.remove();
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  };
}

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
  cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  updateCartUI();
});
