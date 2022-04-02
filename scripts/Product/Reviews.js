import { currentProductObj, currentProductRating } from "./Product.js";

const reviewRatingEl = document.querySelector("#reviews__numbered-rating");
const reviewCountEl = document.querySelector("#reviews__count");

// Overview
reviewRatingEl.innerText = currentProductRating;
reviewCountEl.innerText = `${currentProductObj.reviews.length} Reviews`;
