const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const isbnInput = document.querySelector("#isbn-input");
const addBtn = document.querySelector("#addBtn");
const bookList = document.querySelector("#book-list");
const cardBody = document.querySelector("#card-body");
const cardTitle = document.querySelector("#card-title");
let alertCount = 0;

addBtn.addEventListener("click", addBook);
bookList.addEventListener("click", deleteBook);
document.addEventListener("DOMContentLoaded", loadBooks);

function addBook(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const isbn = isbnInput.value.trim();
  if (title === "" || author === "" || isbn === "") {
    showAlert("Please fill in all fields.", "danger");
  } else {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${title}</td>
                    <td>${author}</td>
                    <td>${isbn}</td>
                    <td>
                      <i
                        class="fas fa-times text-danger delete-book"
                        style="cursor: pointer;"
                      ></i>
                    </td>`;
    bookList.appendChild(tr);
    showAlert("Book Added!", "success");
    addBookLS(new Book(title, author, isbn));
    titleInput.value = "";
    authorInput.value = "";
    isbnInput.value = "";
  }
}

function addBookLS(book) {
  let books = localStorage.getItem("books");
  if (!books) {
    books = [];
  } else {
    books = JSON.parse(books);
  }
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function showAlert(message, color) {
  hideAlert();
  const div = document.createElement("div");
  div.className = `alert alert-${color}`;
  div.innerText = message;
  cardBody.insertBefore(div, cardTitle);
  alertCount++;
  setTimeout(hideAlert, 3000);
}

function hideAlert() {
  const alert = document.querySelector(".alert");
  if (alert) alert.remove();
}

function deleteBook(event) {
  if (event.target.classList.contains("delete-book")) {
    const tr = event.target.parentElement.parentElement;
    const title = tr.children[0].innerText;
    const author = tr.children[1].innerText;
    const isbn = tr.children[2].innerText;
    tr.remove();
    deleteBookLS(new Book(title, author, isbn));
    showAlert("Book Deleted!", "success");
  }
}

function deleteBookLS(book) {
  const books = JSON.parse(localStorage.getItem("books"));
  for (let i = 0; i < books.length; i++) {
    if (book.equals(books[i])) {
      books.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {
  let books = localStorage.getItem("books");
  if (!books) {
    books = [];
  } else {
    books = JSON.parse(books);
  }
  for (let book of books) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>
                      <i
                        class="fas fa-times text-danger delete-book"
                        style="cursor: pointer;"
                      ></i>
                    </td>`;
    bookList.appendChild(tr);
  }
}

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

  equals(other) {
    return (
      this.title == other.title &&
      this.author == other.author &&
      this.isbn == other.isbn
    );
  }
}
