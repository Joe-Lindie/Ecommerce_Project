// Current product info
import "../Nav.js";
import { createStars } from "./Stars.js";
import products from "../../data/products.js";

const currentProductId = document.querySelector("body").id;
const currentProductObj = products.find(
  ({ productName }) => productName === currentProductId
);
const currentProductRating = (
  currentProductObj.reviews.reduce((sum, { rating }) => sum + rating, 0) /
  currentProductObj.reviews.length
).toFixed(1); // Adds all ratings and divides by the amount of reviews. This returns the average rating with 1 tenth after the decimal

// Star Generation
const starsContainerNodeList = document.querySelectorAll(".product__stars");
starsContainerNodeList.forEach((container) =>
  createStars(currentProductRating, container)
);

export { currentProductObj, currentProductId, currentProductRating };
