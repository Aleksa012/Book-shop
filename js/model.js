import * as selectors from "./selectors.js";

const bookTemplate = function (img, title) {
  return `
  <div class="book">
    <img src="${img}" alt="" />
    <h3>${title}</h3>
    <p class="price">$99,9</p>
    <button class="add_btn">Add to Cart</button>
  </div>
`;
};

export async function getBook(query) {
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
