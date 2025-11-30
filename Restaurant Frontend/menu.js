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


// menu dta//
const menuItems = [
  // Starters//
  {
    id: "1",
    name: "Spring Rolls",
    description: "Crispy veggie spring rolls",
    price: 156,
    category: "Starter",
    image: "image/spring roll.png"
  },
  {
    id: "2",
    name: "Fuchka Shot",
    description: "Mini fuchkas served in shot glasses with tamarind-mint chutney.",
    price: 200,
    category: "Starter",
    image: "image/fuchka shot.png"
  },
  {
    id: "3",
    name: "Somosa",
    description: "Golden triangles filled with spiced potatoes, perfectly crunchy and comforting",
    price: 170,
    category: "Starter",
    image: "image/somosa.png"
  },
  {
    id: "4",
    name: "Singara",
    description: "Flaky pastry with lightly spiced onion filling, a Bengali classic",
    price: 165,
    category: "Starter",
    image: "image/singara.png"
  },
  {
    id: "5",
    name: "Dim Chop",
    description: "Deep-fried boiled egg coated with spiced minced meat",
    price: 99,
    category: "Starter",
    image: "image/dim chop.jpg"
  },
  {
    id: "6",
    name: "Beguni",
    description: "Thin eggplant slices, golden fried with a hint of spice.",
    price: 120,
    category: "Starter",
    image: "image/begoni.png"
  },

  // Main Course//
  {
    id: "7",
    name: "Kacchi",
    description: "Tender mutton and fragrant rice cooked in classic kacchi style",
    price: 400,
    category: "Main-Course",
    image: "image/main1.png"
  },
  {
    id: "8",
    name: "Manso Bhuna",
    description: "Slow-cooked mutton bhuna packed with deep, rich Bangladeshi spices",
    price: 290,
    category: "Main-Course",
    image: "image/main2.png"
  },
  {
    id: "9",
    name: "Khichuri",
    description: "Warm and comforting khichuri",
    price: 300,
    category: "Main-Course",
    image: "image/main3.png"
  },
  {
    id: "10",
    name: "Grilled Chicken",
    description: "Juicy grilled chicken served with light spices",
    price: 240,
    category: "Main-Course",
    image: "image/main4.png"
  },
  {
    id: "11",
    name: "Chingri Malaikari",
    description: "Soft prawns cooked in creamy coconut milk",
    price: 170,
    category: "Main-Course",
    image: "image/main5.png"
  },
  {
    id: "12",
    name: "Sorisha Ilish",
    description: "Hilsa simmered in bold mustard gravy",
    price: 140,
    category: "Main-Course",
    image: "image/main6.png"
  },
  {
    id: "13",
    name: "Chicken Kabab",
    description: "Tender chicken skewers marinated in aromatic spices",
    price: 267,
    category: "Main-Course",
    image: "image/main7.png"
  },
  {
    id: "14",
    name: "Kala Bhuna",
    description: "Dark, rich beef bhuna slow-cooked with roasted spices",
    price: 189,
    category: "Main-Course",
    image: "image/main8.png"
  },
  {
    id: "15",
    name: "Panta Vat",
    description: "Fermented rice served with bhorta and Hilsha fish.",
    price: 400,
    category: "Main-Course",
    image: "image/main9.png"
  },

  // Desserts//
  {
    id: "16",
    name: "Shahi Tudka",
    description: "Crispy fried bread soaked in rich milk and ghee.",
    price: 150,
    category: "Desserts",
    image: "image/dessert1.jpg"
  },
  {
    id: "17",
    name: "Shemai",
    description: "Light, creamy vermicelli cooked in sweet milk.",
    price: 146,
    category: "Desserts",
    image: "image/dessert2.jpg"
  },
  {
    id: "18",
    name: "Rasgulla",
    description: "Soft spongy balls soaked in light sugar syrup.",
    price: 135,
    category: "Desserts",
    image: "image/dessert3.jpg"
  },
  {
    id: "19",
    name: "Gulab Jamuns",
    description: "Warm, melt-in-mouth sweet dumplings in syrup.",
    price: 140,
    category: "Desserts",
    image: "image/dessert4.jpg"
  },
  {
    id: "20",
    name: "Rashmalai",
    description: "Soft paneer discs served in creamy saffron milk.",
    price: 130,
    category: "Desserts",
    image: "image/dessert5.jpg"
  },
  {
    id: "21",
    name: "Kulfi",
    description: "Traditional frozen milk dessert with a nutty taste.",
    price: 105,
    category: "Desserts",
    image: "image/dessert6.jpg"
  },
  {
    id: "22",
    name: "Jilapi",
    description: "Hot, crispy swirls dipped in aromatic sugar syrup.",
    price: 120,
    category: "Desserts",
    image: "image/dessert7.jpg"
  },
  {
    id: "23",
    name: "Firni",
    description: "Smooth rice pudding flavored with cardamom.",
    price: 115,
    category: "Desserts",
    image: "image/dessert8.jpg"
  },
  {
    id: "24",
    name: "Misti Doi",
    description: "Classic sweet yogurt with a rich caramel taste.",
    price: 110,
    category: "Desserts",
    image: "image/dessert9.jpg"
  },

  // Drinks//
  {
    id: "25",
    name: "Badam Sorbot",
    description: "Light, creamy badam drink with a refreshing touch.",
    price: 160,
    category: "Drinks",
    image: "image/drinks1.jpg"
  },
  {
    id: "26",
    name: "Lacchi",
    description: "Classic sweet lassi, smooth and perfectly chilled.",
    price: 150,
    category: "Drinks",
    image: "image/drinks2.jpg"
  },
  {
    id: "27",
    name: "Jafran Sorbot",
    description: "Saffron-infused drink with a soft aroma.",
    price: 175,
    category: "Drinks",
    image: "image/drinks3.jpg"
  },
  {
    id: "28",
    name: "Borhani",
    description: "Cool, spiced yogurt drink—perfect with meals.",
    price: 135,
    category: "Drinks",
    image: "image/drinks4.jpg"
  },
  {
    id: "29",
    name: "Rong Cha",
    description: "Warm, soothing tea with a deep flavor.",
    price: 100,
    category: "Drinks",
    image: "image/drinks5.jpg"
  },
  {
    id: "30",
    name: "Malai Cha",
    description: "Rich creamy tea topped with soft malai.",
    price: 120,
    category: "Drinks",
    image: "image/drinks6.jpg"
  },
  {
    id: "31",
    name: "Lemonade",
    description: "Fresh lemon drink with a crisp, tangy finish.",
    price: 130,
    category: "Drinks",
    image: "image/drinks7.jpg"
  },
  {
    id: "32",
    name: "Watermelon Drink",
    description: "Juicy chilled watermelon blend, naturally sweet.",
    price: 125,
    category: "Drinks",
    image: "image/drinks8.jpg"
  },
  {
    id: "33",
    name: "Pineapple Drink",
    description: "Bright tropical pineapple drink with a refreshing kick.",
    price: 137,
    category: "Drinks",
    image: "image/drinks9.jpg"
  }
];

// searchbae//
let selectedCategory = 'all';
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

  // filter er button //
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
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
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
            <span>${item.price}tk</span>
            <button class="add-btn" onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
          </div>
        </div>
      </div>
    `
    )
    .join('');
}
