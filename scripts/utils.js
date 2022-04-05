// Query Selectors
const $ = (selector, element = document) => element.querySelector(selector);
const $$ = (selector, element = document) => [
  ...element.querySelectorAll(selector),
];
const clearElement = (selector) => ($(selector).innerHTML = "");
const nodeListAddEventListeners = (nodeList, event, fn) =>
  nodeList.forEach((item) => item.addEventListener(event, fn));

export { $, $$, clearElement, nodeListAddEventListeners };
