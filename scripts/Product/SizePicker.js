import { $, $$, nodeListAddEventListeners } from "../utils.js";
import { currentProductDetails, activateButton } from "./Product.js";

const sizeNodeList = $$(".size");
nodeListAddEventListeners(sizeNodeList, "click", selectSize);

function selectSize({ currentTarget }) {
  removeSizeStyling();
  currentTarget.classList.add("size--active");
  currentProductDetails.size = currentTarget.dataset.size;
  activateButton();
}

function removeSizeStyling() {
  sizeNodeList.forEach((size) => size.classList.remove("size--active"));
}
