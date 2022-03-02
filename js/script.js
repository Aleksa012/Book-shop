import * as model from "./model.js";
import * as selectors from "./selectors.js";
import * as view from "./view.js";

view.addClickHandler(selectors.searchBtn, model.searchBooks);
view.addClickHandler(selectors.booksContainer, model.addToCart);
view.addClickHandler(selectors.cart, model.removeFromCart);
view.addClickHandler(selectors.shopingCart, view.cartDropdown);
view.addClickHandler(selectors.buyBtn, view.showBuyForm);
view.addClickHandler(selectors.closeForm, view.closeBuyForm);
view.addClickHandler(selectors.confirmBtn, model.confirmBuy);
