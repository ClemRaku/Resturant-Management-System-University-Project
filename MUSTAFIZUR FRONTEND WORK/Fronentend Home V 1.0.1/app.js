
const container = document.getElementById('featured-dishes');

const featureDishes = [
  {
    id: '1', name: 'Burger', description: 'fresh atlantic salmon with herb', price: 29.99, image: 'image/HomeFood1.jpg'
  },
  {
    id: '2', name: 'Pizza' , description: 'freshly backed pizza made with love and the finest ingredients', price: 19.99, image:'image/HomeFood3.jpg'
  },
  {
    id: '3', name: 'Pasta' , description: 'soft,tender pasta coated in creamy or spicy souce for perfect bite' , price: 9.99, image:'image/HomeFood2.jpg'
  }
];


if (container) {
  container.innerHTML = featureDishes.map(dish =>
    `
    <div class="card">
      <img src="${dish.image}" alt="${dish.name}" style="width:100%;height:200px;object-fit:cover;border-radius:0.5rem;margin-bottom:1rem;">
      <h3 style="font-size:1.25rem;font-weight:bold;margin-bottom:0.5rem;">${dish.name}</h3>
      <p style="color:var(--muted-foreground);margin-bottom:1rem;">${dish.description}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:1.5rem;font-weight:bold;color:var(--primary);">$${dish.price.toFixed(2)}</span>
        <button class="btn btn-primary" onclick="addToCart('${dish.name}')">
           Order Now
        </button>
      </div>
    </div>
  `).join('');
}



const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navbarLinks = document.getElementById('navbar-links');

if (mobileMenuBtn && navbarLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.setAttribute('data-lucide', navbarLinks.classList.contains('active') ? 'x' : 'menu');
    lucide.createIcons();
  });
}