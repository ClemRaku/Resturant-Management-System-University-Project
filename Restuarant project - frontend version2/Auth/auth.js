// Tabs code
const tabSignIn = document.getElementById('tab-signin');
const tabSignUp = document.getElementById('tab-signup');
const signinContent = document.getElementById('signin-content');
const signupContent = document.getElementById('signup-content');

function showSignIn() {
    tabSignIn.classList.add('active');
    tabSignUp.classList.remove('active');
    signinContent.classList.add('active');
    signupContent.classList.remove('active');
}

function showSignUp() {
    tabSignUp.classList.add('active');
    tabSignIn.classList.remove('active');
    signupContent.classList.add('active');
    signinContent.classList.remove('active');
}

tabSignIn.addEventListener('click', showSignIn);
tabSignUp.addEventListener('click', showSignUp);
showSignIn();

// Toast function
function showToast(message, type = "success"){
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer){
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }
    const toast = document.createElement("div");
    toast.className =`toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(()=> toast.classList.add("show"),100);
    setTimeout(()=>{
        toast.classList.remove("show");
        setTimeout(()=> toast.remove(),300);
    }, 3000);
}

// Navbar mobile menu button
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

// ------------------------
// Redirect to home after Sign In / Sign Up
// ------------------------
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

signinForm.addEventListener('submit', function(e){
    e.preventDefault();  // stop default reload
    showToast("Signed In Successfully", "success");
    
    // Redirect after short delay so toast is visible
    setTimeout(()=> {
        window.location.href = "../home/home.html";  // <-- adjust path to your home page
    }, 1000);
});

signupForm.addEventListener('submit', function(e){
    e.preventDefault();  // stop default reload
    showToast("Signed Up Successfully", "success");

    // Redirect after short delay so toast is visible
    setTimeout(()=> {
        window.location.href = "../home/home.html";  // <-- adjust path to your home page
    }, 1000);
});
