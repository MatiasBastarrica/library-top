const dialog = document.querySelector("dialog");
const showModalBtn = document.querySelector(".show-modal-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");

showModalBtn.addEventListener("click", () => dialog.showModal());
closeModalBtn.addEventListener("click", () => dialog.close());

const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.id = randomUUID();
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
}
