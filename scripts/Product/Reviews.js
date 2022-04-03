import { currentProductData, currentProductRating } from "./Product.js";
import { createStars } from "./Stars.js";

const reviewHeaderCount = document.querySelector(".product__review-count");
const reviewOverviewRating = document.querySelector(
  "#reviews__numbered-rating"
);
const reviewsCountNodeList = document.querySelectorAll(".reviews__count");
const reviewsCountStr = `${currentProductData.reviews.length} Reviews`;

reviewHeaderCount.innerText = `(${currentProductData.reviews.length})`;
reviewOverviewRating.innerText = currentProductRating;
reviewsCountNodeList.forEach((div) => (div.innerText = reviewsCountStr));

// Individual reviews rendering
const reviewsContainer = document.querySelector(".reviews__container");
const reviewTemplate = document.querySelector(".reviews__template");

currentProductData.reviews.forEach(({ rating, title, text, author, date }) => {
  const newReview = reviewTemplate.content.cloneNode(true);
  const newReviewRating = newReview.querySelector(".reviews__stars");
  const newReviewTitle = newReview.querySelector(".reviews__title");
  const newReviewText = newReview.querySelector(".reviews__text");
  const newReviewAuthor = newReview.querySelector(".reviews__author");
  const newReviewDate = newReview.querySelector(".reviews__date");

  createStars(rating, newReviewRating);
  newReviewTitle.innerText = title;
  newReviewText.innerText = text;
  newReviewAuthor.innerText = author;
  newReviewDate.innerText = date;
  reviewsContainer.append(newReview);
});
