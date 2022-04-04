import { $, $$, nodeListAddEventListeners } from "../utils.js";

const addToCartButton = $(".product__button");
const sizeNodeList = $$(".size");
nodeListAddEventListeners(sizeNodeList, "click", selectSize);

function selectSize({ currentTarget }) {
  removeSizeStyling();
  currentTarget.classList.add("size--active");
  activateButton();
}

function removeSizeStyling() {
  sizeNodeList.forEach((size) => size.classList.remove("size--active"));
}

function activateButton() {
  const productPrice = $(".product__price").innerText;
  addToCartButton.classList.remove("btn--inactive");
  addToCartButton.classList.add("btn--active");
  addToCartButton.innerText = `add to cart - ${productPrice}`;
}
