const signUpButton = document.querySelector("#sign-up");
const menuIcon = document.querySelector("#menu-icon");

signUpButton.addEventListener("click", showModal);
document.addEventListener("click", hideModal);
menuIcon.addEventListener("click", toggleMenu);

function showModal() {
  document.querySelector("body").className = "modal-on";
}

function hideModal(event) {
  const classList = event.target.classList;
  if (classList.contains("close") || classList.contains("modal-on")) {
    document.querySelector("body").className = "";
  }
}

function toggleMenu(event) {
  document.body.classList.toggle("slide-on");
}
