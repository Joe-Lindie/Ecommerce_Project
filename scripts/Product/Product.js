// Current product info
import { $, $$ } from "../utils.js";
import { db, firestore } from "../firebase.js";
import { addToCart } from "../Cart.js";

// Product Data
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

// Product selection
const currentProductDetails = {
  name: $(".product__title").innerText,
  size: "",
  color: "",
  price: currentProductData.price,
};
const addToCartButton = $(".product__button");

addToCartButton.addEventListener("click", handleAddToCartClick);

function activateButton() {
  addToCartButton.classList.remove("btn--inactive");
  addToCartButton.classList.add("btn--active");
  addToCartButton.innerText = `add to cart - £${currentProductData.price}`;
}

function handleAddToCartClick() {
  const isButtonActive = [...addToCartButton.classList].includes("btn--active");
  if (!isButtonActive) return;
  addToCart(currentProductDetails);
}

export {
  currentProductDetails,
  currentProductData,
  currentProductId,
  currentProductRating,
  currentProductRef,
  reloadProductData,
  activateButton,
};
