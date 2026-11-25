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


export function signUp(name , email , password) {
    
let cleanEmail = email.trim().toLowerCase();
let emailExists =  users.find(user => user.email === )

}
