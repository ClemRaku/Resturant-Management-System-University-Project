document.addEventListener("DOMContentLoaded", function () {

    // Load saved images
    document.querySelectorAll(".preview").forEach(preview => {
        const id = preview.dataset.id;
        const savedImage = localStorage.getItem("home_image_" + id);
        if (savedImage) {
            preview.src = savedImage;
            preview.style.display = "block";
        }
    });

    // Handle new uploads
    document.querySelectorAll(".imageInput").forEach(input => {
        input.addEventListener("change", function () {
            const id = this.dataset.id;
            const file = this.files[0];
            if (!file) return;

            const preview = document.querySelector('.preview[data-id="' + id + '"]');

            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = "block";

                // Save image in localStorage
                localStorage.setItem("home_image_" + id, e.target.result);
            };
            reader.readAsDataURL(file);
        });
    });

});

