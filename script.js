const myLibrary = [];

class Book {
    constructor(title, author, pages, year, read) {
      this.id = crypto.randomUUID();
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.year = year;
      this.read = read;
    }
    toggleRead() {
      this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, year, read) {
    const book = new Book(title, author, pages, year, read);
    myLibrary.push(book);
}

function displayBooks() {
    const library = document.getElementById("library");
    library.innerHTML = "";

    for(let book of myLibrary) {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.setAttribute("data-id", book.id);

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.year}</p>
            <p>${book.read ? "Read" : "Not read yet"}</p>
            <button class="toggle-read-btn">Toggle Read</button>
            <button class="remove-btn">Remove</button>    
        `;

        library.appendChild(card);
    }
}

const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const bookForm = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
  bookForm.reset();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stops the page from reloading/submitting to a server

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const year = document.getElementById("year").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, year, read);
  displayBooks();

  bookForm.reset();
  dialog.close();
});

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  displayBooks();
}

const library = document.getElementById("library");

library.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const card = event.target.closest(".book-card"); // find the parent card
    const id = card.getAttribute("data-id");
    removeBookFromLibrary(id);
  }
  
  if (event.target.classList.contains("toggle-read-btn")) {
    const card = event.target.closest(".book-card");
    const id = card.getAttribute("data-id");
    const book = myLibrary.find((book) => book.id === id);
    book.toggleRead();
    displayBooks();
  }
});

