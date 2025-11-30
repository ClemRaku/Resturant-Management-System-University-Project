// Navbar mobile menu button//
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navbarLinks = document.getElementById('navbar-links');

if (mobileMenuBtn && navbarLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');

    const icon = mobileMenuBtn.querySelector('i');
    if (navbarLinks.classList.contains('active')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }

    lucide.createIcons();
  });
}


// Selected category and search query
let selectedCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderCart(); // Render cart on page load

 
  // Search input functionality
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.menu-card').forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelectorAll('p')[0].textContent.toLowerCase(); // first p = description
        card.style.display = name.includes(query) || desc.includes(query) ? 'block' : 'none';
      });
    });
  }

 
  // Category filter buttons
 
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      // Update active button style
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      selectedCategory = e.target.dataset.category;

      // Show/hide menu cards based on selected category
      document.querySelectorAll('.menu-card').forEach(card => {
        const category = card.querySelector('input[name="item_id"]').value; // use any attribute if needed
        const cardCategory = card.querySelector('form').dataset.category || card.dataset.category || ''; // optional: add data-category in HTML
        if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  
  // Update cart when cartUpdated event is triggered

  window.addEventListener('cartUpdated', renderCart);
});


// Add item to cart function

function addToCart(item) {
  // Implement cart addition logic here
  console.log("Add to cart:", item);
}

