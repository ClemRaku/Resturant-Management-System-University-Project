const highlightContainer = document.getElementById('highlight-featured-dishes');

const highlightDishes = [
  { name: 'Beef Kabab', description: 'Juicy kababs grilled to perfection', price: 299, image: '../image/Beef kabab.jpg' },
  { name: 'Momo', description: 'Steamed dumplings filled with tender meat', price: 210, image:'../image/momo.jpg' },
  { name: 'Kacchi', description: 'Traditional slow-cooked kacchi, bursting with flavors', price: 400, image:'../image/kacchi.jpg' }
];

if (highlightContainer) {
  highlightContainer.innerHTML = highlightDishes.map(dish =>
    `<div class="card">
       <img src="${dish.image}" alt="${dish.name}">
       <h3>${dish.name}</h3>
       <p>${dish.description}</p>
       <div class="price-row">
       <span class="price">${dish.price}tk</span>        
         <button class="btn btn-primary">Order Now</button>
       </div>
    </div>`).join('');
}


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
