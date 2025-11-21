let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

// DOM elements

const searchInput = document.getElementById("searchReservation");
const editModal = document.getElementById("editReservationModal");
const closeModal = document.getElementById("closeEditResModal");

// Render reservations table
function renderTable(data = reservations) {
    tbody.innerHTML = "";
    data.forEach(res => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${res.reservationId}</td>
            <td>${res.customerId}</td>
            <td>${res.name}</td>
            <td>${res.phone}</td>
            <td>${res.datetime}</td>
            <td>${res.guests}</td>
            <td>${res.email}</td>
            <td>${res.request}</td>
            <td>${res.status}</td>
            <td>
                <button class="btn" onclick="openEditReservation(${res.reservationId})">Edit</button>
                <button class="red-btn" onclick="deleteReservation(${res.reservationId})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Delete a reservation
function deleteReservation(id) {
    reservations = reservations.filter(r => r.reservationId != id);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    renderTable();
}

// Open modal and populate fields
function openEditReservation(id) {
    const res = reservations.find(r => r.reservationId == id);
    if (!res) return;

    document.getElementById("edit_res_id").value = res.reservationId;
    document.getElementById("edit_res_customer_id").value = res.customerId;
    document.getElementById("edit_res_name").value = res.name;
    document.getElementById("edit_res_phone").value = res.phone;
    document.getElementById("edit_res_email").value = res.email;
    document.getElementById("edit_res_datetime").value = res.datetime;
    document.getElementById("edit_res_guests").value = res.guests;
    document.getElementById("edit_res_request").value = res.request;
    document.getElementById("edit_res_status").value = res.status;

    editModal.style.display = "flex";
}

// Save edited reservation
document.getElementById("saveEditedReservation").onclick = () => {
    const id = document.getElementById("edit_res_id").value;
    const res = reservations.find(r => r.reservationId == id);

    if (!res) return;

    res.name = document.getElementById("edit_res_name").value;
    res.phone = document.getElementById("edit_res_phone").value;
    res.email = document.getElementById("edit_res_email").value;
    res.datetime = document.getElementById("edit_res_datetime").value;
    res.guests = parseInt(document.getElementById("edit_res_guests").value) || 0;
    res.request = document.getElementById("edit_res_request").value;
    res.status = document.getElementById("edit_res_status").value;

    localStorage.setItem("reservations", JSON.stringify(reservations));
    renderTable();
    editModal.style.display = "none";
};

// Search functionality
searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = reservations.filter(r =>
        r.name.toLowerCase().includes(query) ||
        r.reservationId.toString().includes(query)
    );
    renderTable(filtered);
});

// Close modal
closeModal.onclick = () => editModal.style.display = "none";
window.addEventListener("click", e => {
    if (e.target === editModal) editModal.style.display = "none";
});

// Initial render
renderTable();
