import { currentProductObj } from "./Product.js";

const reviewRatingEl = document.querySelector("#reviews__numbered-rating");
const reviewCountEl = document.querySelector("#reviews__count");
const averageReviewRating = (
  currentProductObj.reviews.reduce((sum, { rating }) => sum + rating, 0) /
  currentProductObj.reviews.length
).toFixed(1);

reviewRatingEl.innerText = averageReviewRating;
reviewCountEl.innerText = `${currentProductObj.reviews.length} Reviews`;
