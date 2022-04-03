import { clearElement } from "../utils.js";

const carousel = document.querySelector(".carousel");

let previousX = 0;
let currentImgIndex = 0;
let isMouseDown = false;
let hasImgChanged = false;

window.addEventListener("resize", offsetImgWrapper);
carousel.addEventListener("mousedown", handleMouseDown);
carousel.addEventListener("mousemove", handleMouseMove);
carousel.addEventListener("mouseup", handleMouseUp);

function handleMouseDown({ clientX }) {
  previousX = clientX;
  isMouseDown = true;
}

function handleMouseMove({ clientX }) {
  if (!isMouseDown || hasImgChanged) return;
  clientX - previousX < 0
    ? updateCurrentImgIndex(1)
    : updateCurrentImgIndex(-1);
  updateButtons();
  offsetImgWrapper();
  hasImgChanged = true;
}

function handleMouseUp() {
  isMouseDown = false;
  hasImgChanged = false;
}

function updateCurrentImgIndex(addOrSubtract) {
  const imagesNodeList = document.querySelectorAll(".carousel__image");
  if (addOrSubtract < 0 && currentImgIndex - 1 < 0) return;
  if (addOrSubtract > 0 && currentImgIndex + 1 >= imagesNodeList.length) return;
  currentImgIndex += addOrSubtract;
}

function offsetImgWrapper() {
  const imagesWrapper = document.querySelector(".carousel__images-wrapper");
  const imagesNodeList = document.querySelectorAll(".carousel__image");
  const imageWidth = imagesNodeList[0].width;
  imagesWrapper.style = `transform: translateX(-${
    currentImgIndex * imageWidth
  }px)`;
}

// Buttons
function createButton(index) {
  const buttonWrapper = document.querySelector(".carousel__button-wrapper");
  const newButton = document.createElement("button");
  newButton.classList.add("carousel__button");
  newButton.dataset.imgid = index;
  newButton.addEventListener("click", handleButtonClick);
  buttonWrapper.append(newButton);
}

function handleButtonClick({ currentTarget }) {
  currentImgIndex = Number(currentTarget.dataset.imgid);
  offsetImgWrapper();
  updateButtons();
}

function updateButtons() {
  const buttons = document.querySelectorAll(".carousel__button");
  buttons.forEach((button) =>
    button.classList.remove("carousel__button--active")
  );
  buttons[currentImgIndex].classList.add("carousel__button--active");
}

// Export
function updateCarousel(media) {
  clearElement(".carousel__images-wrapper");
  clearElement(".carousel__button-wrapper");
  media.forEach((img, index) => {
    displayImg(img);
    createButton(index);
  });
}

function displayImg(imgSrc) {
  const imagesWrapperEl = document.querySelector(".carousel__images-wrapper");
  const newImgEl = document.createElement("img");
  newImgEl.classList.add("carousel__image");
  newImgEl.src = imgSrc;
  imagesWrapperEl.append(newImgEl);
}

export { updateCarousel, updateButtons };
