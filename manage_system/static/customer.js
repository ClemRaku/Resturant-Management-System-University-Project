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

    lucide.createIcons(); 
}


function deleteCustomer(id) {
    customers = customers.filter(c => c.customerId != id);
    localStorage.setItem("customers", JSON.stringify(customers));

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

function activateEditButtons() {
    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(btn => {
        btn.onclick = () => {
            const row = btn.closest("tr");
            const cells = row.querySelectorAll("td");

            editModal.style.display = "flex";

            document.getElementById("edit_customer_id").value = cells[0].innerText;
            document.getElementById("edit_customer_name").value = cells[1].innerText;
            document.getElementById("edit_customer_phone").value = cells[2].innerText;
            document.getElementById("edit_customer_visits").value = cells[3].innerText;
            document.getElementById("edit_customer_dish").value = cells[4].innerText;
            document.getElementById("edit_customer_address").value = cells[5].innerText;
            document.getElementById("edit_customer_email").value = cells[6].innerText;
            document.getElementById("edit_cus_status").value = cells[7].innerText;
        };
    });
}

activateEditButtons();

function activateDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(btn => {
        btn.onclick = () => {
            const id = btn.getAttribute('data-customer-id');
            if (confirm('Are you sure you want to delete this customer?')) {
                // Send GET request
                window.location.href = '?delete_customer_id=' + id;
            }
        };
    });
}

activateDeleteButtons();


