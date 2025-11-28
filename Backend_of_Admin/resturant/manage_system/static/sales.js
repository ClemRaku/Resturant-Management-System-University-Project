function saveSales() {
    localStorage.setItem("salesData", JSON.stringify(sales));
}


const modal = document.getElementById("editSalesModal");
const closeModal = document.getElementById("closeEditIntModal");

function openEditModal(sale_id, customer_id, employee_id, table_no, items, sale_time, payment_method, amount, status) {
    modal.style.display = "block";

    document.getElementById("edit_sales_id").value = sale_id;
    document.getElementById("edit_sal_time").value = sale_time;
    document.getElementById("edit_pay_method").value = payment_method;
    document.getElementById("edit_sale_status").value = status;
}

closeModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};

// Search functionality
document.getElementById('searchSales').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase().trim();
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const salesId = row.cells[0].textContent.toLowerCase(); // First column is Sales ID
        if (salesId.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
