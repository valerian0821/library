const myLibrary = [];

class Book {
    constructor(id, title, pages, author, read) {
        this.id = id;
        this.title = title;
        this.pages = pages;
        this.author = author;
        this.read = read;
    }

    toggleRead() {
        if (this.read === "Yes") {
            this.read = "No";
        } else {
            this.read = "Yes";
        }
    }
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
            if (myLibrary[i].hasOwnProperty(prop)) {
                let newCell = newRow.insertCell(-1);
                newCell.innerText = myLibrary[i][prop];
            } 
        }
        let toggleCell = newRow.insertCell(-1);
        toggleCell.appendChild(toggleBtns[i]);
        let delCell = newRow.insertCell(-1);
        delCell.appendChild(delBtns[i]);
    }
}

function clearTable() {
    tbody.innerHTML = "";
}

function refreshTable() {
    clearTable();
    createToggleBtns();
    createDelBtns();
    displayBook();
}

function handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;
    const author = document.getElementById("author").value;
    const read = document.getElementById("read").checked ? "Yes" : "No";   
    addBookToLibrary(title, pages, author, read);
    refreshTable();
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
            let bookID = myLibrary[i].id;
            delBookFromLibrary(bookID);
            refreshTable();
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

function createToggleBtns() {
    toggleBtns.length = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        toggleBtns.push(document.createElement("button"));
        toggleBtns[i].textContent = "Toggle"
        toggleBtns[i].classList.add("toggle-btn");
        toggleBtns[i].addEventListener("click", function toggle() {
            myLibrary[i].toggleRead();
            refreshTable();
        })
    }
}



const table = document.querySelector("table");
const tbody = document.querySelector("tbody")
const dialog = document.querySelector("dialog");
const btn = document.querySelector("#add-book");
const delBtns = [];
const toggleBtns = [];
btn.addEventListener("click", (event) => {
    dialog.showModal();
});
const form = document.querySelector("form");
form.addEventListener("submit", handleFormSubmit);


const pages = document.getElementById("pages");

pages.addEventListener("input", (event) => {
    if (!Number.isInteger(Number(pages.value))) {
        pages.setCustomValidity("Please enter a whole number for the number of pages.");
    } else {
        pages.setCustomValidity("");
    }
});