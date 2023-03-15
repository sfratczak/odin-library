const myBooksTableBody = document.querySelector("tbody");
const newBookFormSubmit = document.getElementById("newbook-submit");
const myLibrary = [];

function Book(title, author, genre, pages, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, genre, pages, read) {
  myLibrary.push(new Book(title, author, genre, pages, read));
}

function addBooksToTable(table, library) {
  library.forEach((book) => {
    const bookObjectValues = Object.values(book);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("headers", "remove-book");

    const deleteButtonCell = document
      .createElement("td")
      .appendChild(deleteButton);

    const tableRowElements = [deleteButtonCell];

    for (let i = 0; i < bookObjectValues.length; i += 1) {
      const element = document.createElement("td");
      element.textContent = `${bookObjectValues[i]}`;

      tableRowElements.push(element);
    }

    const tableRow = document.createElement("tr");
    tableRow.setAttribute("data-index-number", library.indexOf(book));
    tableRow.append(...tableRowElements);

    table.appendChild(tableRow);
  });
}

function clearTable(table) {
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
}

function recoverNewBookFormData() {
  const newBookFormTitleVal = document.getElementById("newbook-title").value;
  const newBookFormAuthorVal = document.getElementById("newbook-author").value;
  const newBookFormGenreVal = document.getElementById("newbook-genre").value;
  const newBookFormPagesVal = document.getElementById("newbook-pages").value;
  const newBookFormReadBool = document.getElementById("newbook-read").checked;

  const newBookData = [
    newBookFormTitleVal,
    newBookFormAuthorVal,
    newBookFormGenreVal,
    newBookFormPagesVal,
    newBookFormReadBool,
  ];

  return newBookData;
}

newBookFormSubmit.addEventListener("click", (e) => {
  addBookToLibrary(...recoverNewBookFormData());

  clearTable(myBooksTableBody);
  addBooksToTable(myBooksTableBody, myLibrary);

  e.preventDefault();
});
