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
    this.itemColors = $(".color-wrapper", this.item);

    // Product obj values
    this.productId = productId;
    this.productName = productName;
    this.subtitle = subtitle;
    this.colors = colors;
    this.price = price;
  }

  createProduct() {
    this.colors.forEach((color) => this.createColorIcon(color));
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
    const colorsNodeList = $$(".color", this.itemColors);
    const mockEvent = {
      currentTarget: {
        dataset: { colorid: colorsNodeList[0].dataset.colorid },
      },
    };
    this.selectColor(mockEvent);
  }

  selectColor({ currentTarget }) {
    const firstImg = this.colors.find(
      (color) => color.colorId === currentTarget.dataset.colorid
    ).media[0];
    this.itemImage.src = firstImg;
  }
}

displayProducts();
