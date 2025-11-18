
// new item add korar jonno

const addModal = document.getElementById("menuModal");
const openAddBtn = document.getElementById("openModal");
const closeAddBtn = document.getElementById("closeModal");

openAddBtn.onclick = () => addModal.style.display = "flex";
closeAddBtn.onclick = () => addModal.style.display = "none";

window.addEventListener("click", e => {
    if (e.target === addModal) addModal.style.display = "none";
});


// item edit korar jonno

const editModal = document.getElementById("editMenuModal");
const closeEditModal = document.getElementById("closeEditModal");

closeEditModal.onclick = () => editModal.style.display = "none";

window.addEventListener("click", e => {
    if (e.target === editModal) editModal.style.display = "none";
});


// new item add function

const addItemBtn = document.getElementById("addItemBtn");

addItemBtn.addEventListener("click", () => {

    // collect input values
    const id = document.getElementById("add_id").value;
    const name = document.getElementById("add_name").value;
    const category = document.getElementById("add_category").value;
    const description = document.getElementById("add_description").value;
    const ingredients = document.getElementById("add_ingredients").value;
    const time = document.getElementById("add_time").value;
    const price = document.getElementById("add_price").value;

    // insert input into Table 1
    const table1 = document.getElementById("menuTable1");
    const row1 = document.createElement("tr");

    row1.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${category}</td>
        <td>${description}</td>
    `;

    table1.appendChild(row1);

    // insert input into Table 2
    const table2 = document.getElementById("menuTable2");
    const row2 = document.createElement("tr");

    row2.innerHTML = `
        <td>${ingredients}</td>
        <td>${time}</td>
        <td>${price}</td>
        <td>
            <select class="item_status">
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
            </select>
        </td>
        <td>
            <button class="btn">
                <i data-lucide="pencil" class="edit-btn"
                    data-id="${id}"
                    data-name="${name}"
                    data-category="${category}"
                    data-description="${description}"
                    data-ingredients="${ingredients}"
                    data-time="${time}"
                    data-price="${price}">
                </i>
            </button>
            <button class="red-btn">
                <i data-lucide="trash-2" class="delete"></i>
            </button>
        </td>
    `;

    table2.appendChild(row2);

   
    lucide.createIcons();

    
    activateEditButtons();

    
    addModal.style.display = "none";

   
    document.querySelectorAll("#menuModal input").forEach(input => input.value = "");
});


function activateEditButtons() {
    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(btn => {
        btn.onclick = () => {
            editModal.style.display = "flex";

            document.getElementById("edit_id").value = btn.dataset.id;
            document.getElementById("edit_name").value = btn.dataset.name;
            document.getElementById("edit_category").value = btn.dataset.category;
            document.getElementById("edit_description").value = btn.dataset.description;
            document.getElementById("edit_ingredients").value = btn.dataset.ingredients;
            document.getElementById("edit_price").value = btn.dataset.price;
            document.getElementById("edit_time").value = btn.dataset.time;
        };
    });
}

activateEditButtons();
