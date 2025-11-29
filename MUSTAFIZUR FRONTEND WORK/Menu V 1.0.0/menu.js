// ===== MENU DATA =====
const menuItems = [
  { id: '1', name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, and fresh basil', price: 12.99, category: 'Pizza', image: './imageM/margherita-pizza.jpg' },
  { id: '2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni and mozzarella', price: 14.99, category: 'Pizza', image: './imageM/pizza2.jpg' },
  { id: '3', name: 'Grilled Salmon', description: 'Fresh Atlantic salmon with herbs', price: 19.99, category: 'Seafood', image: './imageM/grilled-salmon.jpg' },
  { id: '4', name: 'Caesar Salad', description: 'Crisp romaine, croutons, and parmesan', price: 9.99, category: 'Salad', image: './imageM/caesar-salad.jpg' },
  { id: '5', name: 'Beef Burger', description: 'Juicy beef patty with cheese and lettuce', price: 11.99, category: 'Burgers', image: './imageM/beef-burger.jpg' },
  { id: '6', name: 'Shrimp Pasta', description: 'Creamy garlic sauce with shrimp', price: 16.99, category: 'Pasta', image: './imageM/pasta.jpg' }
];

// ===== FILTER & SEARCH =====
let selectedCategory = 'All';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderCart();

  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value.toLowerCase();
      renderMenu();
    });
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      selectedCategory = e.target.dataset.category;
      renderMenu();
    });
  });

  window.addEventListener('cartUpdated', renderCart);
});

function renderMenu() {
  const filtered = menuItems.filter(item => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });

  const container = document.getElementById('menu-items');
  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align:center;">No items found</p>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      item => `
      <div class="menu-card">
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="menu-bottom">
            <span>$${item.price.toFixed(2)}</span>
            <button class="add-btn" onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
          </div>
        </div>
      </div>
    `
    )
    .join('');
}
