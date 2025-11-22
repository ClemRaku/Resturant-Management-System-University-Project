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



openAdd.onclick = () => addModal.style.display = "block";
closeAdd.onclick = () => addModal.style.display = "none";
closeEdit.onclick = () => editModal.style.display = "none";

window.onclick = (e) => {
    if (e.target === addModal) addModal.style.display = "none";
    if (e.target === editModal) editModal.style.display = "none";
};



function saveOrders() {
    localStorage.setItem("orders_data", JSON.stringify(orders));
}


//load into table 
function loadOrderTable() {
    orderTable.innerHTML = "";

    orders.forEach(order => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.order_id}</td>
            <td>${order.customer_id}</td>
            <td>${order.menu_id}</td>
            <td>${order.sales_id}</td>
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


//update couters
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


//add new order
saveNewOrder.addEventListener("click", (e) => {
    e.preventDefault();

    const newOrder = {
        order_id: document.getElementById("add_order_id").value,
        customer_id: document.getElementById("add_order_cus_id").value,
        menu_id: document.getElementById("add_order_menu_id").value,
        sales_id: document.getElementById("add_order_salse_id").value,
        order_time: document.getElementById("add_order_time").value,
        price: document.getElementById("add_order_price").value,
        status: document.getElementById("add_order_status").value
    };

    orders.push(newOrder);
    saveOrders();
    loadOrderTable();
    addModal.style.display = "none";
});


//edit orders
function openEditModal(order) {
    document.getElementById("edit_order_id").value = order.order_id;
    document.getElementById("edit_order_customer_id").value = order.customer_id;
    document.getElementById("edit_order_menu_id").value = order.menu_id;
    document.getElementById("edit_order_sales_id").value = order.sales_id;
    document.getElementById("edit_order_time").value = order.order_time;
    document.getElementById("edit_order_price").value = order.price;
    document.getElementById("edit_order_status").value = order.status;

    editModal.style.display = "block";
}

saveEditedOrder.addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.getElementById("edit_order_id").value;
    const idx = orders.findIndex(o => o.order_id === id);

    orders[idx] = {
        order_id: id,
        customer_id: document.getElementById("edit_order_customer_id").value,
        menu_id: document.getElementById("edit_order_menu_id").value,
        sales_id: document.getElementById("edit_order_sales_id").value,
        order_time: document.getElementById("edit_order_time").value,
        price: document.getElementById("edit_order_price").value,
        status: document.getElementById("edit_order_status").value
    };

    saveOrders();
    loadOrderTable();
    editModal.style.display = "none";
});


//delete orders
function deleteOrder(id) {
    orders = orders.filter(o => o.order_id !== id);
    saveOrders();
    loadOrderTable();
}


function attachListeners() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            let order = JSON.parse(this.dataset.order);
            openEditModal(order);
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            deleteOrder(this.dataset.id);
        });
    });
}


//search fuction
searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    document.querySelectorAll("#orderTable tr").forEach(row => {
        row.style.display =
            row.innerText.toLowerCase().includes(value) ? "" : "none";
    });
});



loadOrderTable();