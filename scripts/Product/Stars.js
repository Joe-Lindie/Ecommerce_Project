import { currentProductRating } from "./Product.js";

function createStars(rating, parentDiv) {
  const MAX_STARS = 5;
  while (rating > 0 || parentDiv.children.length != MAX_STARS) {
    if (rating >= 1) {
      newStar(["fa", "fa-star"], parentDiv);
      rating--;
      continue;
    }
    if (rating > 0) {
      newStar(["fa", "fa-star-half-o"], parentDiv);
      rating = 0;
      continue;
    }
    newStar(["fa", "fa-star-o"], parentDiv);
    rating = 0;
  }
}

function newStar(classes, parentDiv) {
  const newStarEl = document.createElement("i");
  newStarEl.classList.add(...classes);
  newStarEl.dataset.starindex = parentDiv.children.length;
  parentDiv.append(newStarEl);
}

// Header Star Generation
const starsContainerNodeList = document.querySelectorAll(".product__stars");
starsContainerNodeList.forEach((container) =>
  createStars(currentProductRating, container)
);

export { createStars };
