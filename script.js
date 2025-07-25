// ### VARIABLES ###

const dialog = document.querySelector("dialog");
const showModalBtn = document.querySelector(".show-modal-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");
const titleInput = dialog.querySelector("#title");
const authorInput = dialog.querySelector("#author");
const pagesInput = dialog.querySelector("#pages");
const statusInput = dialog.querySelector("#status");
const tableBody = document.querySelector("tbody");
const closeBtn = document.querySelector(".close-btn");
const myLibrary = [];

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, "Read");

addBookToLibrary("Robinson Crusoe", "Daniel Defoe", 608, "Not read");

addBookToLibrary("Treasure Island", "Robert Louis Stevenson", 238, "Not read");

addBookToLibrary("Tom Sawyer", "Mark Twain", 274, "Read");

myLibrary.forEach((book) => displayBook(book));
