const collapsibleItemNodeList = document.querySelectorAll(".collapsible__item");
collapsibleItemNodeList.forEach((item) =>
  item.addEventListener("click", expandCollapsible)
);
function expandCollapsible({ currentTarget }) {
  if ([...currentTarget.classList].includes("collapsible__item--active")) {
    return currentTarget.classList.remove("collapsible__item--active");
  }

  collapsibleItemNodeList.forEach((item) =>
    item.classList.remove("collapsible__item--active")
  );

  currentTarget.classList.add("collapsible__item--active");
}
