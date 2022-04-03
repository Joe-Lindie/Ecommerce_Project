import { firestore, db } from "../firebase.js";
import { $, $$, nodeListAddEventListeners } from "../utils.js";
import {
  currentProductData,
  currentProductId,
  currentProductRating,
} from "./Product.js";
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
createStars(0, $(".new-review__stars"));
const newReviewStarsNodeList = $$(".new-review__stars i");
const newReviewButton = $(".new-review__button");
let rating = 0;
let hasSelectedRating = false;

nodeListAddEventListeners(newReviewStarsNodeList, "mousemove", preSelectStars);
nodeListAddEventListeners(newReviewStarsNodeList, "mouseout", clearStars);
nodeListAddEventListeners(newReviewStarsNodeList, "click", updateRating);
newReviewButton.addEventListener("click", addReviewToDb);

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
  const currentProductRef = firestore.doc(
    db,
    "products",
    currentProductId,
    "reviews"
  );
  const currentProductSnap = await firestore.getDoc(currentProductRef);
  const currentProductData = currentProductSnap.data();
  // const nameValue = $("#new-review__name").value;
  // const textValue = $("#new-review__text").value;
  // const collectionRef = doc(db, "products", currentProductId);
  // firestore.setDoc(collectionRef, {
  //   rating,
  //   name: nameValue,
  //   text: textValue,
  // });
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
