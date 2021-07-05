let shouldCheck = 0;
let myLibrary = [];
let newTitle = "";
let newAuthor = "";
let newPages = "";
let newIsRead = "";
let book = "";
let inc = myLibrary.length;
let test = []
let storage = "";
let username = ""
const container = document.querySelector("#container")
const newBook = document.querySelector("#newbook")
const form = document.querySelector("#form")
const title = document.querySelector("#title")
const author = document.querySelector("#author")
const pages = document.querySelector("#pages")
const read = document.querySelector("#read")
const submit = document.querySelector("#submit")
const yourLibrary = document.querySelector("#head")
const yourStats = document.querySelector("#yourstats")

onStart();
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
    let books = document.querySelectorAll(".book");
    books.forEach(element => {
        element.setAttribute("style", "display: block;")
    });
    let stats = document.querySelector("#stats");
    stats.setAttribute("style", "display:block;");
    book = new Book(newTitle, newAuthor, newPages, newIsRead);
    myLibrary.push(book);
    localStorage.setItem("mylibrary", JSON.stringify(myLibrary));
    createDisplay(inc);
    closeButton(inc);
    check(inc);
    inc++;
})

newBook.addEventListener("click", addBookToLibrary);
yourLibrary.addEventListener("click", askName);
yourStats.addEventListener("click", askName);
function askName(){
    console.log("hi")
    username = prompt("What's your name?");
    localStorage.setItem("name", username)
    yourLibrary.textContent = username +"'s Library"
    yourStats.textContent = username +"'s Stats"

    
}
function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}
function check (inc3){
    let checker = "#check" + inc3;
    let checkBox = document.querySelector(checker);
    checkBox.addEventListener("change", function(){
        if (checkBox.checked){
            myLibrary[inc3].isRead = true;
        }
        else {
            console.log("hi")
            myLibrary[inc3].isRead = false;
        }
        console.log(myLibrary[inc3].isRead);
        stats();
    })
    

}
function closeButton(inc2) {
    let xOut = "#close" + inc2;
    let close = document.querySelector(xOut);
    close.addEventListener("click", function(){
       let finalNum = close.getAttribute("id");
       finalNum = finalNum.slice(5);
       myLibrary.splice(finalNum, 1);
       localStorage.setItem("mylibrary", JSON.stringify(myLibrary));
       console.log(finalNum)
       finalNum = "#div" + finalNum
       let div = document.querySelector(finalNum);
       div.remove();
       inc--;
       stats();
    }) 
}
function addBookToLibrary(){
    form.setAttribute("style", "display: block;");
    let books = document.querySelectorAll(".book");
    books.forEach(element => {
        element.setAttribute("style", "display: none;")
    });
    let stats = document.querySelector("#stats");
    stats.setAttribute("style", "display:none;")
    

}
function createDisplay(i){
    let bookObj = myLibrary[i];
    let div = document.createElement("div")
    div.setAttribute("id", "div" + i);
    div.classList.add("book");
    div.setAttribute("style", "display: grid;")
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
    read.setAttribute("id", "check" + i);
    read.classList.add("readb");
    read.classList.add("readbut");
    if (bookObj.isRead == true){
        read.checked = true;
    }
    stats();
    container.appendChild(div);
    div.appendChild(read);
    div.appendChild(close);
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    closeButton(i);

}
function onStart(){
    storage = JSON.parse(localStorage.getItem("mylibrary"));
    if ( storage != null){
        myLibrary = storage;
        inc = myLibrary.length;
        for (let i = 0; i < storage.length; i++){
            createDisplay(i);
        }
    }
    let user = localStorage.getItem("name");
    if (user != null){
        yourLibrary.textContent = user + "'s Library"
        yourStats.textContent = user + "'s Stats"
    }
    
}
function totPagesRead(){
    let pagesRead = 0;
    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].isRead == true){
            console.log("hi");
            pagesRead += Number(myLibrary[i].pages);
        }
    }
    let pagesReadHtml = document.querySelector("#pagesread");
    pagesReadHtml.textContent = "Total pages read: " + pagesRead;
}
function booksRead(){
    let counter = 0
    for (let i = 0; i< myLibrary.length; i++){
        if (myLibrary[i].isRead == true){
            counter ++;
        }
    }
    let booksReadHtml = document.querySelector("#booksread");
    booksReadHtml.textContent = "Total books read: " + counter;

}
function booksNotRead(){
    let counter = 0
    for (let i = 0; i< myLibrary.length; i++){
        if (myLibrary[i].isRead != true){
            counter ++;
        }
    }
    let booksNotReadHtml = document.querySelector("#booksnotread");
    booksNotReadHtml.textContent = "Total books left to read: " + counter;

}
function totalBooks (){
    let totalBooksHtml = document.querySelector("#totalbooks");
    totalBooksHtml.textContent = "Total books in library: " + myLibrary.length;
}
function favoriteAuthor (){
    let increment = 0;
    let max = 0;
    let index = 0;
    for (let j = 0; j < myLibrary.length; j++){
        let currAuthor = myLibrary[j].author;
        for (let i = 0; i <myLibrary.length; i++){
            if (myLibrary[i].author == currAuthor){
                increment++;
            }
        }
        if (increment > max){
            max = increment;
            index = j;
        }
        increment = 0;
    }
    favAuthorHtml = document.querySelector("#favauthor");
    favAuthorHtml.textContent = "Your favorite author is: " + myLibrary[index].author;
    
}
function stats(){
    totPagesRead();
    booksRead();
    booksNotRead();
    totalBooks();
    favoriteAuthor();
}
