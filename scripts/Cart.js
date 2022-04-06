import { $, $$, clearElement, nodeListAddEventListeners } from "./utils.js";
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
  const itemInCart = cartArr.find(
    ({ name, size, color }) =>
      name === item.name && size === item.size && color.id === item.color.id
  );
  itemInCart ? itemInCart.qty++ : cartArr.push(item);
  localStorage.setItem("cart", JSON.stringify(cartArr));
  updateCart();
}

function updateCart() {
  clearElement(".shopping-cart__items");
  const cartArr = JSON.parse(localStorage.cart);
  const cartItemTemplate = $(".shopping-cart__template");
  cartArr.forEach(({ name, size, color, price, qty }, index) => {
    const newItemWrapper = document.createElement("div");
    const newItem = cartItemTemplate.content.cloneNode(true);
    const newItemImage = $(".shopping-cart__image", newItem);
    const newItemName = $(".shopping-cart__name", newItem);
    const newItemColor = $(".shopping-cart__color", newItem);
    const newItemSize = $(".shopping-cart__size", newItem);
    const newItemQuantityWrapper = $(
      ".shopping-cart__quantity-wrapper",
      newItem
    );
    const newItemQuantity = $(".shopping-cart__quantity", newItem);
    const newItemQuantityButtons = $$(
      ".shopping-cart__quantity-wrapper .fa",
      newItem
    );
    const newItemPrice = $(".shopping-cart__price", newItem);
    const newItemDelete = $(".shopping-cart__delete", newItem);

    newItemImage.src = color.img;
    newItemName.innerText = name;
    newItemColor.innerText = color.name;
    newItemSize.innerText = `Size: UK ${size}`;
    newItemPrice.innerText = `£${price}`;
    newItemQuantityWrapper.dataset.itemid = index;
    newItemQuantity.innerText = qty;
    nodeListAddEventListeners(newItemQuantityButtons, "click", addOrSubtract);
    newItemDelete.addEventListener("click", handleDeleteClick);
    newItemWrapper.dataset.itemid = index;
    newItemWrapper.classList.add("shopping-cart__item");
    newItemWrapper.append(newItem);
    cartItemsDiv.append(newItemWrapper);
  });
}

function addOrSubtract({ currentTarget }) {
  const cartArr = JSON.parse(localStorage.cart);
  const currentItemId = currentTarget.parentNode.dataset.itemid;
  const currentQuantityEl = $$(".shopping-cart__quantity")[currentItemId];
  const buttonValue = Number(currentTarget.dataset.add);

  cartArr[currentItemId].qty += Number(currentTarget.dataset.add);
  if (cartArr[currentItemId].qty === 0) return deleteItem(currentItemId);
  currentQuantityEl.innerText = cartArr[currentItemId].qty;
  localStorage.cart = JSON.stringify(cartArr);
}

function handleDeleteClick({ currentTarget }) {
  deleteItem(currentTarget.dataset.itemid);
}

function deleteItem(itemIndex) {
  const cartArr = JSON.parse(localStorage.cart);
  cartArr.splice(itemIndex, 1);
  localStorage.cart = JSON.stringify(cartArr);
  updateCart();
}

export { addToCart };
