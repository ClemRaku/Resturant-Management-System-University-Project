inventory = JSON.parse(localStorage.getItem("inventory_data")) || [];

const tableBody = document.querySelector("tbody");

// Modal elements
const addModal = document.getElementById("addInventoryModal");
const editModal = document.getElementById("editInventoryModal");

const openAddBtn = document.getElementById("openModal");
const closeAddBtn = document.getElementById("closeAddModal");
const closeEditBtn = document.getElementById("closeEditIntModal");

const saveNewItemBtn = document.getElementById("saveNewItem");
const saveEditedItemBtn = document.getElementById("saveEditedInventory");

const searchInput = document.getElementById("searchInventory");

openAddBtn.onclick = () => addModal.style.display = "block";
closeAddBtn.onclick = () => addModal.style.display = "none";
closeEditBtn.onclick = () => editModal.style.display = "none";

window.onclick = function (event) {
    if (event.target == addModal) addModal.style.display = "none";
    if (event.target == editModal) editModal.style.display = "none";
};


function saveData() {
    localStorage.setItem("inventory_data", JSON.stringify(inventory));
}


// GENERATE UNIQUE ID

function generateID() {
    return "INV" + Math.floor(Math.random() * 90000 + 10000);
}


function loadTable() {
    tableBody.innerHTML = "";

    inventory.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.inventory_id}</td>
            <td>${item.item_name}</td>
            <td>${item.quantity}</td>
            <td>${item.min_stock}</td>
            <td>${item.restock}</td>
            <td>${item.sup_id}</td>
            <td>${item.sup_name}</td>
            <td>${item.sup_contact}</td>
            <td>${item.status}</td>
            <td>
                <button class="editBtn" data-id="${item.inventory_id}">Edit</button>
                <button class="deleteBtn" data-id="${item.inventory_id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    addTableListeners();
}

//add new item
saveNewItemBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const newItem = {
        inventory_id: generateID(),
        item_name: document.getElementById("add_item_name").value,
        quantity: document.getElementById("add_quantity").value,
        min_stock: document.getElementById("add_min_stock").value,
        restock: document.getElementById("add_restock").value,
        sup_id: document.getElementById("add_sup_id").value,
        sup_name: document.getElementById("add_sup_name").value,
        sup_contact: document.getElementById("add_sup_contact").value,
        status: document.getElementById("add_status").value
    };

    inventory.push(newItem);
    saveData();
    loadTable();

    addModal.style.display = "none";
});


function addTableListeners() {
    document.querySelectorAll(".editBtn").forEach(btn => {
        btn.addEventListener("click", openEditModal);
    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", deleteItem);
    });
}

//open edit popup
function openEditModal() {
    const id = this.dataset.id;
    const item = inventory.find(t => t.inventory_id === id);

    document.getElementById("edit_int_id").value = item.inventory_id;
    document.getElementById("edit_int_item_name").value = item.item_name;
    document.getElementById("edit_int_quantity").value = item.quantity;
    document.getElementById("edit_int_mini_stock").value = item.min_stock;
    document.getElementById("edit_int_restock").value = item.restock;
    document.getElementById("edit_sup_id").value = item.sup_id;
    document.getElementById("edit_sup_name").value = item.sup_name;
    document.getElementById("edit_sup_contact").value = item.sup_contact;
    document.getElementById("edit_int_status").value = item.status;

    editModal.style.display = "block";
}

//save edit
saveEditedItemBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const id = document.getElementById("edit_int_id").value;

    const index = inventory.findIndex(t => t.inventory_id === id);

    inventory[index] = {
        inventory_id: id,
        item_name: document.getElementById("edit_int_item_name").value,
        quantity: document.getElementById("edit_int_quantity").value,
        min_stock: document.getElementById("edit_int_mini_stock").value,
        restock: document.getElementById("edit_int_restock").value,
        sup_id: document.getElementById("edit_sup_id").value,
        sup_name: document.getElementById("edit_sup_name").value,
        sup_contact: document.getElementById("edit_sup_contact").value,
        status: document.getElementById("edit_int_status").value
    };

    saveData();
    loadTable();
    editModal.style.display = "none";
});

//delete item
function deleteItem() {
    const id = this.dataset.id;
    inventory = inventory.filter(item => item.inventory_id !== id);
    saveData();
    loadTable();
}

//search option
searchInput.addEventListener("keyup", function () {
    const value = searchInput.value.toLowerCase();

    document.querySelectorAll("tbody tr").forEach(row => {
        row.style.display =
            row.innerText.toLowerCase().includes(value) ? "" : "none";
    });
});

// -------------------------------
// INITIAL LOAD
// -------------------------------
loadTable();