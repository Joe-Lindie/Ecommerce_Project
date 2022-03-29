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
}

function displayColorName(colorName) {
  const colorNameEl = document.querySelector(".product__color-name");
  colorNameEl.innerText = colorName;
}

function updateCarousel(media) {
  clearCarousel();
  media.forEach(displayImg);
}

function clearCarousel() {
  const carouselEl = document.querySelector(".product__carousel");
  carouselEl.innerHTML = "";
}

function displayImg(imgSrc) {
  const carouselEl = document.querySelector(".product__carousel");
  const newImgEl = document.createElement("img");
  newImgEl.classList.add(".product__image");
  newImgEl.src = imgSrc;
  carouselEl.append(newImgEl);
}

// Collapsibles
const chevron = document.querySelector(".collapsible__chevron");
chevron.addEventListener("click", rotateCheveron);

function rotateCheveron({ currentTarget }) {
  currentTarget.classList.toggle("collapsible__chevron--rotate");
}
