const myLibrary = [];
const tableDOM = document.getElementById("table-body");
const containerDOM = document.getElementById("container");
const bookBtnDOM = document.getElementById("book-btn");
const bookForm = document.getElementById("book-form");

function Book(id, title, author, pages){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
} 

function addBookToLibrary(title, author, pages){
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages);
    myLibrary.push(book);
}
function deleteBookFromLibrary(id){
    myLibrary.forEach(book =>{
        if(book.id === id){
            myLibrary.pop(book);
        }
    })
    console.log(`array: ${myLibrary}`);
}
function readBook(id){
    myLibrary.forEach(book => {
        if(book.id === id){
            if(book.read){
                book.read = false;
            } else {
                book.read = true;
            }
        }
    })
}

function cleanRefreshTable(){
    tableDOM.innerHTML = '';
    renderTable();
}

addBookToLibrary("livro1", "author1", 210);
addBookToLibrary("livro2", "author2", 220);
addBookToLibrary("livro3", "author3", 230);
addBookToLibrary("livro4", "author4", 240);

function renderTable(){

    myLibrary.forEach(book => {
        const row = document.createElement("tr");
        const bookProp = Object.getOwnPropertyNames(book);
        bookProp.forEach(prop => {
            const propTD = document.createElement("td");
            propTD.textContent = book[prop];
            row.appendChild(propTD);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Book";
        deleteBtn.dataset.bookId = book.id;
        deleteBtn.addEventListener("click", (e) => {
            const idToDelete = e.target.dataset.bookId;
            deleteBookFromLibrary(idToDelete);
            cleanRefreshTable();
        });
        const deleteCell = document.createElement("td");
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Read";
        editBtn.dataset.bookId = book.id;
        editBtn.addEventListener("click", (e) => {
            const idToEdit = e.target.dataset.bookId;
            readBook(idToEdit);
            console.log(`book readed: ${book.read}`);
            cleanRefreshTable();
        });
        row.appendChild(editBtn);

        tableDOM.appendChild(row);
    });

    bookBtnDOM.addEventListener("click", () => {

        const titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "title");
        titleLabel.textContent = "Book Title:";
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.id = "title";
        titleInput.name = "title";

        const authorLabel = document.createElement("label");
        authorLabel.setAttribute("for", "author");
        authorLabel.textContent = "Book Author:";
        const authorInput = document.createElement("input");
        authorInput.type = "text";
        authorInput.id = "author";
        authorInput.name = "author";

        const pagesLabel = document.createElement("label");
        pagesLabel.setAttribute("for", "pages");
        pagesLabel.textContent = "Pages Number:";
        const pagesInput = document.createElement("input");
        pagesInput.type = "number";
        pagesInput.name = "pages";
        pagesInput.id = "pages";

        const sendBtn = document.createElement("button");
        sendBtn.setAttribute("type", "submit");
        sendBtn.textContent = "Add Book";

        bookForm.append(titleLabel, titleInput, authorLabel, authorInput, pagesLabel, pagesInput, sendBtn);
        containerDOM.appendChild(bookForm);

        bookForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(bookForm);
            const data = Object.fromEntries(formData.entries());
            addBookToLibrary(data.title, data.author, data.pages);
            cleanRefreshTable();
        });
    })

}

renderTable();
