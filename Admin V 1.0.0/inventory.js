
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

//to change the table
function updateInventoryTable() {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = "";

    inventory.forEach(item => {
        tableBody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.item_name}</td>
                <td>${item.quantity}</td>
                <td>${item.min_stock}</td>
                <td>${item.restock}</td>
                <td>${item.sup_id}</td>
                <td>${item.sup_name}</td>
                <td>${item.sup_contact}</td>
                <td>${item.status}</td>

                <td>
                    <button class="btn" onclick="openEditInventory('${item.id}')">Edit</button>
                    <button class="red-btn" onclick="deleteInventory('${item.id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

updateInventoryTable();

//to delete item
function deleteInventory(id) {
    inventory = inventory.filter(item => item.id != id);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    updateInventoryTable();
}

//open edit page
function openEditInventory(id) {
    let item = inventory.find(x => x.id == id);
    if (!item) return;

    document.getElementById("edit_int_id").value = item.id;
    document.getElementById("edit_int_item_name").value = item.item_name;
    document.getElementById("edit_int_quantity").value = item.quantity;
    document.getElementById("edit_int_mini_stock").value = item.min_stock;
    document.getElementById("edit_int_restock").value = item.restock;
    document.getElementById("edit_sup_id").value = item.sup_id;
    document.getElementById("edit_sup_name").value = item.sup_name;
    document.getElementById("edit_sup_contact").value = item.sup_contact;
    document.getElementById("edit_int_status").value = item.status;

    document.getElementById("editInventoryModal").style.display = "flex";
}

// save edited part 
document.getElementById("saveEditedReservation").onclick = () => {
    let id = document.getElementById("edit_int_id").value;
    let item = inventory.find(x => x.id == id);

    item.quantity = document.getElementById("edit_int_quantity").value;
    item.min_stock = document.getElementById("edit_int_mini_stock").value;
    item.restock = document.getElementById("edit_int_restock").value;
    item.sup_id = document.getElementById("edit_sup_id").value;
    item.sup_name = document.getElementById("edit_sup_name").value;
    item.sup_contact = document.getElementById("edit_sup_contact").value;
    item.status = document.getElementById("edit_int_status").value;

    localStorage.setItem("inventory", JSON.stringify(inventory));
    updateInventoryTable();
    document.getElementById("editInventoryModal").style.display = "none";
};

// for search function
document.getElementById("searchReservation").addEventListener("keyup", function () {
    let value = this.value.toLowerCase();
    let rows = document.querySelectorAll("table tbody tr");

    rows.forEach((row, i) => {
        let name = inventory[i].item_name.toLowerCase();
        let id = inventory[i].id.toLowerCase();

        if (name.includes(value) || id.includes(value)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

//to close popup page 
document.getElementById("closeEditIntModal").onclick = () =>
    document.getElementById("editInventoryModal").style.display = "none";

// click outside also close popup page
window.addEventListener("click", e => {
    if (e.target === document.getElementById("editInventoryModal")) {
        document.getElementById("editInventoryModal").style.display = "none";
    }
});


// add new items


document.getElementById("openModal").onclick = () => {
    document.getElementById("addInventoryModal").style.display = "flex";
};


document.getElementById("closeAddModal").onclick = () =>
    document.getElementById("addInventoryModal").style.display = "none";


window.addEventListener("click", e => {
    if (e.target === document.getElementById("addInventoryModal")) {
        document.getElementById("addInventoryModal").style.display = "none";
    }
});


// to save new items
document.getElementById("saveNewItem").onclick = () => {

    let newItem = {
        id: "INT" + Math.floor(Math.random() * 100000),
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

    
    localStorage.setItem("inventory", JSON.stringify(inventory));

    
    updateInventoryTable();

    
    document.getElementById("addInventoryModal").style.display = "none";
};
