
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

document.querySelectorAll('#navbar-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navbarLinks.classList.contains('active')) {
      navbarLinks.classList.remove('active'); 

      const icon = mobileMenuBtn.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    }
  });
});