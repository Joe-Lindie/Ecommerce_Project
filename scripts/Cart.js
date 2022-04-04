function addToCart(item) {
  if (!localStorage.cart) localStorage.cart = "[]";
  let cartArr = JSON.parse(localStorage.cart);
  cartArr.push(item);
  localStorage.setItem("cart", JSON.stringify(cartArr));
}

export { addToCart };
