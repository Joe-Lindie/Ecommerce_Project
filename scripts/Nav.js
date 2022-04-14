import "./Cart.js";
import { $ } from "./utils.js";

// DOM containers
const nav = $("nav");
const menuIcon = $(".nav__menu-icon");

// Event Listeners
window.addEventListener("resize", deactivateMenu);
menuIcon.addEventListener("click", toggleMenu);

function toggleMenu() {
  nav.classList.toggle("nav--active");
}

function deactivateMenu() {
  if (window.innerWidth <= 768) return;
  nav.classList.remove("nav--active");
}
