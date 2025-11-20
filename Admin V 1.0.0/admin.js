
const addModal = document.getElementById("menuModal");
const openAddBtn = document.getElementById("openModal");
const closeAddBtn = document.getElementById("closeModal");

openAddBtn.onclick = () => addModal.style.display = "flex";
closeAddBtn.onclick = () => addModal.style.display = "none";

window.addEventListener("click", e => {
    if (e.target === addModal) addModal.style.display = "none";
});


const editModal = document.getElementById("editMenuModal");
const closeEditModal = document.getElementById("closeEditModal");

closeEditModal.onclick = () => editModal.style.display = "none";

window.addEventListener("click", e => {
    if (e.target === editModal) editModal.style.display = "none";
});

// new item add fucntion
const addItemBtn = document.getElementById("addItemBtn");

addItemBtn.addEventListener("click", () => {

   
    const id = document.getElementById("new_menu_id").value;
    const name = document.getElementById("new_menu_name").value;
    const category = document.getElementById("new_catagory").value;
    const description = document.getElementById("new_description").value;
    const ingredients = document.getElementById("new_ingredients").value;
    const time = document.getElementById("new_preparation_time").value;
    const price = document.getElementById("new_price").value;

   
    const table1 = document.getElementById("menuTable1");
    const row1 = document.createElement("tr");
    row1.setAttribute("data-item", id);

    row1.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${category}</td>
        <td>${description}</td>
    `;

    table1.appendChild(row1);

    
    const table2 = document.getElementById("menuTable2");
    const row2 = document.createElement("tr");
    row2.setAttribute("data-item", id);

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

            <button class="red-btn delete-btn" data-item="${id}">
                <i data-lucide="trash-2"></i>
            </button>
        </td>
    `;

    table2.appendChild(row2);

  
    lucide.createIcons();

    
    activateEditButtons();
    activateDeleteButtons();

    
    addModal.style.display = "none";

    
    document.querySelectorAll("#menuModal input").forEach(i => i.value = "");
});


//menu edit ar jonno
function activateEditButtons() {
    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(btn => {
        btn.onclick = () => {

            editModal.style.display = "flex";

          
            document.getElementById("edit_menu_id").value = btn.dataset.id;
            document.getElementById("edit_menu_name").value = btn.dataset.name;
            document.getElementById("edit_category").value = btn.dataset.category;
            document.getElementById("edit_description").value = btn.dataset.description;
            document.getElementById("edit_ingredients").value = btn.dataset.ingredients;
            document.getElementById("edit_price").value = btn.dataset.price;
            document.getElementById("edit_preparation_time").value = btn.dataset.time;
        };
    });
}



function activateDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.item;

            if (confirm("Delete this item?")) {
                document.querySelectorAll(`[data-item="${id}"]`).forEach(row => row.remove());
            }
        };
    });
}


activateEditButtons();
activateDeleteButtons();
const searchInput = document.getElementById("searchMenu");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const table1Rows = document.querySelectorAll("#menuTable1 tr");
    const table2Rows = document.querySelectorAll("#menuTable2 tr");

    table1Rows.forEach((row, index) => {
        const id = row.children[0].innerText.toLowerCase();
        const name = row.children[1].innerText.toLowerCase();

        if (id.includes(query) || name.includes(query)) {
            row.style.display = "";
            table2Rows[index].style.display = "";
        } else {
            row.style.display = "none";
            table2Rows[index].style.display = "none";
        }
    });
});


