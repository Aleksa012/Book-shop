import * as model from "./model.js";
import * as selectors from "./selectors.js";

selectors.searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  selectors.booksContainer.innerHTML = "";
  model.getBook(selectors.searchInput.value);
  selectors.searchInput.value = "";
});

// selectors.booksContainer.addEventListener("click", function (e) {
//   e.preventDefault();
//   if (e.target.classList.contains("add_btn")) {
//   }
// });
