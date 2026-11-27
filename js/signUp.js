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

function showError(errorElement, message = "Something went wrong") {
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function hideError() {
  errorAlertUI.classList.add("hidden");
}

emailInput.addEventListener("input", () => hideError(loginAlertText));


signupForm.addEventListener("click" , (e) => {
e.preventDefault();
hideError()




})