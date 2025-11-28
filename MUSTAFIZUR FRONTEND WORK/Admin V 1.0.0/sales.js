function saveSales() {
    localStorage.setItem("salesData", JSON.stringify(sales));
}

//load table

function loadSalesTable() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    sales.forEach((s) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${s.sales_id}</td>
            <td>${s.customer_id}</td>
            <td>${s.employee_id}</td>
            <td>${s.table_no}</td>
            <td>${s.items}</td>
            <td>${s.time.replace("T", " ")}</td>
            <td>${s.payment}</td>
            <td>${s.amount}</td>
            <td>${s.status}</td>
        `;

        row.addEventListener("click", () => openEditModal(s.sales_id));
        tbody.appendChild(row);
    });

    updateTopCards();
}

//update top card

function updateTopCards() {
    const totalSales = sales.reduce((sum, s) => sum + Number(s.amount), 0);
    const totalTransactions = sales.length;
    const pendingAmount = sales
        .filter(s => s.status.toLowerCase() === "pending")
        .reduce((sum, s) => sum + Number(s.amount), 0);

    document.querySelector('input[name="total_sales"]').value = totalSales;
    document.querySelector('input[name="total_transactions"]').value = totalTransactions;
    document.querySelector('input[name="pending_amount"]').value = pendingAmount;
}

//search function

document.getElementById("searchSales").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    sales
        .filter(s => s.sales_id.toLowerCase().includes(searchValue))
        .forEach(s => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${s.sales_id}</td>
                <td>${s.customer_id}</td>
                <td>${s.employee_id}</td>
                <td>${s.table_no}</td>
                <td>${s.items}</td>
                <td>${s.time.replace("T", " ")}</td>
                <td>${s.payment}</td>
                <td>${s.amount}</td>
                <td>${s.status}</td>
            `;

            row.addEventListener("click", () => openEditModal(s.sales_id));
            tbody.appendChild(row);
        });
});

//edit popup page

const modal = document.getElementById("editSalesModal");
const closeModal = document.getElementById("closeEditIntModal");

function openEditModal(id) {
    const s = sales.find(item => item.sales_id === id);
    if (!s) return;

    modal.style.display = "block";

    document.getElementById("edit_sales_id").value = s.sales_id;
    document.getElementById("edit_int_item_name").value = s.customer_id;
    document.getElementById("edit_sal_emp_id").value = s.employee_id;
    document.getElementById("edit_sal_table_no").value = s.table_no;
    document.getElementById("edit_sal_items").value = s.items;
    document.getElementById("edit_sal_time").value = s.time;
    document.getElementById("edit_pay_method").value = s.payment;
    document.getElementById("edit_sal_amount").value = s.amount;
    document.getElementById("edit_sal_status").value = s.status;
}

closeModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};


document.getElementById("saveEditedsales").addEventListener("click", function () {
    const id = document.getElementById("edit_sales_id").value;

    const index = sales.findIndex(s => s.sales_id === id);
    if (index === -1) return;

    sales[index].employee_id = document.getElementById("edit_sal_emp_id").value;
    sales[index].table_no = document.getElementById("edit_sal_table_no").value;
    sales[index].items = document.getElementById("edit_sal_items").value;
    sales[index].time = document.getElementById("edit_sal_time").value;
    sales[index].payment = document.getElementById("edit_pay_method").value;
    sales[index].amount = document.getElementById("edit_sal_amount").value;
    sales[index].status = document.getElementById("edit_sal_status").value;

    saveSales();
    loadSalesTable();

    modal.style.display = "none";
});

loadSalesTable();