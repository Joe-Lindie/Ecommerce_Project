import { firestore, db } from "../firebase.js";
import { $, $$, clearElement } from "../utils.js";
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
const newReviewInputsNodeList = $$(".new-review__input");
let rating = 0;
let hasSelectedRating = false;

newReviewStarsNodeList.forEach((star) => {
  star.addEventListener("mousemove", preSelectStars);
  star.addEventListener("mouseout", clearStars);
  star.addEventListener("click", updateRating);
});
newReviewInputsNodeList.forEach((input) => {
  input.addEventListener("focus", toggleActiveInput, true);
  input.addEventListener("blur", toggleActiveInput, true);
});
newReviewButton.addEventListener("click", validateReview);

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
    return newReviewStarsNodeList.forEach((star, index) =>
      index <= rating - 1 ? fillStar(star) : fillStar(star, false)
    );
  newReviewStarsNodeList.forEach((star) => fillStar(star, false));
}

function updateRating({ currentTarget }) {
  rating = Number(currentTarget.dataset.starindex) + 1; // star index starts at 0, rating value starts at 1. 1 added to fix discrepancy between starting values
  hasSelectedRating = true;
}
function toggleActiveInput({ currentTarget }) {
  if (currentTarget.value.length > 0) return;
  currentTarget.parentNode.classList.toggle("new-review__item--active");
}

function validateReview() {
  const validationResultDiv = $(".new-review__missing-fields");
  const name = $("#new-review__name");
  const title = $("#new-review__title-input");
  const text = $("#new-review__text");
  if (
    name.value.length > 0 &&
    title.value.length > 0 &&
    text.value.length > 0
  ) {
    addReviewToDb();
    return clearInputs(name, title, text);
  }

  validationResultDiv.innerText = "All fields are required";
}

async function addReviewToDb() {
  const collectionRef = firestore.doc(db, "products", currentProductId);
  const nameValue = $("#new-review__name").value;
  const titleValue = $("#new-review__title-input").value;
  const textValue = $("#new-review__text").value;

  await firestore.updateDoc(collectionRef, {
    reviews: firestore.arrayUnion({
      rating,
      title: titleValue,
      text: textValue,
      author: nameValue,
      date: new Date(),
    }),
  });
  updateReviews();
}

async function updateReviews() {
  await reloadProductData();
  displayReviewStats();
  renderUserReviews();
}
updateReviews();

function clearInputs(...inputs) {
  inputs.forEach((input) => {
    const inputEvent = { currentTarget: input };
    input.value = "";
    toggleActiveInput(inputEvent);
  });
  rating = 0;
  clearStars();
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
      const dateOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      const convertedDate = date
        .toDate()
        .toLocaleDateString("en-US", dateOptions);

      createStars(rating, newReviewRating);
      newReviewTitle.innerText = title;
      newReviewText.innerText = text;
      newReviewAuthor.innerText = author;
      newReviewDate.innerText = convertedDate;
      reviewsContainer.append(newReview);
    }
  );
}
