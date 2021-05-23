var label = document.querySelectorAll('.form label');
 
var input = document.querySelectorAll('input');

input.forEach(function(value){
    // console.log(value.innerHTML);
    value.addEventListener('focus', function() {

        var myid = value.getAttribute('id')
        label.forEach(function(lvalue){
            if(lvalue.getAttribute('for') == myid){
                lvalue.setAttribute('class', 'nopos')
            }
        })
        
    })
})

//Book Class: Represents a Book

class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}



// UI Class: Handle UI Tasks

class UI{
    static displayBooks(){

        const Books = Store.getBooks();

        Books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, classStatus){
        const div = document.querySelector('.alert');
        div.className = `alert ${classStatus}`;
        div.innerHTML = `${message}`;

        setTimeout(() =>{
            document.querySelector('.alert').innerHTML = '';
            document.querySelector('.alert').setAttribute('class', 'alert');
        }, 3000)
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#ISBN').value = '';
    }
}

// Store Class: Handles Storage

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) =>{

    //prevent default
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#ISBN').value;

    //validate
    if(title === '' || author === '' || isbn === ''){

        //Showing Alert
        UI.showAlert('*Please fill in all fields', 'danger')

    }else{

        //Istantiate book
        const book = new Book(title, author, isbn);

        //add book to UI
        UI.addBookToList(book);

        //add Book to Store
        Store.addBook(book);

        //Showing Alert
        UI.showAlert('Book Added', 'success')

        //CLearing Fields
        UI.clearFields();

    }
})
// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) =>{
    UI.deleteBook(e.target);

    //Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show Success
    UI.showAlert('Book Deleted', 'success')
})








