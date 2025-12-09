

const staffModal = document.getElementById("staffModal");
const openStaffBtn = document.getElementById("openStaffModal");
const closeStaffBtn = document.getElementById("closeStaffModal");

const editStaffModal = document.getElementById("editStaffModal");
const closeEditStaffBtn = document.getElementById("closeEditStaffModal");

openStaffBtn.onclick = () => {

    staffModal.style.display = "flex";
};

closeStaffBtn.onclick = () => staffModal.style.display = "none";
closeEditStaffBtn.onclick = () => editStaffModal.style.display = "none";

window.addEventListener("click", (e) => {
    if (e.target === staffModal) staffModal.style.display = "none";
    if (e.target === editStaffModal) editStaffModal.style.display = "none";
});


const staffTable = document.getElementById("staff");

const addStaffBtn = document.getElementById("addStaffBtn");

addStaffBtn.addEventListener("click", () => {

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

    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="id">${id}</td>
        <td class="name">${name}</td>
        <td>${tenure}</td>
        <td>${address}</td>
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

    staffTable.appendChild(row);

    lucide.createIcons();
    activateButtons();

    staffModal.style.display = "none";
    document.querySelectorAll("#staffModal input").forEach(i => i.value = "");
});

function activateButtons() {
    const editBtns = document.querySelectorAll(".edit-btn");
    const deleteBtns = document.querySelectorAll(".delete-btn");

    editBtns.forEach(btn => {
        btn.onclick = () => {
            editStaffModal.style.display = "flex";

            document.getElementById("edit_staff_id").value = btn.dataset.id;
            document.getElementById("edit_staff_name").value = btn.dataset.name;
            document.getElementById("edit_staff_tenure").value = btn.dataset.tenure;
            document.getElementById("edit_staff_address").value = btn.dataset.address;
            document.getElementById("edit_staff_role").value = btn.dataset.role;
            document.getElementById("edit_staff_date").value = btn.dataset.date;
            document.getElementById("edit_staff_phone").value = btn.dataset.phone;
            document.getElementById("edit_staff_status").value = btn.dataset.status;

            
            editStaffModal.dataset.rowId = btn.dataset.id;
        };
    });

    
}

activateButtons();

const saveStaffEditBtn = document.getElementById("saveStaffEdit");

saveStaffEditBtn.addEventListener("click", () => {
    

    const id = document.getElementById("edit_staff_id").value;
    const name = document.getElementById("edit_staff_name").value;
    const tenure = document.getElementById("edit_staff_tenure").value;
    const address = document.getElementById("edit_staff_address").value;
    const role = document.getElementById("edit_staff_role").value;
    const date = document.getElementById("edit_staff_date").value;
    const phone = document.getElementById("edit_staff_phone").value;
    const status = document.getElementById("edit_staff_status").value;

    const allRows = staffTable.querySelectorAll("tr");

    allRows.forEach(row => {
        const rowId = row.querySelector(".id").innerText;

        if (rowId === id) {

            row.children[1].innerText = name;
            row.children[2].innerText = tenure;
            row.children[3].innerText = address;
            row.children[4].innerText = role;
            row.children[5].innerText = date;
            row.children[7].innerText = phone;
            row.children[8].innerText = status;

            const editBtn = row.querySelector(".edit-btn");
            editBtn.dataset.name = name;
            editBtn.dataset.tenure = tenure;
            editBtn.dataset.address = address;
            editBtn.dataset.role = role;
            editBtn.dataset.date = date;
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

    const rows = staffTable.querySelectorAll("tr");

    rows.forEach(row => {
        const id = row.children[0].innerText.toLowerCase();
        const name = row.children[1].innerText.toLowerCase();

        const match = id.includes(query) || name.includes(query);

        row.style.display = match ? "" : "none";
    });
});
