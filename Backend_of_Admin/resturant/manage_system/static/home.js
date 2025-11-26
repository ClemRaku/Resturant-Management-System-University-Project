if (!document.getElementById('customer-menu')) {
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = '../menu/menu.html';
    });
  });
}



document.addEventListener("DOMContentLoaded", function () {

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

    // Load saved images from localStorage
    document.querySelectorAll('.preview').forEach(img => {
        const id = img.dataset.id;
        const saved = localStorage.getItem("home_image_" + id);

        if (id === '1') {
            // do not load saved for this id
        } else {
            if (saved) {
                img.src = saved;
                img.style.display = "block";
            }
        }
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
