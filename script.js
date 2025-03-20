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
    const table = document.getElementById("myTable");
    for (let i = 0; i < myLibrary.length; i++) {
        let newRow = table.insertRow(-1);
        for (let prop in myLibrary[i]) {
            let newCell = newRow.insertCell(-1);
            newCell.innerText = myLibrary[i][prop];
        }
    }
}


addBookToLibrary("The Hobbit", "295", "Tolkien", "Yes");
addBookToLibrary("The Hobbit", 295, "Tolkien", "No");
displayBook();
const dialog = document.querySelector("dialog");
const btn = document.querySelector("#add-book");
btn.addEventListener("click", (event) => {
    dialog.showModal();
});