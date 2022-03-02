import * as selectors from "./selectors.js";

const bookTemplate = function (img, title) {
  const price = Math.trunc(Math.random() * 80) + 20;
  return `
  <div class="book">
    <img src="${img}" alt="" />
    <h3>${title}</h3>
    <p class="price">$${price}</p>
    <button class="add_btn">Add to Cart</button>
  </div>
`;
};

export const orderedBookTemplate = function (img, title, price) {
  return `
  <div class="ordered_book">
    <img src="${img}" alt="" />
    <div>
     <h3>${title}</h3>
     <p>$${price}</p>
     <button class="remove_btn">remove</button>
    </div>
  </div>`;
};

async function getBook(query) {
  const data = await fetch(
    `http://openlibrary.org/search.json?title=${query}&language=eng&limit=30`
  ).then((response) => response.json());

  const books = [...data.docs];

  books.forEach((book) => {
    renderBook(book.cover_i, book.title);
  });
}

function renderBook(id, title) {
  const cover = id
    ? `https://covers.openlibrary.org/b/id/${id}-L.jpg`
    : `../img/blackBackground.jpg`;

  selectors.booksContainer.insertAdjacentHTML(
    "beforeend",
    bookTemplate(cover, title)
  );
}

export function addToCart(e) {
  e.preventDefault();
  if (e.target.classList.contains("add_btn")) {
    const book = e.target.closest(".book");
    const img = book.querySelector("img").getAttribute("src");
    const title = book.querySelector("h3").textContent;
    const price = book.querySelector("p").textContent.slice(1);

    selectors.orderedBooks.insertAdjacentHTML(
      "beforeend",
      orderedBookTemplate(img, title, price)
    );
    selectors.buyForm.querySelector("span").textContent = "$";
    selectors.buyTotal.textContent = "";
    selectors.cartSumm.textContent = +selectors.cartSumm.textContent + 1;
    selectors.totalSumm.textContent = +selectors.totalSumm.textContent + +price;
    selectors.buyTotal.textContent = +selectors.totalSumm.textContent;
  }
}

export function removeFromCart(e) {
  e.preventDefault();
  if (e.target.classList.contains("remove_btn")) {
    const book = e.target.closest(".ordered_book");
    const price = book.querySelector("p").textContent.slice(1);

    selectors.cartSumm.textContent = +selectors.cartSumm.textContent - 1;
    selectors.totalSumm.textContent = +selectors.totalSumm.textContent - +price;
    selectors.buyTotal.textContent = +selectors.totalSumm.textContent;

    book.outerHTML = "";
  }
}

export function searchBooks(e) {
  e.preventDefault();
  selectors.booksContainer.innerHTML = "";
  getBook(selectors.searchInput.value);
  selectors.searchInput.value = "";
}

export function confirmBuy(e) {
  e.preventDefault();

  if (selectors.emailInput.value !== "" && selectors.nameInput.value !== "") {
    selectors.emailInput.value = selectors.nameInput.value = "";
    selectors.buyTotal.textContent = "Succes";
    selectors.buyForm.querySelector("span").textContent = "";
    selectors.orderedBooks.innerHTML = "";
    selectors.cartSumm.textContent = 0;
    selectors.totalSumm.textContent = 0;
  }
}
