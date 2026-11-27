const signupForm = document.querySelector(".js-signup-form");
const errorAlertUI = signupForm.querySelector(".js-login-alert");
const errorAlertText = signupForm.querySelector(".js-login-alert-text");
const firstNameInput = document.querySelector(".js-signup-firstname");
const lastNameInput = document.querySelector(".js-signup-lastname");
const emailInput = document.querySelector(".js-signup-email");
const passwordInput = document.querySelector(".js-signup-password");

emailInput.addEventListener("input", () => hideError(errorAlertUI));
lastNameInput.addEventListener("input", () => hideError(errorAlertUI));
firstNameInput.addEventListener("input", () => hideError(errorAlertUI));
passwordInput.addEventListener("input", () => hideError(errorAlertUI));

function showError(message) {
    errorAlertText.textContent = message;
    errorAlertUI.classList.remove("hidden");
}

function hideError() {
    errorAlertUI.classList.add("hidden");
}

errorAlertUI.classList.add("hidden");

signupForm.addEventListener("submit", (e) => {
    console.log("sign up form clicked!")
    e.preventDefault();

const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

    hideError()
   if (!firstName) {
    showError("Please enter your first name.");
    return;
  }
  if (!lastName) {
    showError("Please enter your last name.");
    return;
  }
  if (!email || !email.includes("@")) {
    showError("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    showError("Password must be at least 6 characters long.");
    return;
  }

})