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

function removeArrayItem(array, index) {
  if (array[index]) {
    array.splice(index, 1);
  } else {
    alert("Cannot delete book: Index out of range.");
  }
}

function clearTable(table) {
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
}

function deleteBookFromLibrary() {
  const bookIndex =
    this.parentNode.parentNode.getAttribute("data-index-number");

  removeArrayItem(myLibrary, bookIndex);

  clearTable(myBooksTableBody);
  // eslint-disable-next-line no-use-before-define
  fillTable(myBooksTableBody, myLibrary);
}

function addHoverRowClasses() {
  const tableRows = myBooksTableBody.childNodes;

  tableRows.forEach((row) => {
    const deleteButton = row.firstChild.firstChild;

    row.addEventListener("mouseover", () => {
      deleteButton.classList.add("delete-button-hoverrow");
    });

    row.addEventListener("mouseleave", () => {
      deleteButton.classList.remove("delete-button-hoverrow");
    });
  });
}

function fillTable(table, library) {
  library.forEach((book) => {
    const bookObjectValues = Object.values(book);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("headers", "delete-book");
    deleteButton.addEventListener("click", deleteBookFromLibrary);

    const deleteButtonCell = document.createElement("td");
    deleteButtonCell.appendChild(deleteButton);

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

  addHoverRowClasses();
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
  fillTable(myBooksTableBody, myLibrary);

  e.preventDefault();
});
