import { $, $$ } from "../utils.js";
import products from "../../data/products.js";
import { addToCart } from "../Cart.js";

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
    this.itemSmallTitle = $(".item__title--small", this.item);
    this.itemColorName = $(".product__color-name", this.item);
    this.itemColorWrapper = $(".color-wrapper", this.item);
    this.itemSizeWrapper = $(".item__size-wrapper", this.item);

    // Product obj values
    this.productId = productId;
    this.productName = productName;
    this.subtitle = subtitle;
    this.colors = colors;
    this.price = price;

    // Cart details
    this.productDetails = {
      name: this.productName,
      size: "",
      color: "",
      price: this.price,
      qty: 1,
    };
  }

  createProduct() {
    this.colors.forEach((color) => this.createColorIcon(color));
    this.itemColors = $$(".color", this.item);
    this.selectFirstColor();
    this.createSizes();
    this.itemTitle.innerText = this.productName;
    this.itemSubtitle.innerText = this.subtitle;
    this.itemSmallTitle.innerText = this.productName;
    this.collectionWrapper.append(this.item);
  }

  // Color
  createColorIcon({ colorsHexValues, colorId }) {
    // const colorWrapper = $(".color-wrapper", this.item);
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
    this.itemColorWrapper.append(colorClone);
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
    const { colorName, media } = this.colors.find(
      (color) => color.colorId === currentTarget.dataset.colorid
    );
    this.itemImage.src = media[0];
    this.itemColorName.innerText = colorName;
    this.highlightSelectedColor(currentTarget);
    this.productDetails.color = {
      name: colorName,
      id: currentTarget.dataset.colorid,
      img: media[0],
    };
  }

  highlightSelectedColor(selectedColor) {
    this.itemColors.forEach((color) => color.classList.remove("color--active"));
    const selectedColorEl = this.itemColors.find(
      (color) => color.dataset.colorid === selectedColor.dataset.colorid
    );
    selectedColorEl.classList.add("color--active");
    this.productDetails.color = selectedColor.dataset.colorid;
  }

  // Size
  createSizes() {
    for (let size = 7; size <= 14; size++) {
      const sizeTemplate = $(".size__template");
      const sizeClone = sizeTemplate.content.cloneNode(true);
      const sizeDiv = $(".size", sizeClone);
      const sizeRegion = $(".size__region", sizeClone);
      const sizeNumber = $(".size__number", sizeClone);
      sizeRegion.innerText = "UK";
      sizeNumber.innerText = size;
      sizeDiv.dataset.size = size;
      sizeDiv.addEventListener("click", this.selectSize.bind(this));
      this.itemSizeWrapper.append(sizeClone);
    }
  }

  selectSize({ currentTarget }) {
    console.log(this.productDetails);
    this.productDetails.size = currentTarget.dataset.size;
    addToCart(this.productDetails);
  }
}

displayProducts();
