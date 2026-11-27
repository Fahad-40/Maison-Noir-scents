const errorAlertUI = document.querySelector(".js-login-alert-text");
const signupForm = document.querySelector(".js-signup-form");
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

emailInput.addEventListener("input", () => hideError(loginAlertText));


signupForm.addEventListener("submit" , (e) => {
e.preventDefault();
hideError()

if (!emailInput) {
    showError("Please enter valid email")
}
if (!FirstNameInput) {
    showError("Please enter your name")
}
if (!lastNameInput) {
    showError("Please enter your name")
}
if (!emailInput) {
    showError("Please enter password")
}


})