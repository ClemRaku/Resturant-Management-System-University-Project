// Select elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navbarLinks = document.getElementById('navbar-links');

// Toggle mobile menu on button click
if (mobileMenuBtn && navbarLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navbarLinks.classList.toggle('active'); // toggle visibility

    // Change menu icon
    const icon = mobileMenuBtn.querySelector('i');
    if (navbarLinks.classList.contains('active')) {
      icon.setAttribute('data-lucide', 'x'); // close icon
    } else {
      icon.setAttribute('data-lucide', 'menu'); // menu icon
    }

    // Re-render icons
    lucide.createIcons();
  });
}

// Close menu when a navbar link is clicked (mobile only)
document.querySelectorAll('#navbar-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navbarLinks.classList.contains('active')) {
      navbarLinks.classList.remove('active'); // hide menu

      // Reset menu icon
      const icon = mobileMenuBtn.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    }
  });
});
