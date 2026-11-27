const loginAlertText = document.querySelector(".js-login-alert-text");

function showError(errorElement, message = "Something went wrong") {
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function hideError(errorElement) {
  errorElement.classList.add("hidden");
  errorElement.textContent = "";
}

