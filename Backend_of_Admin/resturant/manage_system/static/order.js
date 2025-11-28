
let orders = JSON.parse(localStorage.getItem("orders_data")) || [];

const orderTable = document.getElementById("orderTable");

// Modals
const addModal = document.getElementById("addOrderModal");
const editModal = document.getElementById("editOrderModal");

// Buttons
const openAdd = document.getElementById("openModal");
const closeAdd = document.getElementById("closeAddModal");
const closeEdit = document.getElementById("closeEditOrderModal");
const saveNewOrder = document.getElementById("saveNewOrder");
const saveEditedOrder = document.getElementById("saveEditedOrder");

const searchInput = document.getElementById("orderSearch");

// Dynamic menu items for add modal
let addMoreBtn = null;
let menuItemsContainer = null;

// Dynamic menu items for edit modal
let editMoreBtn = null;
let editMenuItemsContainer = null;

openAdd.onclick = () => {
    addModal.style.display = "block";
    if (!addMoreBtn) {
        addMoreBtn = document.getElementById('add-more');
        menuItemsContainer = document.getElementById('menu-items');
        addMoreBtn.onclick = () => {
            const newItem = document.createElement('div');
            newItem.className = 'menu-item';
            newItem.style.display = 'flex';
            newItem.style.flexDirection = 'column';
            newItem.style.gap = '10px';

            const menuDiv = document.createElement('div');
            const menuLabel = document.createElement('label');
            menuLabel.textContent = 'Menu Item';
            menuDiv.appendChild(menuLabel);
            menuDiv.appendChild(document.createElement('br'));
            const firstSelect = document.querySelector('select[name="add_order_menu_id"]');
            if (firstSelect) {
                const clonedSelect = firstSelect.cloneNode(true);
                menuDiv.appendChild(clonedSelect);
            }

            const qtyDiv = document.createElement('div');
            const qtyLabel = document.createElement('label');
            qtyLabel.textContent = 'Quantity';
            qtyDiv.appendChild(qtyLabel);
            qtyDiv.appendChild(document.createElement('br'));
            const qtyInput = document.createElement('input');
            qtyInput.type = 'number';
            qtyInput.name = 'add_order_quantity';
            qtyInput.min = '1';
            qtyInput.value = '1';
            qtyInput.required = true;
            qtyDiv.appendChild(qtyInput);

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'remove-item';
            removeBtn.textContent = 'Remove';

            newItem.appendChild(menuDiv);
            newItem.appendChild(qtyDiv);
            newItem.appendChild(removeBtn);

            menuItemsContainer.appendChild(newItem);
            newItem.querySelector('.remove-item').onclick = () => {
                menuItemsContainer.removeChild(newItem);
            };
        };
    }
};
closeAdd.onclick = () => addModal.style.display = "none";
closeEdit.onclick = () => editModal.style.display = "none";

window.onclick = (e) => {
    if (e.target === addModal) addModal.style.display = "none";
    if (e.target === editModal) editModal.style.display = "none";
};



function saveOrders() {
    localStorage.setItem("orders_data", JSON.stringify(orders));
}


//load data on table
function loadOrderTable() {
    orderTable.innerHTML = "";

    orders.forEach(order => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.order_id}</td>
            <td>${order.customer_id}</td>
            <td>${order.menu_id}</td>
            <td>${order.order_time}</td>
            <td>${order.price}</td>
            <td>${order.status}</td>

            <td>
                <button class="edit-btn"
                    data-order='${JSON.stringify(order)}'>
                    <i data-lucide="pencil"></i>
                </button>

                <button class="delete-btn" data-id="${order.order_id}">
                    <i data-lucide="trash"></i>
                </button>
            </td>
        `;

        orderTable.appendChild(row);
    });

    lucide.createIcons();
    attachListeners();
    updateCounters();
}


//update counter 
function updateCounters() {
    const counter = {
        pending: 0,
        processing: 0,
        ready: 0,
        completed: 0,
        cancelled: 0
    };

    orders.forEach(o => counter[o.status]++);

    document.querySelector('input[name="pending"]').value = counter.pending;
    document.querySelector('input[name="preparing"]').value = counter.processing;
    document.querySelector('input[name="ready"]').value = counter.ready;
    document.querySelector('input[name="completed"]').value = counter.completed;
    document.querySelector('input[name="cancelled"]').value = counter.cancelled;
}

//add order
// saveNewOrder lets the form submit normally for Django view


//order edit ar jonno
function openEditModal(order) {
    document.getElementById("edit_order_id").value = order.order_id;
    document.getElementById("edit_order_customer_id").value = order.customer_id;
    document.getElementById("edit_order_time").value = order.order_time;
    document.getElementById("edit_order_status").value = order.status;
    document.getElementById("edit_order_employee_id").value = order.employee_id;

    editModal.style.display = "block";

    if (!editMoreBtn) {
        editMoreBtn = document.getElementById('edit-add-more');
        editMenuItemsContainer = document.getElementById('edit-menu-items');
        editMoreBtn.onclick = () => {
            const newItem = document.createElement('div');
            newItem.className = 'menu-item';
            newItem.style.display = 'flex';
            newItem.style.flexDirection = 'column';
            newItem.style.gap = '10px';

            const menuDiv = document.createElement('div');
            const menuLabel = document.createElement('label');
            menuLabel.textContent = 'Menu Item';
            menuDiv.appendChild(menuLabel);
            menuDiv.appendChild(document.createElement('br'));
            const firstSelect = document.querySelector('select[name="edit_order_menu_id"]');
            if (firstSelect) {
                const clonedSelect = firstSelect.cloneNode(true);
                menuDiv.appendChild(clonedSelect);
            }

            const qtyDiv = document.createElement('div');
            const qtyLabel = document.createElement('label');
            qtyLabel.textContent = 'Quantity';
            qtyDiv.appendChild(qtyLabel);
            qtyDiv.appendChild(document.createElement('br'));
            const qtyInput = document.createElement('input');
            qtyInput.type = 'number';
            qtyInput.name = 'edit_order_quantity';
            qtyInput.min = '1';
            qtyInput.value = '1';
            qtyInput.required = true;
            qtyDiv.appendChild(qtyInput);

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'remove-item';
            removeBtn.textContent = 'Remove';

            newItem.appendChild(menuDiv);
            newItem.appendChild(qtyDiv);
            newItem.appendChild(removeBtn);

            editMenuItemsContainer.appendChild(newItem);
            newItem.querySelector('.remove-item').onclick = () => {
                editMenuItemsContainer.removeChild(newItem);
            };
        };
    }
}

// saveEditedOrder lets the form submit normally for Django view


//order delete ar jonno
// delete handled by GET request in attachListeners

function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            let order = JSON.parse(this.dataset.order);
            openEditModal(order);
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            window.location.href = "?delete_order_id=" + this.dataset.id;
        });
    });
}

//search function ar jonno
searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    document.querySelectorAll("#orderTable tr").forEach(row => {
        row.style.display =
            row.innerText.toLowerCase().includes(value) ? "" : "none";
    });
});

// Attach listeners on page load, table is rendered by Django
attachListeners();
lucide.createIcons();
