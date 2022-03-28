const chevron = document.querySelector(".collapsible__chevron");

chevron.addEventListener("click", rotateCheveron);

function rotateCheveron({ currentTarget }) {
  currentTarget.classList.toggle("collapsible__chevron--rotate");
}
