let customers = JSON.parse(localStorage.getItem("customers")) || [];


const tbody = document.querySelector("table tbody");
const searchInput = document.getElementById("searchMenu");
const editModal = document.getElementById("editCustomerModal");
const closeEditModal = document.getElementById("closeEditModal");


function renderTable(data = customers) {
    tbody.innerHTML = "";

    data.forEach(cus => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${cus.customerId}</td>
            <td>${cus.name}</td>
            <td>${cus.phone}</td>
            <td>${cus.visitNo}</td>
            <td>${cus.dish || "-"}</td>
            <td>${cus.address}</td>
            <td>${cus.email}</td>
            <td>${cus.status}</td>
            <td>
                <button class="edit-btn" onclick="openEditCustomer(${cus.customerId})">
                    <i data-lucide="pencil"></i>
                </button>

                <button class="delete-btn" onclick="deleteCustomer(${cus.customerId})">
                    <i data-lucide="trash"></i>
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    lucide.createIcons(); // Refresh icons
}


function deleteCustomer(id) {
    customers = customers.filter(c => c.customerId != id);
    localStorage.setItem("customers", JSON.stringify(customers));
    renderTable();
}


function openEditCustomer(id) {
    const cus = customers.find(c => c.customerId == id);
    if (!cus) return;

    document.getElementById("edit_customer_id").value = cus.customerId;
    document.getElementById("edit_customer_name").value = cus.name;
    document.getElementById("edit_cus_phone").value = cus.phone;
    document.getElementById("edit_cus_visit").value = cus.visitNo;
    document.getElementById("edit_cus_address").value = cus.address;
    document.getElementById("edit_cus_email").value = cus.email;
    document.getElementById("edit_cus_status").value = cus.status;

    editModal.style.display = "flex";
}


document.getElementById("saveEdit").onclick = (e) => {
    e.preventDefault(); // stop form reload

    const id = document.getElementById("edit_customer_id").value;
    const cus = customers.find(c => c.customerId == id);
    if (!cus) return;

    cus.name = document.getElementById("edit_customer_name").value;
    cus.phone = document.getElementById("edit_cus_phone").value;
    cus.visitNo = document.getElementById("edit_cus_visit").value;
    cus.address = document.getElementById("edit_cus_address").value;
    cus.email = document.getElementById("edit_cus_email").value;
    cus.status = document.getElementById("edit_cus_status").value;

    localStorage.setItem("customers", JSON.stringify(customers));
    renderTable();
    editModal.style.display = "none";
};


searchInput.addEventListener("input", function () {
    const q = this.value.toLowerCase();

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.customerId.toString().includes(q)
    );

    renderTable(filtered);
});


closeEditModal.onclick = () => (editModal.style.display = "none");

window.onclick = (e) => {
    if (e.target === editModal) editModal.style.display = "none";
};


renderTable();