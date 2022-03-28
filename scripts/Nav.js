// DOM containers
const nav = document.querySelector("nav");
const menuIcon = document.querySelector(".nav__menu-icon");

// Event Listeners
menuIcon.addEventListener("click", toggleMenu);

function toggleMenu() {
  nav.classList.toggle("nav--active");
}
