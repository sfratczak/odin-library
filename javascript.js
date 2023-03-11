const myBooksTableBody = document.querySelector("tbody");
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
    const tableRowElements = [document.createElement("td")];

    for (let i = 0; i < bookObjectValues.length; i += 1) {
      const element = document.createElement("td");
      element.textContent = `${bookObjectValues[i]}`;

      tableRowElements.push(element);
    }

    table.appendChild(document.createElement("tr")).append(...tableRowElements);
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "Fantasy", 295, true);
addBookToLibrary(
  "Project Hail Mary",
  "Andy Weir",
  "Science Fiction",
  476,
  false
);

addBooksToTable(myBooksTableBody, myLibrary);
