document.querySelectorAll('.order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = '../menu/menu.html';
  });
});



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





// Navbar mobile menu button//
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navbarLinks = document.getElementById('navbar-links');

if (mobileMenuBtn && navbarLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');

    const icon = mobileMenuBtn.querySelector('i');
    if (navbarLinks.classList.contains('active')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }

    lucide.createIcons();
  });
}
