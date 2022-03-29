import "./Nav.js";
import { selectFirstColor } from "./Product.js";

window.addEventListener("load", handleLoad);

function handleLoad() {
  selectFirstColor();
}
