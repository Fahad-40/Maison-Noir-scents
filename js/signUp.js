const signupForm = document.querySelector(".js-signup-form");
const errorAlertUI = signupForm.querySelector(".js-login-alert");
const errorAlertText = signupForm.querySelector(".js-login-alert-text");
const FirstNameInput = document.querySelector(".js-signup-firstname");
const lastNameInput = document.querySelector(".js-signup-lastname");
const emailInput = document.querySelector(".js-signup-email");
const passwordInput = document.querySelector(".js-signup-password");

emailInput.addEventListener("input", () => hideError(errorAlertUI));
lastNameInput.addEventListener("input", () => hideError(errorAlertUI));
FirstNameInput.addEventListener("input", () => hideError(errorAlertUI));
passwordInput.addEventListener("input", () => hideError(errorAlertUI));

function showError(message) {
  errorAlertUI.textContent = message;
  errorAlertUI.classList.remove("hidden");
}

function hideError() {
  errorAlertUI.classList.add("hidden");
}

emailInput.addEventListener("input", () => hideError());


signupForm.addEventListener("submit" , (e) => {
    console.log("sign up form clicked!")
e.preventDefault();
hideError()
if (FirstNameInput === "") {
    showError("Please enter your name")
}

if (emailInput === "") {
    showError("Please enter valid email")
}
if (!lastNameInput) {
    showError("Please enter your name")
}
if (!emailInput) {
    showError("Please enter password")
}


})