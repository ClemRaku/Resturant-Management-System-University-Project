
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];


function updateReservationTables() {
    const t1 = document.getElementById("reservationTable1");
    const t2 = document.getElementById("reservationTable2");

    t1.innerHTML = "";
    t2.innerHTML = "";

    reservations.forEach(res => {
        t1.innerHTML += `
            <tr>
                <td>${res.id}</td>
                <td>${res.name}</td>
                <td>${res.phone}</td>
                <td>${res.datetime}</td>
                <td>${res.guests}</td>
            </tr>
        `;

        t2.innerHTML += `
            <tr>
                <td>${res.email}</td>
                <td>${res.request}</td>
                <td>${res.status}</td>
                <td>
                    <button class="btn" onclick="openEditReservation(${res.id})">Edit</button>
                    <button class="red-btn" onclick="deleteReservation(${res.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

updateReservationTables();


function deleteReservation(id) {
    reservations = reservations.filter(r => r.id != id);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    updateReservationTables();
}


function openEditReservation(id) {
    let r = reservations.find(x => x.id == id);

    document.getElementById("edit_res_id").value = r.id;
    document.getElementById("edit_res_name").value = r.name;
    document.getElementById("edit_res_phone").value = r.phone;
    document.getElementById("edit_res_email").value = r.email;
    document.getElementById("edit_res_datetime").value = r.datetime;
    document.getElementById("edit_res_guests").value = r.guests;
    document.getElementById("edit_res_request").value = r.request;
    document.getElementById("edit_res_status").value = r.status;

    editReservationModal.style.display = "flex";
}


document.getElementById("saveEditedReservation").onclick = () => {
    let id = document.getElementById("edit_res_id").value;
    let r = reservations.find(x => x.id == id);

    r.name = document.getElementById("edit_res_name").value;
    r.phone = document.getElementById("edit_res_phone").value;
    r.email = document.getElementById("edit_res_email").value;
    r.datetime = document.getElementById("edit_res_datetime").value;
    r.guests = document.getElementById("edit_res_guests").value;
    r.request = document.getElementById("edit_res_request").value;
    r.status = document.getElementById("edit_res_status").value;

    localStorage.setItem("reservations", JSON.stringify(reservations));
    updateReservationTables();
    editReservationModal.style.display = "none";
};


document.getElementById("searchReservation").addEventListener("keyup", function () {
    let value = this.value.toLowerCase();

    document.querySelectorAll("#reservationTable1 tr").forEach((row, i) => {
        let name = reservations[i].name.toLowerCase();
        let id = reservations[i].id.toLowerCase();

        if (name.includes(value) || id.includes(value)) {
            row.style.display = "";
            document.querySelectorAll("#reservationTable2 tr")[i].style.display = "";
        } else {
            row.style.display = "none";
            document.querySelectorAll("#reservationTable2 tr")[i].style.display = "none";
        }
    });
});


const editReservationModal = document.getElementById("editReservationModal");
const closeEditResModal = document.getElementById("closeEditResModal");

closeEditResModal.onclick = () => editReservationModal.style.display = "none";

window.addEventListener("click", e => {
    if (e.target === editReservationModal) {
        editReservationModal.style.display = "none";
    }
});
