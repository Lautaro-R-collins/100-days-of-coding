// Definir la clase Libros
class Libros {
constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Método para obtener información del libro
info() {
    let estadoLectura = this.read ? "leído" : "no leído";
    return `El título del libro es "${this.title}", su autor es ${this.author}, tiene ${this.pages} páginas, y el estado de lectura es ${estadoLectura}.`;
}
}

// Definir la clase Library
class Library {
constructor() {
    this.books = []; // Array para almacenar libros
}

// Método para agregar un libro a la biblioteca
addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
    this.books.push(newBook);
    this.updateBooksGrid();
    } else {
    console.log("El libro ya está en la biblioteca");
    }
}

// Método para eliminar un libro
removeBook(title) {
    this.books = this.books.filter(book => book.title !== title);
    this.updateBooksGrid(); 
}

// Verificar si un libro ya está en la biblioteca
isInLibrary(newBook) {
    return this.books.some(book => book.title === newBook.title);
}

// Actualizar la interfaz (libros en la grilla)
updateBooksGrid() {
    const booksGrid = document.getElementById('booksGrid');
    booksGrid.innerHTML = ''; // Limpiar el contenido actual

    this.books.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Autor: ${book.author}</p>
        <p>Páginas: ${book.pages}</p>
        <p>${book.read ? 'Leído' : 'No leído'}</p>
        <button class="btn-remove">Eliminar</button>
    `;

    // Evento para eliminar el libro
    bookCard.querySelector('.btn-remove').addEventListener('click', () => {
        this.removeBook(book.title);
    });

    booksGrid.appendChild(bookCard);
    });
}
}

// Crear una instancia de la clase Library
const library = new Library();

// Mostrar el formulario
const addBookBtn = document.getElementById('addBookBtn');
const bookModal = document.getElementById('bookModal');
const closeModal = document.getElementById('closeModal');
const bookForm = document.getElementById('bookForm');

// Mostrar el modal al hacer clic en "Agregar Libro"
addBookBtn.addEventListener('click', () => {
bookModal.style.display = 'flex';
});

// Cerrar el modal
closeModal.addEventListener('click', () => {
bookModal.style.display = 'none';
});

// Manejar el envío del formulario
bookForm.addEventListener('submit', (e) => {
e.preventDefault(); // Evitar que se recargue la página

// Capturar los valores del formulario
const title = document.getElementById('title').value;
const author = document.getElementById('author').value;
const pages = document.getElementById('pages').value;
const read = document.getElementById('read').checked;

// Crear un nuevo objeto de tipo Libros
const newBook = new Libros(title, author, pages, read);

// Agregar el libro a la biblioteca
library.addBook(newBook);

// Limpiar el formulario y cerrar el modal
bookForm.reset();
bookModal.style.display = 'none';
});
  