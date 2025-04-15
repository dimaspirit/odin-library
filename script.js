console.log('Hello');

const myLibrary = [];

function Book(title, author, pages) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  
  this.getInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  }
}

function addBookToLibrary(title, author, pages) {
  let book = new Book(title, author, pages);
  myLibrary.push(book);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295);
console.log(myLibrary);