import * as selectors from "./selectors.js";

export function addClickHandler(target, fn) {
  target.addEventListener("click", fn);
}

export function cartDropdown(e) {
  e.preventDefault();
  selectors.cart.classList.toggle("show_cart");
}
export function showBuyForm(e) {
  e.preventDefault();
  if (selectors.orderedBooks.innerHTML === "") return;
  selectors.buyForm.classList.remove("hidden");
}

export function closeBuyForm(e) {
  e.preventDefault();
  selectors.buyForm.classList.add("hidden");
}
