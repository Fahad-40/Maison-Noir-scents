
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function saveCurrentUser() {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

export function getCurrentUser() {
  return currentUser;
}

export function signUp(fName, lName, email, password) {

  let cleanEmail = email.trim().toLowerCase();
  let emailExists = users.find(user => user.email === cleanEmail);

  if (emailExists) {
    return { success: false, message: "Email already registered" };
  }

  let newUser = {
    id: Date.now().toString(),
    firstName: fName.trim(),
    lastName: lName.trim(),
    email: cleanEmail,
    password: password
  }

  users.push(newUser);
  saveUsers();
  return { success: true }
}


export function logIn(email, password) {

  let cleanEmail = email.trim().toLowerCase();
  let user = users.find(user => user.email === cleanEmail && user.password === password);

  if (user) {
    currentUser = user;
    saveCurrentUser();
    return { success: true }
  }
  else {
    return { success: false, message: "Invalid email or password" }
  }

}

export function logOut() {
  currentUser = null;
  saveCurrentUser();
}

const activeClasses = ["border-b-2", "border-secondary"];


