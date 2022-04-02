import "./Nav.js";
import { updateButtons, updateCarousel } from "./Carousel.js";
import products from "../data/products.js";

// Current product info
const currentProductId = document.querySelector("body").id;
const currentProductObj = products.find(
  ({ productName }) => productName === currentProductId
);

// On Load
window.addEventListener("load", selectFirstColor);

function selectFirstColor() {
  const mockEvent = { currentTarget: { id: colorNodeList[0].id } };
  handleColorClick(mockEvent);
}

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

// Size
const sizeNodeList = document.querySelectorAll(".size");
sizeNodeList.forEach((size) => size.addEventListener("click", selectSize));

function selectSize({ currentTarget }) {
  sizeNodeList.forEach((size) => size.classList.remove("size--active"));
  currentTarget.classList.add("size--active");
}

// Collapsibles
const collapsibleItemNodeList = document.querySelectorAll(".collapsible__item");
collapsibleItemNodeList.forEach((item) =>
  item.addEventListener("click", expandCollapsible)
);
function expandCollapsible({ currentTarget }) {
  if ([...currentTarget.classList].includes("collapsible__item--active")) {
    return currentTarget.classList.remove("collapsible__item--active");
  }

  collapsibleItemNodeList.forEach((item) =>
    item.classList.remove("collapsible__item--active")
  );

  currentTarget.classList.add("collapsible__item--active");
}

// Reviews
const reviewRatingEl = document.querySelector("#reviews__numbered-rating");
const reviewCountEl = document.querySelector("#reviews__count");
const averageReviewRating = (
  currentProductObj.reviews.reduce((sum, { rating }) => sum + rating, 0) /
  currentProductObj.reviews.length
).toFixed(1);

reviewRatingEl.innerText = averageReviewRating;
reviewCountEl.innerText = `${currentProductObj.reviews.length} Reviews`;
