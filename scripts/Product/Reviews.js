import { firestore, db } from "../firebase.js";
import { $, $$, clearElement, nodeListAddEventListeners } from "../utils.js";
import {
  currentProductData,
  currentProductId,
  currentProductRating,
  reloadProductData,
} from "./Product.js";
import { createStars } from "./Stars.js";

// Overview of Reviews
function displayReviewStats() {
  const reviewHeaderCount = $(".product__review-count");
  const reviewOverviewRating = $("#reviews__numbered-rating");
  const reviewsCountNodeList = $$(".reviews__count");
  const reviewsCountStr = `${currentProductData.reviews.length} Reviews`;

  reviewHeaderCount.innerText = `(${currentProductData.reviews.length})`;
  reviewOverviewRating.innerText = currentProductRating;
  reviewsCountNodeList.forEach((div) => (div.innerText = reviewsCountStr));
}

// New Review
createStars(0, $(".new-review__stars"));
const newReviewButton = $(".new-review__button");
const newReviewStarsNodeList = $$(".new-review__stars i");
let rating = 0;
let hasSelectedRating = false;

newReviewButton.addEventListener("click", addReviewToDb);
newReviewStarsNodeList.forEach((item) => {
  item.addEventListener("mousemove", preSelectStars);
  item.addEventListener("mouseout", clearStars);
  item.addEventListener("click", updateRating);
});

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

function clearStars() {
  if (hasSelectedRating)
    return newReviewStarsNodeList.forEach(
      (star, index) => index <= rating - 1 && fillStar(star)
    );
  newReviewStarsNodeList.forEach((star) => fillStar(star, false));
}

function updateRating({ currentTarget }) {
  rating = Number(currentTarget.dataset.starindex) + 1; // star index starts at 0, rating value starts at 1. 1 added to fix discrepancy between starting
  hasSelectedRating = true;
}

async function addReviewToDb() {
  const collectionRef = firestore.doc(db, "products", currentProductId);
  const nameValue = $("#new-review__name").value;
  const titleValue = $("#new-review__title").value;
  const textValue = $("#new-review__text").value;
  const dateOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  await firestore.updateDoc(collectionRef, {
    reviews: firestore.arrayUnion({
      rating,
      title: titleValue,
      text: textValue,
      author: nameValue,
      date: new Date().toLocaleDateString("en-US", dateOptions),
    }),
  });
  updateReviews();
}

async function updateReviews() {
  await reloadProductData();
  displayReviewStats();
  renderUserReviews();
}

// Users reviews rendering

function renderUserReviews() {
  const reviewsContainer = $(".reviews__container");
  const reviewTemplate = $(".reviews__template");
  clearElement(".reviews__container");
  currentProductData.reviews.forEach(
    ({ rating, title, text, author, date }) => {
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
    }
  );
}
