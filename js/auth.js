let tabLogin = document.querySelector(".js-tab-login");
let tabsignUp = document.querySelector(".js-tab-signup");
let loginForm = document.querySelector(".js-login-form");
let signUpForm = document.querySelector(".js-signup-form");
const signupSuccessUI = document.querySelector(".js-signup-success");


tabLogin.addEventListener("click", () => {
  signupSuccessUI.classList.add("hidden")
  tabLogin.classList.add(...activeClasses);
  tabsignUp.classList.remove(...activeClasses);
  loginForm.classList.remove("hidden")
  signUpForm.classList.add("hidden")
})

// border-secondary
tabsignUp.addEventListener("click", () => {
  signupSuccessUI.classList.add("hidden")
  tabsignUp.classList.add(...activeClasses);
  tabLogin.classList.remove(...activeClasses);
  loginForm.classList.add("hidden")
  signUpForm.classList.remove("hidden")
})

