import colors from "../../data/colors.js";
import { updateButtons, updateCarousel } from "./Carousel.js";
import { currentProductDetails } from "./Product.js";

const colorNodeList = document.querySelectorAll(".color");
const currentProductId = document.querySelector("body").id;
const currentProductColorObj = colors.find(
  ({ productName }) => productName === currentProductId
);

colorNodeList.forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

selectFirstColor();

function selectFirstColor() {
  const mockEvent = { currentTarget: { id: colorNodeList[0].id } };
  handleColorClick(mockEvent);
}

function handleColorClick({ currentTarget }) {
  const { colorName, media } = currentProductColorObj.colors.find(
    ({ colorId }) => colorId === currentTarget.id
  );
  displayColorName(colorName);
  updateCarousel(media);
  updateButtons();
  highlightIcon(currentTarget.id);
  currentProductDetails.color = { name: colorName, id: currentTarget.id };
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
