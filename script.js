// ### VARIABLES ###

const dialog = document.querySelector("dialog");
const showModalBtn = document.querySelector(".show-modal-btn");
const submitModalBtn = document.querySelector(".submit-modal-btn");
const titleInput = dialog.querySelector("#title");
const authorInput = dialog.querySelector("#author");
const pagesInput = dialog.querySelector("#pages");
const statusInput = dialog.querySelector("#status");
const tableBody = document.querySelector("tbody");
const closeBtn = document.querySelector(".close-btn");
const myLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
  }
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, "Read");

addBookToLibrary("Robinson Crusoe", "Daniel Defoe", 608, "Not read");

addBookToLibrary("Treasure Island", "Robert Louis Stevenson", 238, "Not read");

addBookToLibrary("Tom Sawyer", "Mark Twain", 274, "Read");

myLibrary.forEach((book) => displayBook(book));

// ### FUNCTIONS ###

function createTableRow() {
  return document.createElement("tr");
}

function createTableData() {
  return document.createElement("td");
}

function createButtonTableData(
  btnClass,
  btnContent,
  statusCell,
  tableRowId,
  tableRow,
) {
  const tableData = createTableData();
  tableData.classList.add("has-btn");

  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.classList.add(btnClass);
  button.textContent = btnContent;

  if (btnContent === "Update") {
    button.addEventListener("click", () => {
      if (statusCell.textContent === "Read") {
        statusCell.textContent = "Not read";
      } else {
        statusCell.textContent = "Read";
      }

      let currentBookIndex = myLibrary.findIndex((book) => {
        return book.id === tableRowId;
      });

      if (myLibrary[currentBookIndex].status === "Read") {
        myLibrary[currentBookIndex].status = "Not read";
      } else {
        myLibrary[currentBookIndex].status = "Read";
      }
    });
  } else if (btnContent === "Remove") {
    button.addEventListener("click", () => {
      tableBody.removeChild(tableRow);

      let currentBookIndex = myLibrary.findIndex((book) => {
        return book.id === tableRowId;
      });

      myLibrary.splice(currentBookIndex, 1);
    });
  }

  tableData.appendChild(button);

  return tableData;
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
}

function displayBook(book) {
  const tableRow = createTableRow();
  tableRow.setAttribute("data-book-id", book.id);
  const tableRowId = tableRow.getAttribute("data-book-id");

  const titleCell = createTableData();
  titleCell.textContent = book.title;
  tableRow.appendChild(titleCell);

  const authorCell = createTableData();
  authorCell.textContent = book.author;
  tableRow.appendChild(authorCell);

  const pagesCell = createTableData();
  pagesCell.textContent = book.pages;
  tableRow.appendChild(pagesCell);

  const statusCell = createTableData();
  statusCell.textContent = book.status;
  statusCell.classList.add("status-cell");
  tableRow.appendChild(statusCell);

  const updateCell = createButtonTableData(
    "update-status-btn",
    "Update",
    statusCell,
    tableRowId,
    tableRow,
  );
  tableRow.appendChild(updateCell);

  const removeCell = createButtonTableData(
    "remove-book-btn",
    "Remove",
    statusCell,
    tableRowId,
    tableRow,
  );
  tableRow.appendChild(removeCell);

  tableBody.appendChild(tableRow);
}

// ### DIALOG ###

showModalBtn.addEventListener("click", () => dialog.showModal());
submitModalBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const inputs = [titleInput, authorInput, pagesInput, statusInput];

  const validity = {
    title: {
      valid: false,
    },
    author: {
      valid: false,
    },
    pages: {
      valid: false,
    },
    status: {
      valid: false,
    },
  };

  inputs.forEach((input) => {
    if (!input.value) {
      if (!input.nextElementSibling) {
        const errorMsg = document.createElement("div");
        errorMsg.classList.add("error-msg");
        errorMsg.textContent = `You should write a ${input.name}.`;
        input.parentElement.appendChild(errorMsg);
        // return;
      }
    } else {
      if (input.nextElementSibling) {
        input.nextElementSibling.remove();
      }
      validity[input.name].valid = true;
    }
  });

  if (checkValidity(validity)) {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const status = statusInput.value;

    addBookToLibrary(title, author, pages, status);
    const addedBook = myLibrary[myLibrary.length - 1];
    displayBook(addedBook);
    dialog.close();
  }
});

closeBtn.addEventListener("click", () => dialog.close());

function checkValidity(validity) {
  let result = true;
  for (const input in validity) {
    if (!Object.hasOwn(validity, input)) continue;

    const inputValidity = validity[input];

    if (!inputValidity.valid) {
      result = false;
      return result;
    } else {
      continue;
    }
  }
  return result;
}
