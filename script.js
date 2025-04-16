console.log('Hello');

const listNode = document.querySelector('.list');

const openModalBtnNode = document.querySelector('#open-modal');
const modalAddBookNode = document.querySelector('.modal-add-book');

const formConfirm = document.querySelector('.form-add-confirm');
const formCancel = document.querySelector('.form-add-cancel');

const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');

let myLibrary = [];

openModalBtnNode.addEventListener('click', function() {
  modalAddBookNode.showModal();
});

formConfirm.addEventListener('click', function(event) {
  event.preventDefault();
  modalAddBookNode.close('submit');
});

modalAddBookNode.addEventListener('close', function() {
  const title = formTitle.value.trim();
  const author = formAuthor.value.trim();
  const pages = +formPages.value;

  if(modalAddBookNode.returnValue === 'submit' &&
     title !== '' && author !== '' && !isNaN(pages)) {
    addBookToLibrary(title, author, pages, false);
    renderLibrary(listNode, myLibrary);
  }
});


function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  
  this.getInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  }

  this.toogleRead = function() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function removeBook(event) {
  const bookNode = event.target.closest('.book');
  const bookId = bookNode.dataset.id;
  
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  renderLibrary(listNode, myLibrary);
}

function handleToogleRead(book) {
  book.toogleRead();
  renderLibrary(listNode, myLibrary);
}

function createBookNode(book) {
  const bookNode = document.createElement('div');
  const bookTitleNode = document.createElement('h4');
  const bookInfoNode = document.createElement('p');
  const actionsNode = document.createElement('div');
  const bookRemoveBtnNode = document.createElement('button');
  const bookReadStatusNode = document.createElement('button');

  bookNode.dataset.id = book.id;
  bookNode.classList.add('book');
  bookTitleNode.textContent = book.title;
  bookInfoNode.textContent = book.getInfo();
  actionsNode.classList.add('book-actions');
  bookRemoveBtnNode.textContent = 'Remove';
  bookRemoveBtnNode.addEventListener('click', removeBook);
  bookReadStatusNode.textContent = book.read ? 'Mark as not read' : 'Mark as read';
  bookReadStatusNode.addEventListener('click', () => handleToogleRead(book));

  actionsNode.appendChild(bookRemoveBtnNode);
  actionsNode.appendChild(bookReadStatusNode);

  bookNode.appendChild(bookTitleNode);
  bookNode.appendChild(bookInfoNode);
  bookNode.appendChild(actionsNode);

  return bookNode;
}

function renderLibrary(container, books) {
  // Clean up before render
  while (container.firstChild) {
    container.firstChild.remove();
  }

  books.forEach(book => {
    const bookNode = createBookNode(book);
  
    container.appendChild(bookNode);
  });
}

// Fill library with 2 default books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);
addBookToLibrary('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 309, true);
console.log('myLibrary', myLibrary)
renderLibrary(listNode, myLibrary);
