# 📚 Library Management Web App

A JavaScript-powered book library manager with features for adding, viewing, filtering, and deleting books — all persisted using `localStorage`.



## 🧠 Project Design & Behavior

This app allows the user to store and manipulate book data using JavaScript objects stored in an array. Here’s how everything works under the hood:



## 📦 Data Model: Book Object

The core data structure is an object-based representation of a book. Each book has:

- A unique `bID`
- Title
- Author
- Number of pages
- Read status

### 📄 Constructor Function

```js
function Book(bID, title, author, pages, read_stat) {
  this.bID = bID;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read_stat = read_stat;
}
````

The ID is generated using:

```js
crypto.randomUUID();
```

So every new book has a unique ID even across page reloads.



## 🗂 Library Array

All books are stored inside a single array:

```js
let myLibrary = [];
```

When the page loads, `myLibrary` is populated from `localStorage` if it exists.



## 🧱 Adding Books to the DOM

Books are rendered into a table dynamically using `renderLibrary()`, which by default uses `myLibrary` unless a filtered array is passed.

```js
function renderLibrary(filteredLibrary = myLibrary) {
  const tbody = document.querySelector("main section table tbody");
  tbody.innerHTML = "";

  filteredLibrary.forEach((book) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${book.bID}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read_stat}</td>
      <td class="remove-btn"><img src="Assets/trash.svg" id="del-btn-icon" alt="remove" /></td>
    `;
    tbody.appendChild(tr);
  });

  // Reset form
  document.getElementById("book-title").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-page").value = "";
  document.getElementById("book-status").value = "read";
}
```



## ➕ Adding a Book

The user opens a modal form via the “Add Book” button.
The modal is just a form overlay that disables interaction with the background via a `background-locked` class.

When submitted:

* A new `Book` object is created.
* It's added to `myLibrary`.
* `localStorage` is updated.
* The DOM is re-rendered.



## 🧼 Modal Behavior

Modals (Add Book & Confirm Deletion) both:

* Lock background clicks using `.background-locked` (applied to `main`, `aside`, `section`)
* Can be closed with an “X” or action buttons
* Use `display: none` toggling to show/hide

```js
main.classList.add("background-locked");
aside.classList.add("background-locked");
section.classList.add("background-locked");
```

```js
main.classList.remove("background-locked");
aside.classList.remove("background-locked");
section.classList.remove("background-locked");
```


## 🗑 Deleting a Book

Delete buttons are `<img>` elements in each row.
They're added dynamically, so **event delegation** is used:

```js
main.addEventListener("click", (e) => {
  if (e.target && e.target.id === "del-btn-icon") {
    const bookID = e.target.parentElement.parentElement.firstElementChild.innerText;
    const book = myLibrary.find(b => b.bID == bookID);

    deletionTarget = book;
    deletePopup.style.display = "block";
    // lock background
  }
});
```

### 🧯 Confirming Deletion

```js
confirmDelBtn.addEventListener("click", () => {
  const index = myLibrary.indexOf(deletionTarget);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    localStorage.setItem("library", JSON.stringify(myLibrary));
    renderLibrary();
  }

  deletePopup.style.display = "none";
  // unlock background
});
```


## 🔍 Filtering Books

There are two filter buttons: `Read` and `Unread`.
Only one filter can be active at a time.

```js
function filterReadBooks() {
  let isFilterActive = false;

  filterRead.addEventListener("click", () => {
    if (!isFilterActive) {
      filterRead.classList.add("active-filter");
      filterUnread.classList.remove("active-filter");
      const readBooks = myLibrary.filter(book => book.read_stat == "read");
      renderLibrary(readBooks);
      isFilterActive = true;
    } else {
      filterRead.classList.remove("active-filter");
      renderLibrary(myLibrary);
      isFilterActive = false;
    }
  });

  filterUnread.addEventListener("click", () => {
    if (!isFilterActive) {
      filterUnread.classList.add("active-filter");
      filterRead.classList.remove("active-filter");
      const unreadBooks = myLibrary.filter(book => book.read_stat == "unread");
      renderLibrary(unreadBooks);
      isFilterActive = true;
    } else {
      filterUnread.classList.remove("active-filter");
      renderLibrary(myLibrary);
      isFilterActive = false;
    }
  });
}
```

* `active-filter` is just a CSS class that changes the button appearance.
* When switching between filters, the previous one is deactivated.


## 💾 Local Storage Integration

The library state is preserved using `localStorage`.

### Saving:

```js
localStorage.setItem("library", JSON.stringify(myLibrary));
```

### Loading on Page Load:

```js
window.onload = function () {
  const storedLibrary = localStorage.getItem("library");
  if (storedLibrary) {
    myLibrary = JSON.parse(storedLibrary);
    renderLibrary();
  }
};
```

## 🧠 Reasoning Behind Design

### Why Object-Based Design?

Using an object-based approach makes filtering, mapping, and rendering more intuitive and scalable than working with nested arrays.


```js
[
  ["Title1", "Author1", 123, "read"],
  ["Title2", "Author2", 456, "unread"]
]
```

This approach makes filtering much harder and less expressive. By switching to an object model:

```js
{ title: "Title1", author: "Author1", pages: 123, read_stat: "read" }
```

You can easily use `.filter()`, `.map()`, and `.find()` on the array of books.






