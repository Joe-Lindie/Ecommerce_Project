const sizeNodeList = document.querySelectorAll(".size");
sizeNodeList.forEach((size) => size.addEventListener("click", selectSize));

function selectSize({ currentTarget }) {
  sizeNodeList.forEach((size) => size.classList.remove("size--active"));
  currentTarget.classList.add("size--active");
}
