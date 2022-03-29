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
}

function displayColorName(selectedColorName) {
  const colorNameEl = document.querySelector(".product__color-name");
  colorNameEl.innerText = selectedColorName;
}

// Collapsibles
const chevron = document.querySelector(".collapsible__chevron");
chevron.addEventListener("click", rotateCheveron);

function rotateCheveron({ currentTarget }) {
  currentTarget.classList.toggle("collapsible__chevron--rotate");
}
