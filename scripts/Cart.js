import { $, clearElement } from "./utils.js";
import colors from "../data/colors.js";
import { currentProductId } from "./Product/Product.js";

const cartIcon = $(".nav__cart-icon");
const shoppingCartDiv = $(".shopping-cart");
const cartItemsDiv = $(".shopping-cart__items");
const closeButton = $(".shopping-cart__close");

cartIcon.addEventListener("click", toggleCartActive);
closeButton.addEventListener("click", toggleCartActive);

function toggleCartActive() {
  shoppingCartDiv.classList.toggle("shopping-cart--active");
  updateCart();
}

function addToCart(item) {
  if (!localStorage.cart) localStorage.cart = "[]";
  let cartArr = JSON.parse(localStorage.cart);
  cartArr.push(item);
  localStorage.setItem("cart", JSON.stringify(cartArr));
  updateCart();
}

function updateCart() {
  clearElement(".shopping-cart__items");
  const cartArr = JSON.parse(localStorage.cart);
  const cartItemTemplate = $(".shopping-cart__template");
  cartArr.forEach(({ name, size, color, price }, index) => {
    const newItemWrapper = document.createElement("div");
    const newItem = cartItemTemplate.content.cloneNode(true);
    const newItemName = $(".shopping-cart__name", newItem);
    const newItemColor = $(".shopping-cart__color", newItem);
    const newItemSize = $(".shopping-cart__size", newItem);
    const newItemPrice = $(".shopping-cart__price", newItem);
    const newItemImage = $(".shopping-cart__image", newItem);
    const newItemDelete = $(".shopping-cart__delete", newItem);

    newItemName.innerText = name;
    newItemColor.innerText = color.name;
    newItemSize.innerText = size;
    newItemPrice.innerText = price;
    newItemImage.src = color.img;
    newItemDelete.addEventListener("click", deleteItem);
    newItemDelete.dataset.itemid = index;
    newItemWrapper.classList.add("shopping-cart__item");
    newItemWrapper.append(newItem);
    cartItemsDiv.append(newItemWrapper);
  });
}

function deleteItem({ currentTarget }) {
  const cartArr = JSON.parse(localStorage.cart);
  cartArr.splice(currentTarget.dataset.itemid, 1);
  localStorage.cart = JSON.stringify(cartArr);
  updateCart();
}

export { addToCart };
