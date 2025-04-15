console.log('Hello');

const listNode = document.querySelector('.list');
const myLibrary = [];

function Book(title, author, pages, year) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.publishYear = 
  
  this.getInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  }
}

function addBookToLibrary(title, author, pages) {
  let book = new Book(title, author, pages);
  myLibrary.push(book);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, 1937);
addBookToLibrary('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 309, 1997);

function createBookNode(book) {
  const bookNode = document.createElement('div');
  const bookTitleNode = document.createElement('h4');
  const bookInfoNode = document.createElement('p');

  bookNode.dataset.id = book.id;
  bookNode.classList.add('book');
  bookTitleNode.textContent = book.title;
  bookInfoNode.textContent = book.getInfo();

  bookNode.appendChild(bookTitleNode);
  bookNode.appendChild(bookInfoNode);

  return bookNode;
}

myLibrary.forEach(book => {
  const bookNode = createBookNode(book);

  listNode.appendChild(bookNode);
});