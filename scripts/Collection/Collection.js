import { $, $$ } from "../utils.js";
import products from "../../data/products.js";

const currentCollectionId = $("body").id;

function displayProducts() {
  const productArr = products.filter(
    ({ productType }) => productType === currentCollectionId
  );

  productArr.forEach((product) => new Product(product).createProduct());
}

class Product {
  // Title, subtitle, image, title--small, colorName, price, colorPicker, size
  constructor({ subtitle, productId, productName, colors, price }) {
    // DOM Elements
    this.collectionWrapper = $(".collection-wrapper");
    this.itemTemplate = $(".item");
    this.item = this.itemTemplate.content.cloneNode(true);
    this.itemTitle = $(".item__title", this.item);
    this.itemSubtitle = $(".item__subtitle", this.item);
    this.itemImage = $(".item__image", this.item);
    this.itemColorWrapper = $(".color-wrapper", this.item);
    this.itemColorName = $(".product__color-name", this.item);

    // Product obj values
    this.productId = productId;
    this.productName = productName;
    this.subtitle = subtitle;
    this.colors = colors;
    this.price = price;
  }

  createProduct() {
    this.colors.forEach((color) => this.createColorIcon(color));
    this.itemColors = $$(".color", this.item);
    this.selectFirstColor();
    this.itemTitle = this.productName;
    this.itemSubtitle = this.subtitle;
    this.collectionWrapper.append(this.item);
  }

  createColorIcon({ colorsHexValues, colorId, colorName }) {
    const colorWrapper = $(".color-wrapper", this.item);
    const colorTemplate = $(".color-template");
    const colorClone = colorTemplate.content.cloneNode(true);
    const color = $(".color", colorClone);
    const colorIconDiv = $(".color__icon", colorClone);
    const colorIconTop = $(".color__icon--top", colorClone);
    const colorIconBottom = $(".color__icon--bottom", colorClone);

    color.dataset.colorid = colorId;
    colorIconTop.style = `background-color:${colorsHexValues.top}`;
    colorIconBottom.style = `background-color:${colorsHexValues.bottom}`;
    colorIconDiv.append(colorIconTop, colorIconBottom);
    color.addEventListener("click", this.selectColor.bind(this));
    colorWrapper.append(colorClone);
  }

  selectFirstColor() {
    const colorsNodeList = $$(".color", this.itemColorWrapper);
    const mockEvent = {
      currentTarget: {
        dataset: { colorid: colorsNodeList[0].dataset.colorid },
      },
    };
    this.selectColor(mockEvent);
  }

  selectColor({ currentTarget }) {
    const currentColorObj = this.colors.find(
      (color) => color.colorId === currentTarget.dataset.colorid
    );
    this.itemImage.src = currentColorObj.media[0];
    this.itemColorName.innerText = currentColorObj.colorName;
    this.highlightSelectedColor(currentTarget);
  }

  highlightSelectedColor(selectedColor) {
    this.itemColors.forEach((color) => color.classList.remove("color--active"));
    const selectedColorEl = this.itemColors.find(
      (color) => color.dataset.colorid === selectedColor.dataset.colorid
    );
    selectedColorEl.classList.add("color--active");
  }
}

displayProducts();
