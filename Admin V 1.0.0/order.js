function loadOrders() {
    const table = document.getElementById("orderTable");
    table.innerHTML = "";

    orders.forEach(order => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="order-id">${order.order_id}</td>
            <td class="order-customer-id">${order.customer_id}</td>
            <td class="order-menu-id">${order.menu_id}</td>
            <td class="order-sales-id">${order.sales_id}</td>
            <td class="order-time">${order.time}</td>
            <td class="order-price">${order.price}</td>
            <td class="order-status">${order.status}</td>

            <td>
                <button class="edit-btn"
                    data-order-id="${order.order_id}"
                    data-customer-id="${order.customer_id}"
                    data-menu-id="${order.menu_id}"
                    data-sales-id="${order.sales_id}"
                    data-time="${order.time}"
                    data-price="${order.price}"
                    data-status="${order.status}">
                    <i data-lucide="pencil"></i>
                </button>

                <button class="delete-btn" data-id="${order.order_id}">
                    <i data-lucide="trash"></i>
                </button>
            </td>
        `;

        table.appendChild(row);
    });

    lucide.createIcons();
    attachEditButtons();
    attachDeleteButtons();
    updateOrderCounters();
}



// ---------- UPDATE COUNTERS AT THE TOP ----------
function updateOrderCounters() {
    const counts = {
        pending: 0,
        preparing: 0,
        ready: 0,
        completed: 0,
        cancelled: 0
    };

    orders.forEach(o => counts[o.status]++);

    document.querySelector('input[name="pending"]').value = counts.pending;
    document.querySelector('input[name="preparing"]').value = counts.preparing;
    document.querySelector('input[name="ready"]').value = counts.ready;
    document.querySelector('input[name="completed"]').value = counts.completed;
    document.querySelector('input[name="cancelled"]').value = counts.cancelled;
}



// ---------- SEARCH FUNCTION ----------
document.getElementById("orderSearch").addEventListener("keyup", function () {
    const searchValue = this.value.trim();

    const filtered = orders.filter(o =>
        o.order_id.toString().includes(searchValue)
    );

    const table = document.getElementById("orderTable");
    table.innerHTML = "";

    filtered.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.order_id}</td>
            <td>${order.customer_id}</td>
            <td>${order.menu_id}</td>
            <td>${order.sales_id}</td>
            <td>${order.time}</td>
            <td>${order.price}</td>
            <td>${order.status}</td>

            <td>
                <button class="edit-btn"
                    data-order-id="${order.order_id}"
                    data-customer-id="${order.customer_id}"
                    data-menu-id="${order.menu_id}"
                    data-sales-id="${order.sales_id}"
                    data-time="${order.time}"
                    data-price="${order.price}"
                    data-status="${order.status}">
                    <i data-lucide="pencil"></i>
                </button>

                <button class="delete-btn" data-id="${order.order_id}">
                    <i data-lucide="trash"></i>
                </button>
            </td>
        `;
        table.appendChild(row);
    });

    lucide.createIcons();
    attachEditButtons();
    attachDeleteButtons();
});



// ---------- EDIT ORDER ----------
const modal = document.getElementById("editOrderModal");
const closeModal = document.getElementById("closeEditOrderModal");

function attachEditButtons() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.getElementById("edit_order_id").value = this.dataset.orderId;
            document.getElementById("edit_order_customer_id").value = this.dataset.customerId;
            document.getElementById("edit_order_menu_id").value = this.dataset.menuId;
            document.getElementById("edit_order_sales_id").value = this.dataset.salesId;
            document.getElementById("edit_order_time").value = this.dataset.time;
            document.getElementById("edit_order_price").value = this.dataset.price;
            document.getElementById("edit_order_status").value = this.dataset.status;

            modal.style.display = "block";
        });
    });
}

closeModal.onclick = () => { modal.style.display = "none"; };

window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };



// ---------- SAVE EDITED ORDER ----------
document.getElementById("saveEditedOrder").addEventListener("click", function () {
    const id = parseInt(document.getElementById("edit_order_id").value);

    const order = orders.find(o => o.order_id === id);

    order.customer_id = document.getElementById("edit_order_customer_id").value;
    order.menu_id = document.getElementById("edit_order_menu_id").value;
    order.sales_id = document.getElementById("edit_order_sales_id").value;
    order.time = document.getElementById("edit_order_time").value;
    order.price = document.getElementById("edit_order_price").value;
    order.status = document.getElementById("edit_order_status").value;

    modal.style.display = "none";

    loadOrders();
});



// ---------- DELETE ORDER ----------
function attachDeleteButtons() {
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const id = parseInt(this.dataset.id);

            orders = orders.filter(o => o.order_id !== id);

            loadOrders();
        });
    });
}

