import * as selectors from "./selectors.js";

export function addClickHandler(target, fn) {
  target.addEventListener("click", fn);
}

export function cartDropdown(e) {
  e.preventDefault();
  selectors.cart.classList.toggle("show_cart");
}
