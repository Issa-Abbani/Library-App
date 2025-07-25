const myLibrary = [];
const body = document.querySelector('body');
const addBookBtn = document.querySelector('#add-book-btn');
const addBookTab = document.querySelector('aside');
const closeBookTab = document.querySelector('.exit-form');
const addBookInput = document.querySelectorAll('.form-elem > input');
const deleteBtns = document.querySelectorAll('del-btn-icon');
const exitDelBtn = document.querySelector('.exit-del');
const filterRead = document.getElementById('show-read-btn');
const filterUnread = document.getElementById('show-unread-btn');



//save in JSON form
function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}


//Load JSON data
function loadLibrary() {
  const stored = localStorage.getItem('myLibrary');
  if (stored) {
    const parsed = JSON.parse(stored);
    myLibrary.length = 0;
    parsed.forEach(book => {
      myLibrary.push(new Book(book.bID, book.title, book.author, book.pages, book.read_stat));
    });
  }
}



// Toggling the add book tab
function toggleAddTab(){
  addBookBtn.addEventListener("click", ()=>{
    if(!(addBookTab.classList.contains('active-add'))){
      addBookTab.classList.add('active-add');
      body.classList.add('background-locked');
      addBookInput.forEach(input => input.value = '');
    }
  })

  closeBookTab.addEventListener("click", ()=>{
    if (addBookTab.classList.contains('active-add')) {
      addBookTab.classList.remove('active-add');
      body.classList.remove('background-locked');
      addBookInput.forEach(input => input.value = '');
    }
  })
}

//Delete button setting
function toggleDeleteTab() {
  const tableBody = document.querySelector('main section table tbody');
  const delTab = document.querySelector('.confirm-deletion');
  const confirmDel = document.querySelector('#yes-del');
  let bookToDeleteId = null;

  exitDelBtn.addEventListener("click", ()=>{
      if(delTab.classList.contains('active-del')){
        delTab.classList.remove('active-del');
        body.classList.remove('background-locked');
        bookToDeleteId = null;
      }
  })

  tableBody.addEventListener('click', (e) => {
    const clicked = e.target;

    if (clicked && clicked.id === 'del-btn-icon') {
      const tr = clicked.closest('tr');
      const bookId = tr.querySelector('td').textContent;

      bookToDeleteId = bookId;
      
      
      if(!(delTab.classList.contains('active-del'))){
        delTab.classList.add('active-del');
        body.classList.add('background-locked');
      }

      confirmDel.addEventListener("click", () =>{

        const index = myLibrary.findIndex(book => book.bID === bookToDeleteId);
        if (index > -1) {
          myLibrary.splice(index, 1);
          saveLibrary();
          renderLibrary(myLibrary);
        }

        delTab.classList.remove('active-del');
        body.classList.remove('background-locked');
        bookToDeleteId = null;
      }, {once : true});
    }
  });
}

//toggling the add book button in the add book tab
function addBookButton(){
    document.getElementById('add-book').addEventListener('click', e => {
    e.preventDefault();
    addBookToLibrary();
    });

}

// Book object constructor
function Book(bID, title, author, pages, read_stat) {
  if(!new.target){
    throw Error("Must use new!");
  }
  this.bID = bID,
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read_stat = read_stat
}


//adding book to the myLibrary array and rendering that
function addBookToLibrary() {
  // All input field values
  const title = document.getElementById('book-title').value.trim();
  const author = document.getElementById('book-author').value.trim();
  const pages = parseInt(document.getElementById('book-page').value, 10);
  const read_stat = document.getElementById('book-status').value; 
  const bID = crypto.randomUUID().slice(0,8);

  // Ensure that all required fields are filled
  if (!title || !author || isNaN(pages)) {
    alert('Please fill all required fields.');
    return;
  }

  // Create Book object (assuming your constructor exists)
  const newBook = new Book(bID, title, author, pages, read_stat);
  // Push it to the array
  myLibrary.push(newBook);

  saveLibrary();

  renderLibrary(myLibrary);

}


// rendering the books in the myLibrary array into the page
function renderLibrary(myLib){
    // Update the DOM - add a row to the table body
    const tbody = document.querySelector('main section table tbody');
    tbody.innerHTML = '';


  // iterate over the table array and print it into the DOM
    myLib.forEach(book => {
    const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${book.bID}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read_stat}</td>
        <td class="remove-btn"><img src="Assets/trash.svg" id="del-btn-icon" loading="lazy" alt="remove" /></td>
      `;

      tbody.appendChild(tr);
    });

    // Clear inputs after adding
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-page').value = '';
    document.getElementById('book-status').value = 'read';
}



function filterReadBooks() {
  let activeFilter = null;

  filterRead.addEventListener("click", () => {
    if (activeFilter !== 'read') {
      activeFilter = 'read';
      filterRead.classList.add('active-filter');
      filterUnread.classList.remove('active-filter');
      filterUnread.disabled = true;
      const readBooks = myLibrary.filter(book => book.read_stat === 'read');
      renderLibrary(readBooks);
    } else {
      activeFilter = null;
      filterRead.classList.remove('active-filter');
      filterUnread.disabled = false;
      renderLibrary(myLibrary);
    }
  });

  filterUnread.addEventListener("click", () => {
    if (activeFilter !== 'unread') {
      activeFilter = 'unread';
      filterUnread.classList.add('active-filter');
      filterRead.classList.remove('active-filter');
      filterRead.disabled = true;
      const unreadBooks = myLibrary.filter(book => book.read_stat === 'unread');
      renderLibrary(unreadBooks);
    } else {
      activeFilter = null;
      filterUnread.classList.remove('active-filter');
      filterRead.disabled = false;
      renderLibrary(myLibrary);
    }
  });
}




// Calling functions
loadLibrary();

renderLibrary(myLibrary);

toggleAddTab();

filterReadBooks();


addBookButton();

toggleDeleteTab();
