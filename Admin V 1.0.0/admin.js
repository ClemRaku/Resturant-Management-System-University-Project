

//for add new item
const modal = document.getElementById("menuModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

openBtn.onclick = () => modal.style.display = "flex";
closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};


//for edit item
const editModal = document.getElementById("editMenuModal");
    const closeEditModal = document.getElementById("closeEditModal");

   
    document.querySelectorAll(".edit-btn").forEach(edit => {
        edit.addEventListener("click", function () {
            editModal.style.display = "flex";

            document.getElementById("edit_id").value = this.dataset.id;
            document.getElementById("edit_name").value = this.dataset.name;
            document.getElementById("edit_category").value = this.dataset.category;
            document.getElementById("edit_description").value = this.dataset.description;
            document.getElementById("edit_ingredients").value = this.dataset.ingredients;
            document.getElementById("edit_price").value = this.dataset.price;
            document.getElementById("edit_time").value = this.dataset.time;
        });
    });

   
    closeEditModal.addEventListener("click", () => (editModal.style.display = "none"));


    window.addEventListener("click", (e) => {
        if (e.target === editModal) editModal.style.display = "none";
    });

    document.getElementById("saveEdit").addEventListener("click", () => {
        alert("Menu Item Updated Successfully!");
        editModal.style.display = "none";
    });


    //for delete item

    document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {

        const confirmDelete = confirm("Are you sure you want to delete this item?");
        
        if (confirmDelete) {
            this.closest("tr").remove();
        }
    });
});