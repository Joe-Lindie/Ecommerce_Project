const carousel = document.querySelector(".carousel");
const imagesWrapper = document.querySelector(".carousel__images-wrapper");

let previousX = 0;
let currentImgIndex = 0;
let isMouseDown = false;
let hasImgChanged = false;

carousel.addEventListener("mousedown", handleMouseDown);
carousel.addEventListener("mousemove", handleMouseMove);
carousel.addEventListener("mouseup", handleMouseUp);

function handleMouseDown({ clientX }) {
  previousX = clientX;
  isMouseDown = true;
}

function handleMouseMove({ clientX }) {
  if (!isMouseDown || hasImgChanged) return;
  console.log(clientX - previousX);
  clientX - previousX < 0
    ? updateCurrentImgIndex(1)
    : updateCurrentImgIndex(-1);
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
  const imagesNodeList = document.querySelectorAll(".carousel__image");
  const imageWidth = imagesNodeList[0].width;
  imagesWrapper.style = `transform: translateX(-${
    currentImgIndex * imageWidth
  }px)`;
}
