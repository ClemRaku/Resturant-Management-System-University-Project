const ADMIN_MENU_KEY = "adminMenuData";
const ADMIN_IMG_KEY = "adminMenuImages";

// -------------------------------
// STATE VARIABLES
// -------------------------------
let menuItems = [];
let selectedCategory = "all";
let searchQuery = "";

// -------------------------------
// LOAD ADMIN MENU DATA
// -------------------------------
function loadAdminMenu() {
  const cards = document.querySelectorAll("#admin-menu .card");
  const savedMenu = JSON.parse(localStorage.getItem(ADMIN_MENU_KEY) || "[]");
  const savedImages = JSON.parse(localStorage.getItem(ADMIN_IMG_KEY) || "{}");

  menuItems = [];

  cards.forEach((card, index) => {
    const imgTag = card.querySelector(".preview");
    const id = imgTag.dataset.id;

    // Restore image
    if (savedImages[id]) {
      imgTag.src = savedImages[id];
      imgTag.style.display = "block";
    } else {
      imgTag.style.display = "none";
    }

    // Restore text fields
    if (savedMenu[index]) {
      card.querySelector(".menu_name").value = savedMenu[index].name;
      card.querySelector(".menu_description").value = savedMenu[index].description;
      card.querySelector(".menu_price").value = savedMenu[index].price;
      card.querySelector(".menu_category").value = savedMenu[index].category;
    }

    const name = card.querySelector(".menu_name").value.trim();
    const desc = card.querySelector(".menu_description").value.trim();
    const price = parseFloat(card.querySelector(".menu_price").value.trim()) || 0;
    const category = card.querySelector(".menu_category").value.trim();

    menuItems.push({
      id: id,
      name,
      description: desc,
      price,
      category,
      image: savedImages[id] || ""
    });
  });

  localStorage.setItem(ADMIN_MENU_KEY, JSON.stringify(menuItems));
}

// -------------------------------
// IMAGE INPUT PREVIEW + SAVE
// -------------------------------
document.addEventListener("change", e => {
  if (e.target.classList.contains("imageInput")) {
    const fileInput = e.target;
    const id = fileInput.dataset.id;
    const imgTag = document.querySelector(`.preview[data-id="${id}"]`);

    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imgTag.src = reader.result;
        imgTag.style.display = "block";

        const savedImages = JSON.parse(localStorage.getItem(ADMIN_IMG_KEY) || "{}");
        savedImages[id] = reader.result;
        localStorage.setItem(ADMIN_IMG_KEY, JSON.stringify(savedImages));

        loadAdminMenu();
        renderCustomerMenu();
      };
      reader.readAsDataURL(file);
    }
  }
});

// -------------------------------
// AUTO UPDATE ADMIN TEXT CHANGES
// -------------------------------
document.addEventListener("input", e => {
  if (
    e.target.classList.contains("menu_name") ||
    e.target.classList.contains("menu_description") ||
    e.target.classList.contains("menu_price") ||
    e.target.classList.contains("menu_category")
  ) {
    loadAdminMenu();
    renderCustomerMenu();
  }
});

// -------------------------------
// RENDER CUSTOMER MENU
// -------------------------------
function renderCustomerMenu() {
  const filtered = menuItems.filter(item => {
    const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });

  const container = document.getElementById("customer-menu");
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align:center; width:100%">No items found</p>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="menu-card">
      ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ""}
      <div class="menu-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-bottom">
          <span>${item.price} tk</span>
          <button class="add-btn" onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
        </div>
      </div>
    </div>
  `).join("");
}

// -------------------------------
// SEARCH & CATEGORY FILTER
// -------------------------------
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", e => {
    searchQuery = e.target.value.toLowerCase();
    renderCustomerMenu();
  });
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    selectedCategory = e.target.dataset.category;
    renderCustomerMenu();
  });
});

// -------------------------------
// INITIAL LOAD
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadAdminMenu();
  renderCustomerMenu();
});