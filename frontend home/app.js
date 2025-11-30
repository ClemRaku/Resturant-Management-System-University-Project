const highlightContainer = document.getElementById('highlight-featured-dishes');

const highlightDishes = [
  { name: 'Beef Kabab', description: 'Juicy kababs grilled to perfection', price: 29.99, image: 'image/Beef kabab.jpg' },
  { name: 'Momo', description: 'Steamed dumplings filled with tender meat', price: 19.99, image:'image/momo.jpg' },
  { name: 'Kacchi', description: 'Traditional slow-cooked kacchi, bursting with flavors', price: 9.99, image:'image/kacchi.jpg' }
];

if (highlightContainer) {
  highlightContainer.innerHTML = highlightDishes.map(dish =>
    `<div class="card">
       <img src="${dish.image}" alt="${dish.name}">
       <h3>${dish.name}</h3>
       <p>${dish.description}</p>
       <div class="price-row">
         <span class="price">$${dish.price.toFixed(2)}</span>
         <button class="btn btn-primary">Order Now</button>
       </div>
    </div>`).join('');
}


const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navbarLinks = document.getElementById('navbar-links');

if (mobileMenuBtn && navbarLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navbarLinks.classList.toggle('active'); // links show/hide
    const icon = mobileMenuBtn.querySelector('i');
    icon.setAttribute('data-lucide', navbarLinks.classList.contains('active') ? 'x' : 'menu');
    lucide.createIcons(); // icon update
  });
}

// Optional: click on any link -> close mobile menu
document.querySelectorAll('#navbar-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navbarLinks.classList.contains('active')) {
      navbarLinks.classList.remove('active');
      mobileMenuBtn.querySelector('i').setAttribute('data-lucide','menu');
      lucide.createIcons();
    }
  });
});











