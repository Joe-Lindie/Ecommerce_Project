import { $ } from "../utils.js";
import { updateButtons, updateMedia } from "./Carousel.js";
import { currentProductDetails } from "./Product.js";
import products from "../../data/products.js";

const currentProductId = document.querySelector("body").id;
const currentProductObj = products.find(
  ({ productId }) => productId === currentProductId
);

(function createColorIcons() {
  const colorWrapper = $(".color-wrapper");
  const colorTemplate = $(".color-template");
  currentProductObj.colors.forEach(({ colorId, colorsHexValues }) => {
    const newColor = colorTemplate.content.cloneNode(true);
    const newColorDiv = $(".color", newColor);
    const newColorIconDiv = $(".color__icon", newColor);
    const newColorIconTop = $(".color__icon--top", newColor);
    const newColorIconBottom = $(".color__icon--bottom", newColor);

    newColorDiv.id = colorId;
    newColorIconTop.style = `background-color:${colorsHexValues.top}`;
    newColorIconBottom.style = `background-color:${colorsHexValues.bottom}`;
    newColorIconDiv.append(newColorIconTop, newColorIconBottom);
    colorWrapper.append(newColor);
  });
})();
const colorNodeList = document.querySelectorAll(".color");
let currentColor;
window.addEventListener("resize", selectFirstColor);
colorNodeList.forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
selectFirstColor();

function selectFirstColor() {
  const mockEvent = {
    currentTarget: { id: currentColor || colorNodeList[0].id },
  };
  handleColorClick(mockEvent);
}

function handleColorClick({ currentTarget }) {
  currentColor = currentTarget.id;
  const { colorName, media } = currentProductObj.colors.find(
    ({ colorId }) => colorId === currentColor
  );
  displayColorName(colorName);
  updateMedia(media);
  updateButtons();
  highlightIcon(currentColor);
  currentProductDetails.color = {
    name: colorName,
    id: currentColor,
    img: media[0],
  };
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
