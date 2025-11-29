
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

function activateEditButtons() {
    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(btn => {
        btn.onclick = () => {

            const row = btn.closest("tr");       
            const cells = row.querySelectorAll("td"); 

            editModal.style.display = "flex";

            
            document.getElementById("edit_menu_id").value = cells[0].innerText;     
            document.getElementById("edit_menu_name").value = cells[1].innerText;   
            document.getElementById("edit_category").value = cells[2].innerText;    
            document.getElementById("edit_description").value = cells[3].innerText;  
            document.getElementById("edit_ingredients").value = cells[4].innerText; 
            document.getElementById("edit_preparation_time").value = cells[5].innerText; 
            document.getElementById("edit_price").value = cells[6].innerText.replace("Tk","").trim(); 
        };
    });
}

function activateDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(btn => {
        btn.onclick = () => {
            const row = btn.closest("tr");       
            if (confirm("Delete this item?")) {
                row.remove();                   
            }
        };
    });
}


activateEditButtons();
activateDeleteButtons();
