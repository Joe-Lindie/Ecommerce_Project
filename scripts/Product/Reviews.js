import { currentProductObj, currentProductRating } from "./Product.js";

const reviewHeaderCount = document.querySelector(".product__review-count");
const reviewOverviewRating = document.querySelector(
  "#reviews__numbered-rating"
);
const reviewsCountNodeList = document.querySelectorAll(".reviews__count");
const reviewsCountStr = `${currentProductObj.reviews.length} Reviews`;

reviewHeaderCount.innerText = `(${currentProductObj.reviews.length})`;
reviewOverviewRating.innerText = currentProductRating;
reviewsCountNodeList.forEach((div) => (div.innerText = reviewsCountStr));
