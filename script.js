// checkbox doesnt work
let shouldCheck = 0;
let myLibrary = [];
let newTitle = "";
let newAuthor = "";
let newPages = "";
let newIsRead = "";
let book = "";
let inc = 0;
const container = document.querySelector("#container")
const newBook = document.querySelector("#newbook")
const form = document.querySelector("#form")
const title = document.querySelector("#title")
const author = document.querySelector("#author")
const pages = document.querySelector("#pages")
const read = document.querySelector("#read")
const submit = document.querySelector("#submit")
submit.addEventListener("click", function (){
    newTitle = title.value;
    newAuthor = author.value;
    newPages = pages.value;
    let readRange = document.querySelector("#read")
    if (readRange.value == 1) {
        shouldCheck = 1;
        newIsRead = true;
    }
    else {
        shouldCheck = 0;
        newIsRead = false;
    }
    form.setAttribute("style", "display: none;");
    book = new Book(newTitle, newAuthor, newPages, newIsRead);
    myLibrary.push(book);
    createDisplay(inc);
    let xOut = "#close" + inc;
    let close = document.querySelector(xOut);
    close.addEventListener("click", function(){
       let finalNum = close.getAttribute("id");
       finalNum = finalNum.slice(5);
       console.log(finalNum)
       finalNum = "#div" + finalNum
       let div = document.querySelector(finalNum);
       div.remove();
    }) 
    inc++;
})
    
newBook.addEventListener("click", addBookToLibrary);
function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}

function addBookToLibrary(){
    form.setAttribute("style", "display: block;");
    

}
function createDisplay(i){

    let bookObj = myLibrary[i];
    console.log(bookObj);
    let div = document.createElement("div")
    div.setAttribute("id", "div" + i);
    div.classList.add("book");
    console.log(div.getAttribute("id"));
    let title = document.createElement("h2");
    title.textContent = bookObj.title;
    let author = document.createElement("p");
    author.textContent = "by " + bookObj.author;
    let pages = document.createElement("p");
    pages.textContent = bookObj.pages + " pages";
    let close = document.createElement("button")
    close.textContent = "X";
    let id = "close" + i;
    close.setAttribute("id", id);
    close.classList.add("close")
    
    let read = document.createElement("input");
    read.type = "checkbox";
    read.id = "readb"
    read.classList.add("readbut");
    if (shouldCheck == 1){
        read.checked = true;
    }
    container.appendChild(div);
    div.appendChild(read);
    div.appendChild(close);
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    
}
//addBookToLibrary();
//myLibrary[0] = new Book("hi", "yo", "hello", false);
//myLibrary[1] = new Book("hi", "yo", "hello", false);

