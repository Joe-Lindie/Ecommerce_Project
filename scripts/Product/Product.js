// Current product info
import "../Nav.js";
import products from "../../data/products.js";

const currentProductId = document.querySelector("body").id;
const currentProductObj = products.find(
  ({ productName }) => productName === currentProductId
);

export { currentProductObj, currentProductId };
