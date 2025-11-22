let inventory = JSON.parse(localStorage.getItem("inventory_data")) || [];

function saveInventory() {
    localStorage.setItem("inventory_data", JSON.stringify(inventory));
}

// ============================
// DOM Elements
// ============================
const tableBody = document.querySelector("tbody");

const addModal = document.getElementById("addInventoryModal");
const editModal = document.getElementById("editInventoryModal");

const openAddBtn = document.getElementById("openModal");
const closeAddBtn = document.getElementById("closeAddModal");
const closeEditBtn = document.getElementById("closeEditIntModal");

const saveNewItemBtn = document.getElementById("saveNewItem");
const saveEditedInventoryBtn = document.getElementById("saveEditedInventory");

const searchInput = document.getElementById("searchInventory");

// ============================
// Modal Open/Close
// ============================
openAddBtn.onclick = () => addModal.style.display = "block";
closeAddBtn.onclick = () => addModal.style.display = "none";
closeEditBtn.onclick = () => editModal.style.display = "none";

window.onclick = function (e) {
    if (e.target === addModal) addModal.style.display = "none";
    if (e.target === editModal) editModal.style.display = "none";
};

// ============================
// Display Inventory Table
// ============================
function displayInventory(items = inventory) {
    tableBody.innerHTML = "";

    items.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.minStock}</td>
            <td>${item.restock}</td>
            <td>${item.supplierId}</td>
            <td>${item.supplierName}</td>
            <td>${item.supplierContact}</td>
            <td>${item.price}</td>
            <td>${item.status}</td>

            <td>
                <button class="btn" onclick="editItem(${index})">✏ Edit</button>
                <button class="btn" onclick="deleteItem(${index})" style="background:red;">🗑 Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

displayInventory();

// ============================
// Add New Inventory Item
// ============================
saveNewItemBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const newItem = {
        id: Date.now(),
        name: document.getElementById("add_item_name").value,
        quantity: document.getElementById("add_quantity").value,
        minStock: document.getElementById("add_min_stock").value,
        restock: document.getElementById("add_restock").value,
        supplierId: document.getElementById("add_sup_id").value,
        supplierName: document.getElementById("add_sup_name").value,
        supplierContact: document.getElementById("add_sup_contact").value,
        price: document.getElementById("add_int_price").value,
        status: document.getElementById("add_status").value
    };

    inventory.push(newItem);
    saveInventory();
    displayInventory();

    addModal.style.display = "none";
});

// ============================
// Edit Inventory Item
// ============================
function editItem(index) {
    const item = inventory[index];

    // Fill modal inputs
    document.getElementById("edit_int_id").value = item.id;
    document.getElementById("edit_int_item_name").value = item.name;
    document.getElementById("edit_int_quantity").value = item.quantity;
    document.getElementById("edit_int_mini_stock").value = item.minStock;
    document.getElementById("edit_int_restock").value = item.restock;
    document.getElementById("edit_sup_id").value = item.supplierId;
    document.getElementById("edit_sup_name").value = item.supplierName;
    document.getElementById("edit_sup_contact").value = item.supplierContact;
    document.getElementById("edit_int_price").value = item.price;
    document.getElementById("edit_int_status").value = item.status;

    editModal.style.display = "block";

    saveEditedInventoryBtn.onclick = function (e) {
        e.preventDefault();

        item.quantity = document.getElementById("edit_int_quantity").value;
        item.minStock = document.getElementById("edit_int_mini_stock").value;
        item.restock = document.getElementById("edit_int_restock").value;
        item.supplierId = document.getElementById("edit_sup_id").value;
        item.supplierName = document.getElementById("edit_sup_name").value;
        item.supplierContact = document.getElementById("edit_sup_contact").value;
        item.price = document.getElementById("edit_int_price").value;
        item.status = document.getElementById("edit_int_status").value;

        saveInventory();
        displayInventory();
        editModal.style.display = "none";
    };
}

// ============================
// Delete Item
// ============================
function deleteItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        inventory.splice(index, 1);
        saveInventory();
        displayInventory();
    }
}

window.editItem = editItem;
window.deleteItem = deleteItem;

// ============================
// Search Inventory
// ============================
searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = inventory.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.id.toString().includes(value)
    );

    displayInventory(filtered);
});