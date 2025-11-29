let selectedCategory = "all";
let searchQuery = "";

// -------------------------------
// FILTER MENU CARDS
// -------------------------------
function filterMenu() {
  const cards = document.querySelectorAll("#customer-menu .card");

  cards.forEach(card => {
    const name = card.querySelector('.h3').value.toLowerCase();
    const description = card.querySelector('.p').value.toLowerCase();
    const category = card.getAttribute('data-category');

    const matchCategory = selectedCategory === "all" || category === selectedCategory;
    const matchSearch = name.includes(searchQuery) || description.includes(searchQuery);

    card.style.display = (matchCategory && matchSearch) ? 'block' : 'none';
  });
}

// -------------------------------
// SEARCH INPUT
// -------------------------------
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", e => {
    searchQuery = e.target.value.toLowerCase();
    filterMenu();
  });
}

// -------------------------------
// CATEGORY FILTERS
// -------------------------------
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    selectedCategory = e.target.dataset.category;
    filterMenu();
  });
});

// -------------------------------
// ORDER BUTTON CLICKS
// -------------------------------
  document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', e => {
    if (e.target.classList.contains('order-btn')) {
      e.preventDefault();
      const card = e.target.closest('.card');
      const name = card.querySelector('input.h3').value.trim();
      const price = parseFloat(card.querySelector('input.price').value.trim()) || 0;
      const img = card.querySelector('img').src;
      const id = card.getAttribute('data-menu-id');

      const item = { id, name, price, image: img };
      addToCart(item);
    }
  });
});
