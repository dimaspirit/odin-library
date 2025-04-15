console.log('Hello');

const listNode = document.querySelector('.list');
let myLibrary = [];

function Book(title, author, pages, year) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.publishYear = year;
  
  this.getInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  }
}

function addBookToLibrary(title, author, pages) {
  let book = new Book(title, author, pages);
  myLibrary.push(book);
}

function removeBook(event) {
  const bookNode = event.target.closest('.book');
  const bookId = bookNode.dataset.id;
  
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  renderLibrary(listNode, myLibrary);
}

function createBookNode(book) {
  const bookNode = document.createElement('div');
  const bookTitleNode = document.createElement('h4');
  const bookInfoNode = document.createElement('p');
  const bookRemoveBtnNode = document.createElement('button');

  bookNode.dataset.id = book.id;
  bookNode.classList.add('book');
  bookTitleNode.textContent = book.title;
  bookInfoNode.textContent = book.getInfo();
  bookRemoveBtnNode.textContent = 'Remove';
  bookRemoveBtnNode.addEventListener('click', removeBook);

  bookNode.appendChild(bookTitleNode);
  bookNode.appendChild(bookInfoNode);
  bookNode.appendChild(bookRemoveBtnNode);

  return bookNode;
}

function renderLibrary(container, books) {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  books.forEach(book => {
    const bookNode = createBookNode(book);
  
    container.appendChild(bookNode);
  });
}

// Fill library with 2 default books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, 1937);
addBookToLibrary('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 309, 1997);

renderLibrary(listNode, myLibrary);
