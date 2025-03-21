const myLibrary = [];

function Book(id, title, pages, author, read) {
  // the constructor...
    this.id = id;
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.read = read;
}

function addBookToLibrary(title, pages, author, read) {
  // take params, create a book then store it in the array
    let newID = crypto.randomUUID();
    const book = new Book(newID, title, pages, author, read);
    myLibrary.push(book);
}

function displayBook() {
    for (let i = 0; i < myLibrary.length; i++) {
        let newRow = tbody.insertRow(-1);
        for (let prop in myLibrary[i]) {
            let newCell = newRow.insertCell(-1);
            newCell.innerText = myLibrary[i][prop];
        }
        newCell = newRow.insertCell(-1);
        newCell.appendChild(delBtns[i]);
    }
}

function clearTable() {
    tbody.innerHTML = "";
}

function handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;
    const author = document.getElementById("author").value;
    const read = document.getElementById("read").value;
    clearTable();
    addBookToLibrary(title, pages, author, read);
    createDelBtns();
    displayBook();
    dialog.close();
    form.reset();  
}

function createDelBtns() {
    delBtns.length = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        delBtns.push(document.createElement("button"));
        delBtns[i].textContent = "<==";
        delBtns[i].classList.add("del-btn");
        delBtns[i].addEventListener("click", function linkBookID() {
            // removeDelBtns();
            let bookID = myLibrary[i].id;
            delBookFromLibrary(bookID);
            clearTable();
            createDelBtns();
            displayBook();
            console.log(myLibrary);
        })
    }
}

function delBookFromLibrary(bookID) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (bookID == myLibrary[i].id) {
            myLibrary.splice(i, 1);
            return;
        }
    }
}

const table = document.querySelector("table");
const tbody = document.querySelector("tbody")
const dialog = document.querySelector("dialog");
const btn = document.querySelector("#add-book");
const delBtns = [];
btn.addEventListener("click", (event) => {
    dialog.showModal();
});
const form = document.querySelector("form");
form.addEventListener("submit", handleFormSubmit);
