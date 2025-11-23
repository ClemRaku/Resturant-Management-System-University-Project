// =================================================================================
// CORE JS: Modal Control and Server-Side Action Setup
// REMOVED: All client-side data management (localStorage, displayInventory, etc.)
// =================================================================================

// 1. DOM Elements for Modals
const addModal = document.getElementById("addInventoryModal");
const editModal = document.getElementById("editInventoryModal");

const openAddBtn = document.getElementById("openModal");
const closeAddBtn = document.getElementById("closeAddModal");
const closeEditBtn = document.getElementById("closeEditIntModal");

// Select all Edit and Delete buttons that are rendered by the Django template
const editButtons = document.querySelectorAll(".action-btn.edit-btn");
const deleteButtons = document.querySelectorAll(".action-btn.delete-btn");


// 2. Modal Open/Close Logic
openAddBtn.onclick = () => addModal.style.display = "block";
closeAddBtn.onclick = () => addModal.style.display = "none";
closeEditBtn.onclick = () => editModal.style.display = "none";

// Close modals when user clicks outside
window.onclick = function (e) {
    if (e.target === addModal) addModal.style.display = "none";
    if (e.target === editModal) editModal.style.display = "none";
};


// 3. Edit Button Handler (Pulls data from HTML and populates the Edit Modal)
editButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Retrieve data from Django-rendered button attributes (using q.0, q.1, etc.)
        const id = this.getAttribute('data-inventory-id');
        const name = this.getAttribute('data-item-name');
        const quantity = this.getAttribute('data-quantity');
        const minStock = this.getAttribute('data-min-stock');
        const restocked = this.getAttribute('data-restocked');
        const supplierId = this.getAttribute('data-supplier-id');
        const supplierName = this.getAttribute('data-supplier-name');
        const supplierContact = this.getAttribute('data-supplier-contact');
        const price = this.getAttribute('data-price');
        const status = this.getAttribute('data-status'); // This is an integer (1, 0, 2)

        // Populate modal inputs
        document.getElementById("edit_int_id").value = id;
        document.getElementById("edit_int_item_name").value = name;
        document.getElementById("edit_int_quantity").value = quantity;
        document.getElementById("edit_int_mini_stock").value = minStock;
        document.getElementById("edit_int_restock").value = restocked; 
        document.getElementById("edit_sup_id").value = supplierId;
        document.getElementById("edit_sup_name").value = supplierName;
        document.getElementById("edit_sup_contact").value = supplierContact;
        document.getElementById("edit_int_price").value = price;
        
        // Convert integer status back to the string value needed for the <select> element
        let statusString = 'Out_of_stock';
        if (status === '1') {
            statusString = 'Stocked';
        } else if (status === '0') {
            statusString = 'Low Stock';
        }
        document.getElementById("edit_int_status").value = statusString;

        // Show the modal
        editModal.style.display = "block";
    });
});


// 4. Delete Button Handler (Redirects to Django view to handle deletion via database)
deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const id = this.getAttribute('data-inventory-id');
        if (confirm("Are you sure you want to delete Inventory ID: " + id + "?")) {
            // This URL redirect tells your Django view (views.py) to perform the SQL DELETE operation
            window.location.href = `?delete_inventory_id=${id}`;
        }
    });
});

// 5. Initialize lucide icons
lucide.createIcons();