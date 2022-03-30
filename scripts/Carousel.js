const carousel = document.querySelector(".carousel");
const viewport = document.querySelector(".carousel__viewport");
const imagesNodeList = document.querySelectorAll(".carousel__image");

let previousX = 0;
let isMouseDown = false;

carousel.addEventListener("mousedown", handleMouseDown);
carousel.addEventListener("mousemove", handleMouseMove);
carousel.addEventListener("mouseup", handleMouseUp);

function handleMouseDown({ clientX }) {
  previousX = clientX;
  isMouseDown = true;
}

function handleMouseMove({ clientX }) {
  if (!isMouseDown) return;
  clientX - previousX < 0 ? displayNextImg(1) : displayNextImg(-1);
}

function handleMouseUp() {
  isMouseDown = false;
}

function displayNextImg() {}
