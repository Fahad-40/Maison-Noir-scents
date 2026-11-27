const errorAlertUI = document.querySelector(".js-login-alert-text");
emailInput.addEventListener("input", () => hideError(loginAlertText));


function showError(errorElement, message = "Something went wrong") {
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function hideError(errorElement) {
  errorElement.classList.add("hidden");
  errorElement.textContent = "";
}

