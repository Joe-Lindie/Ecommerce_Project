import { $, $$, clearElement, nodeListAddEventListeners } from "../utils.js";
import { currentProductData, currentProductRating } from "./Product.js";
import { createStars } from "./Stars.js";

// Overview of Reviews
const reviewHeaderCount = $(".product__review-count");
const reviewOverviewRating = $("#reviews__numbered-rating");
const reviewsCountNodeList = $$(".reviews__count");
const reviewsCountStr = `${currentProductData.reviews.length} Reviews`;

reviewHeaderCount.innerText = `(${currentProductData.reviews.length})`;
reviewOverviewRating.innerText = currentProductRating;
reviewsCountNodeList.forEach((div) => (div.innerText = reviewsCountStr));

// New Review
const newReviewStarsContainer = $(".new-review__stars");
createStars(0, newReviewStarsContainer);

const newReviewStarsNodeList = $$(".new-review__stars i");
nodeListAddEventListeners(newReviewStarsNodeList, "mousemove", preSelectStars);

function preSelectStars({ currentTarget }) {
  const hoveredStarIndex = currentTarget.dataset.starindex;
  newReviewStarsNodeList.forEach((star, index) => {
    if (index <= hoveredStarIndex) return fillStar(star);
    fillStar(star, false);
  });
}

function fillStar(star, boolean = true) {
  const shouldFill = (boolean) => (boolean ? "fa-star" : "fa-star-o");
  star.classList.remove(shouldFill(!boolean));
  star.classList.add(shouldFill(boolean));
}

// Users reviews rendering
const reviewsContainer = $(".reviews__container");
const reviewTemplate = $(".reviews__template");

currentProductData.reviews.forEach(({ rating, title, text, author, date }) => {
  const newReview = reviewTemplate.content.cloneNode(true);
  const newReviewRating = $(".reviews__stars", newReview);
  const newReviewTitle = $(".reviews__title", newReview);
  const newReviewText = $(".reviews__text", newReview);
  const newReviewAuthor = $(".reviews__author", newReview);
  const newReviewDate = $(".reviews__date", newReview);

  createStars(rating, newReviewRating);
  newReviewTitle.innerText = title;
  newReviewText.innerText = text;
  newReviewAuthor.innerText = author;
  newReviewDate.innerText = date;
  reviewsContainer.append(newReview);
});
