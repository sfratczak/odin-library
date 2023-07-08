const myBooksTableBody = document.querySelector("tbody");

const newBookModal = document.getElementById("modal-addbook");
const newBookModalOpenButtons = document.querySelectorAll(".addnew-mybooks");

const newBookFormTitle = document.getElementById("newbook-title");
const newBookFormAuthor = document.getElementById("newbook-author");
const newBookFormGenre = document.getElementById("newbook-genre");
const newBookFormPages = document.getElementById("newbook-pages");
const newBookFormRead = document.getElementById("newbook-read");
const newBookFormSubmit = document.getElementById("newbook-submit");

const myLibrary = [];

class Book {
  constructor(title, author, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
  }
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

function createDeleteButtonCell() {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("headers", "delete-book");
  deleteButton.addEventListener("click", deleteBookFromLibrary);

  const deleteButtonCell = document.createElement("td");
  deleteButtonCell.appendChild(deleteButton);

  return deleteButtonCell;
}

function createReadStatusCheckboxCell(book) {
  const readStatusCheckbox = document.createElement("input");
  readStatusCheckbox.setAttribute("type", "checkbox");
  readStatusCheckbox.checked = book.read;
  readStatusCheckbox.addEventListener("click", () => {
    // eslint-disable-next-line no-param-reassign
    book.read = readStatusCheckbox.checked;
  });

  const readStatusCheckboxCell = document.createElement("td");
  readStatusCheckboxCell.appendChild(readStatusCheckbox);

  return readStatusCheckboxCell;
}

function addHoverRowClasses() {
  const tableRows = myBooksTableBody.childNodes;

  tableRows.forEach((row) => {
    const deleteButton = row.firstChild.firstChild;
    const readButton = row.lastChild.firstChild;

    row.addEventListener("mouseover", () => {
      deleteButton.classList.add("delete-button-hoverrow");
      readButton.classList.add("read-button-hoverrow");
    });

    row.addEventListener("mouseleave", () => {
      deleteButton.classList.remove("delete-button-hoverrow");
      readButton.classList.remove("read-button-hoverrow");
    });
  });
}

function fillTable(table, library) {
  library.forEach((book) => {
    const bookObjectValues = Object.values(book);

    const tableRowElements = [createDeleteButtonCell()];

    for (let i = 0; i < bookObjectValues.length; i += 1) {
      if (i === bookObjectValues.length - 1) {
        // Add the read status checkbox cell as the last element
        tableRowElements.push(createReadStatusCheckboxCell(book));
      } else {
        const element = document.createElement("td");
        element.textContent = `${bookObjectValues[i]}`;

        tableRowElements.push(element);
      }
    }

    const tableRow = document.createElement("tr");
    tableRow.setAttribute("data-index-number", library.indexOf(book));
    tableRow.append(...tableRowElements);

    table.appendChild(tableRow);
  });

  addHoverRowClasses();
}

function recoverNewBookFormData() {
  const newBookData = [
    newBookFormTitle.value,
    newBookFormAuthor.value,
    newBookFormGenre.value,
    newBookFormPages.value,
    newBookFormRead.checked,
  ];

  return newBookData;
}

function clearNewBookFormData() {
  [
    newBookFormTitle,
    newBookFormAuthor,
    newBookFormGenre,
    newBookFormPages,
    // eslint-disable-next-line no-return-assign
  ].forEach((e) => (e.value = ""));

  newBookFormRead.checked = true;
}

newBookFormSubmit.addEventListener("click", (e) => {
  addBookToLibrary(...recoverNewBookFormData());

  clearNewBookFormData();
  clearTable(myBooksTableBody);
  fillTable(myBooksTableBody, myLibrary);

  newBookModal.style.display = "none";

  e.preventDefault();
});

newBookModalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    newBookModal.style.display = "grid";
  });
});

window.onclick = (e) => {
  if (e.target === newBookModal) {
    clearNewBookFormData();
    newBookModal.style.display = "none";
  }
};
