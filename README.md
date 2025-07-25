Book Library

A simple web app to manage a personal book library. Users can add books with title, author, page count, and read status. Books can be filtered by read/unread status and deleted. The library persists data using localStorage.

Features

Add new books with:

Title

Author

Page count

Read/unread status

Display books in a dynamic table

Filter books by read or unread status (only one filter active at a time)

Delete books with confirmation popup

Data persistence with localStorage so library is saved across browser sessions

Modal tabs for adding books and confirming deletions

Background interaction locked when modals are active to improve user experience

Technologies

HTML, CSS, JavaScript (ES6+)

DOM manipulation and event delegation for performance and maintainability

localStorage for client-side persistence

How to Use

Click Add Book button to open the add book form.

Fill in the book details and click Add to save the book.

Use the Read and Unread filter buttons to view books by their read status.

Click the trash icon next to a book to trigger a confirmation modal for deletion.

Confirm deletion to remove the book from the library and update storage.

The library data is automatically saved in browser localStorage and loaded on page refresh.

Code Structure

Book constructor function to create book objects

myLibrary array stores all book objects

addBookToLibrary() adds a new book and updates UI and storage

renderLibrary() renders the current array of books to the DOM

filterReadBooks() assigns event listeners to filter buttons and manages filter state

Event delegation used on the table body to handle delete button clicks efficiently

Modal toggling functions lock background interaction with CSS pointer-events

Future Improvements

Add editing book details functionality

Improve accessibility and mobile responsiveness

Add sorting options (by title, author, pages)

Implement better UI feedback and animations

Migrate from localStorage to a backend for persistent multi-device syncing

Setup
No build tools needed. Just open the index.html in a modern browser.
