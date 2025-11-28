// ==============================
// LocalStorage Key
// ==============================
const MENU_KEY = "restaurant_menu_items";

// ==============================
// Load Menu Items from LocalStorage
// ==============================
function getMenu() {
    return JSON.parse(localStorage.getItem(MENU_KEY)) || [];
}

function saveMenu(data) {
    localStorage.setItem(MENU_KEY, JSON.stringify(data));
}

// ==============================
// Render Menu Table
// ==============================
function renderMenuTable() {
    const table = document.querySelector("table");
    const menu = getMenu();

    let html = `
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Description</th>
                <th>Ingredients</th>
                <th>Prep Time</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
    `;

    menu.forEach(item => {
        html += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td><img src="${item.image}" style="width:60px; height:60px; object-fit:cover;"></td>
                <td>${item.category}</td>
                <td>${item.description}</td>
                <td>${item.ingredients}</td>
                <td>${item.prepTime}</td>
                <td>${item.price} Tk</td>
                <td>${item.status}</td>

                <td>
                    <button class="editBtn" data-id="${item.id}">Edit</button>
                    <button class="deleteBtn" data-id="${item.id}">Delete</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody>`;
    table.innerHTML = html;

    attachEditEvents();
    attachDeleteEvents();
}

// ==============================
// Add New Image Preview
// ==============================
document.querySelectorAll(".imageInput").forEach(input => {
    input.addEventListener("change", function () {
        let file = this.files[0];
        let preview = document.querySelector(`img.preview[data-id="${this.dataset.id}"]`);

        if (file) {
            let reader = new FileReader();
            reader.onload = () => {
                preview.src = reader.result;
                preview.style.display = "block";
                this.dataset.imageData = reader.result; // store encoded image
            };
            reader.readAsDataURL(file);
        }
    });
});

// ==============================
// Add Item
// ==============================
document.getElementById("addItemBtn").addEventListener("click", function (e) {
    e.preventDefault();

    const menu = getMenu();

    const newItem = {
        id: document.getElementById("new_menu_id").value,
        name: document.getElementById("new_menu_name").value,
        category: document.getElementById("new_catagory").value,
        ingredients: document.getElementById("new_ingredients").value,
        prepTime: document.getElementById("new_preparation_time").value,
        price: document.getElementById("new_price").value,
        description: document.getElementById("new_description").value,
        image: document.querySelector(".imageInput[data-id='1']").dataset.imageData || "",
        status: "Available",
    };

    menu.push(newItem);
    saveMenu(menu);
    renderMenuTable();

    document.getElementById("menuModal").style.display = "none";
});

// ==============================
// Open Add Modal
// ==============================
document.getElementById("openModal").onclick = () => {
    document.getElementById("menuModal").style.display = "block";
};
document.getElementById("closeModal").onclick = () => {
    document.getElementById("menuModal").style.display = "none";
};

// ==============================
// Delete Item
// ==============================
function attachDeleteEvents() {
    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.onclick = () => {
            let id = btn.dataset.id;
            let menu = getMenu().filter(item => item.id != id);
            saveMenu(menu);
            renderMenuTable();
        };
    });
}

// ==============================
// Edit Item Modal
// ==============================
function attachEditEvents() {
    document.querySelectorAll(".editBtn").forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.id;
            const menu = getMenu();
            const item = menu.find(m => m.id == id);

            document.getElementById("edit_menu_id").value = item.id;
            document.getElementById("edit_menu_name").value = item.name;
            document.getElementById("edit_category").value = item.category;
            document.getElementById("edit_description").value = item.description;
            document.getElementById("edit_ingredients").value = item.ingredients;
            document.getElementById("edit_preparation_time").value = item.prepTime;
            document.getElementById("edit_price").value = item.price;

            const preview = document.querySelector("#editMenuModal img.preview");
            preview.src = item.image;
            preview.style.display = "block";

            document.getElementById("editMenuModal").style.display = "block";
        };
    });
}


// Save Edit Changes

document.getElementById("saveEdit").addEventListener("click", function (e) {
    e.preventDefault();

    const menu = getMenu();
    const id = document.getElementById("edit_menu_id").value;

    const itemIndex = menu.findIndex(m => m.id == id);

    let newImage = document.querySelector("#editMenuModal .imageInput").dataset.imageData;
    if (!newImage) {
        newImage = menu[itemIndex].image;
    }

    menu[itemIndex] = {
        ...menu[itemIndex],
        name: document.getElementById("edit_menu_name").value,
        category: document.getElementById("edit_category").value,
        description: document.getElementById("edit_description").value,
        ingredients: document.getElementById("edit_ingredients").value,
        prepTime: document.getElementById("edit_preparation_time").value,
        price: document.getElementById("edit_price").value,
        image: newImage,
    };

    saveMenu(menu);
    renderMenuTable();

    document.getElementById("editMenuModal").style.display = "none";
});


// Close Edit Modal

document.getElementById("closeEditModal").onclick = () => {
    document.getElementById("editMenuModal").style.display = "none";
};


// Search Menu

document.getElementById("searchMenu").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const id = row.children[0].textContent.toLowerCase();
        const name = row.children[1].textContent.toLowerCase();

        row.style.display = (id.includes(query) || name.includes(query)) ? "" : "none";
    });
});


