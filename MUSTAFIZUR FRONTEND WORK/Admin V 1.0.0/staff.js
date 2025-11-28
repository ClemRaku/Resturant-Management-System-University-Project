
const staffModal = document.getElementById("staffModal");
const openStaffBtn = document.getElementById("openStaffModal");
const closeStaffBtn = document.getElementById("closeStaffModal");

const editStaffModal = document.getElementById("editStaffModal");
const closeEditStaffBtn = document.getElementById("closeEditStaffModal");


const staffTable1 = document.getElementById("staffTable1");
const staffTable2 = document.getElementById("staffTable2");


openStaffBtn.onclick = (e) => {
    e.preventDefault();
    staffModal.style.display = "flex";
};
closeStaffBtn.onclick = () => staffModal.style.display = "none";
closeEditStaffBtn.onclick = () => editStaffModal.style.display = "none";

window.addEventListener("click", (e) => {
    if (e.target === staffModal) staffModal.style.display = "none";
    if (e.target === editStaffModal) editStaffModal.style.display = "none";
});


const addStaffBtn = document.getElementById("addStaffBtn");

addStaffBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.getElementById("new_staff_id").value;
    const name = document.getElementById("new_staff_name").value;
    const tenure = document.getElementById("new_staff_tenure").value;
    const address = document.getElementById("new_staff_address").value;
    const role = document.getElementById("new_staff_role").value;
    const date = document.getElementById("new_staff_date").value;
    const email = document.getElementById("new_staff_email").value;
    const phone = document.getElementById("new_staff_phone").value;
    const status = "active";

    if (!id || !name) {
        alert("Employee ID and Name are required!");
        return;
    }

    
    const row1 = document.createElement("tr");
    row1.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${tenure}</td>
        <td>${address}</td>
    `;
    staffTable1.appendChild(row1);

    
    const row2 = document.createElement("tr");
    row2.innerHTML = `
        <td>${role}</td>
        <td>${date}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${status}</td>
        <td>
            <button class="edit-btn"
                data-id="${id}"
                data-name="${name}"
                data-tenure="${tenure}"
                data-address="${address}"
                data-role="${role}"
                data-date="${date}"
                data-email="${email}"
                data-phone="${phone}"
                data-status="${status}">
                <i data-lucide="pencil"></i>
            </button>
            <button class="delete-btn">
                <i data-lucide="trash"></i>
            </button>
        </td>
    `;
    staffTable2.appendChild(row2);

    lucide.createIcons();
    activateStaffButtons();

    
    staffModal.style.display = "none";
    document.querySelectorAll("#staffModal input").forEach(input => input.value = "");
});


function activateStaffButtons() {
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    editButtons.forEach(btn => {
        btn.onclick = () => {
            editStaffModal.style.display = "flex";
            document.getElementById("edit_staff_id").value = btn.dataset.id;
            document.getElementById("edit_staff_name").value = btn.dataset.name;
            document.getElementById("edit_staff_tenure").value = btn.dataset.tenure;
            document.getElementById("edit_staff_address").value = btn.dataset.address;
            document.getElementById("edit_staff_role").value = btn.dataset.role;
            document.getElementById("edit_staff_date").value = btn.dataset.date;
            document.getElementById("edit_staff_email").value = btn.dataset.email;
            document.getElementById("edit_staff_phone").value = btn.dataset.phone;
            document.getElementById("edit_staff_status").value = btn.dataset.status;
        };
    });

    deleteButtons.forEach(btn => {
        btn.onclick = () => {
            const row = btn.closest("tr");
            const index = Array.from(staffTable2.children).indexOf(row);
            if (confirm("Are you sure you want to delete this staff?")) {
                row.remove();
                staffTable1.children[index].remove();
            }
        };
    });
}


activateStaffButtons();


const saveStaffEditBtn = document.getElementById("saveStaffEdit");
saveStaffEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.getElementById("edit_staff_id").value;
    const name = document.getElementById("edit_staff_name").value;
    const tenure = document.getElementById("edit_staff_tenure").value;
    const address = document.getElementById("edit_staff_address").value;
    const role = document.getElementById("edit_staff_role").value;
    const date = document.getElementById("edit_staff_date").value;
    const email = document.getElementById("edit_staff_email").value;
    const phone = document.getElementById("edit_staff_phone").value;
    const status = document.getElementById("edit_staff_status").value;

    const rows2 = staffTable2.querySelectorAll("tr");
    rows2.forEach((row, index) => {
        const editBtn = row.querySelector(".edit-btn");
        if (editBtn.dataset.id === id) {
            
            const row1 = staffTable1.children[index];
            row1.children[0].innerText = id;
            row1.children[1].innerText = name;
            row1.children[2].innerText = tenure;
            row1.children[3].innerText = address;

           
            row.children[0].innerText = role;
            row.children[1].innerText = date;
            row.children[2].innerText = email;
            row.children[3].innerText = phone;
            row.children[4].innerText = status;

            
            editBtn.dataset.id = id;
            editBtn.dataset.name = name;
            editBtn.dataset.tenure = tenure;
            editBtn.dataset.address = address;
            editBtn.dataset.role = role;
            editBtn.dataset.date = date;
            editBtn.dataset.email = email;
            editBtn.dataset.phone = phone;
            editBtn.dataset.status = status;
        }
    });

    lucide.createIcons();
    editStaffModal.style.display = "none";
});


const staffSearchInput = document.getElementById("staffSearch");
staffSearchInput.addEventListener("input", () => {
    const query = staffSearchInput.value.toLowerCase();

    const rows1 = staffTable1.querySelectorAll("tr");
    const rows2 = staffTable2.querySelectorAll("tr");

    rows1.forEach((row1, index) => {
        const id = row1.children[0].innerText.toLowerCase();
        const name = row1.children[1].innerText.toLowerCase();
        const match = id.includes(query) || name.includes(query);

        row1.style.display = match ? "" : "none";
        rows2[index].style.display = match ? "" : "none";
    });
});
