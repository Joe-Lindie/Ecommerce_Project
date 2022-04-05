import colors from "../../data/colors.js";
import { updateButtons, updateMedia } from "./Carousel.js";
import { currentProductDetails } from "./Product.js";

const currentProductId = document.querySelector("body").id;
const currentProductColorObj = colors.find(
  ({ productName }) => productName === currentProductId
);
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
  const { colorName, media } = currentProductColorObj.colors.find(
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
