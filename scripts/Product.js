import "./Nav.js";
import { updateButtons, updateCarousel } from "./Carousel.js";
import products from "../data/products.js";

// Shared
const currentProductId = document.querySelector("body").id;
const currentProductObj = products.find(
  ({ productName }) => productName === currentProductId
);

// Colors
const colorNodeList = document.querySelectorAll(".color");
colorNodeList.forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

function handleColorClick({ currentTarget }) {
  const { colorName, media } = currentProductObj.colors.find(
    ({ colorId }) => colorId === currentTarget.id
  );
  displayColorName(colorName);
  updateCarousel(media);
  updateButtons();
  highlightIcon(currentTarget.id);
}

function displayColorName(colorName) {
  const colorNameEl = document.querySelector(".product__color-name");
  colorNameEl.innerText = colorName;
}

function highlightIcon(selectedColor) {
  const selectedColorIcon = document.querySelector(`#${selectedColor}`);
  colorNodeList.forEach((color) => color.classList.remove("color--active"));
  selectedColorIcon.classList.add("color--active");
}

// Collapsibles
const chevron = document.querySelector(".collapsible__chevron");
chevron.addEventListener("click", rotateCheveron);

function rotateCheveron({ currentTarget }) {
  currentTarget.classList.toggle("collapsible__chevron--rotate");
}

// On Load
window.addEventListener("load", selectFirstColor);

function selectFirstColor() {
  const mockEvent = { currentTarget: { id: colorNodeList[0].id } };
  handleColorClick(mockEvent);
}
