// Current product info
import { db, firestore } from "../firebase.js";
import "../Nav.js";
import { createStars } from "./Stars.js";

let currentProductId,
  currentProductRef,
  currentProductSnap,
  currentProductData,
  currentProductRating;

async function reloadProductData() {
  currentProductId = document.querySelector("body").id;
  currentProductRef = firestore.doc(db, "products", currentProductId);
  currentProductSnap = await firestore.getDoc(currentProductRef);
  currentProductData = currentProductSnap.data();
  currentProductRating = (
    currentProductData.reviews.reduce((sum, { rating }) => sum + rating, 0) /
    currentProductData.reviews.length
  ).toFixed(1); // Adds all ratings and divides by the amount of reviews. This returns the average rating with 1 tenth after the decimal
}

await reloadProductData();

// Star Generation
const starsContainerNodeList = document.querySelectorAll(".product__stars");
starsContainerNodeList.forEach((container) =>
  createStars(currentProductRating, container)
);

export {
  currentProductData,
  currentProductId,
  currentProductRating,
  currentProductRef,
  reloadProductData,
};
