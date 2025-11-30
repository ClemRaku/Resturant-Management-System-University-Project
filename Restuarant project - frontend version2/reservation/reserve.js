const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById('date').min = tomorrow.toISOString().split('T')[0];

// Reservation form submit
document.getElementById('reservation-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = getCurrentUser();
  if (!user) {
    showToast('Please sign in to make a reservation', 'error');
    setTimeout(() => window.location.href = 'auth.html', 1000);
    return;
  }

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Reserving...';

  const reservation = {
    userId: user.id,
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    guests: parseInt(document.getElementById('guests').value),
    specialRequests: document.getElementById('requests').value.trim()
  };

  // Validation
  if (reservation.name.length > 100) {
    showToast('Name must be less than 100 characters', 'error');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Reserve Table';
    return;
  }

  if (reservation.email.length > 255) {
    showToast('Email must be less than 255 characters', 'error');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Reserve Table';
    return;
  }

  if (reservation.specialRequests.length > 1000) {
    showToast('Special requests must be less than 1000 characters', 'error');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Reserve Table';
    return;
  }

  try {
    addReservation(reservation);
    showToast('Reservation confirmed! We look forward to serving you.');
    setTimeout(() => window.location.href = 'profile.html', 1500);
  } catch (error) {
    showToast('Failed to create reservation. Please try again.', 'error');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Reserve Table';
  }
});

// Mobile navbar toggle
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
