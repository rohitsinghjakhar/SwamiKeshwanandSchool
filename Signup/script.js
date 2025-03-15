document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById("signUpButton");
    const signInButton = document.getElementById("signInButton");

    // it will redirect to the signup page when clicking "Don't have an account yet"
    if (signUpButton) {
        signUpButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    // it will redirect to the login page when clicking "Already have an account"
    if (signInButton) {
        signInButton.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
});
