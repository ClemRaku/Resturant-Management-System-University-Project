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

