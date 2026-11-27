import { logIn } from "./auth.js";
const loginEmailInput = document.querySelector(".js-login-email");
const loginPasswordInput = document.querySelector(".js-login-password");
const togglePasswordBtn = document.querySelector(".js-toggle-password");
const loginSubmitBtn = document.querySelector(".js-login-submit");

const errorAlertUI = signupForm.querySelector(".js-login-alert");
const errorAlertText = signupForm.querySelector(".js-login-alert-text");

const loginForm = document.querySelector(".js-login-form");

function showError(message) {
    errorAlertText.textContent = message;
    errorAlertUI.classList.remove("hidden");
}

function hideError() {
    errorAlertUI.classList.add("hidden");
}

errorAlertUI.classList.add("hidden");

loginForm.addEventListener("submit", (e) => {

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();


let result = logIn(email , password)

if (!result.success) {
    showError(result.message);
}

loginForm.reset();
})
