// Current product info
import { db, firestore } from "../firebase.js";
import "../Nav.js";
import { createStars } from "./Stars.js";

const currentProductId = document.querySelector("body").id;
const currentProductRef = firestore.doc(db, "products", currentProductId);
const currentProductSnap = await firestore.getDoc(currentProductRef);
const currentProductData = currentProductSnap.data();
const currentProductRating = (
  currentProductData.reviews.reduce((sum, { rating }) => sum + rating, 0) /
  currentProductData.reviews.length
).toFixed(1); // Adds all ratings and divides by the amount of reviews. This returns the average rating with 1 tenth after the decimal

// Star Generation
const starsContainerNodeList = document.querySelectorAll(".product__stars");
starsContainerNodeList.forEach((container) =>
  createStars(currentProductRating, container)
);

export { currentProductData, currentProductId, currentProductRating };
