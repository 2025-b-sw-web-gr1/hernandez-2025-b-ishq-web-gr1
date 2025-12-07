// ========================================
// ALMACENAMIENTO DE DATOS
// ========================================
class BookStorage {
    static STORAGE_KEY = 'book-tracker-books';

    static getBooks() {
        const books = localStorage.getItem(this.STORAGE_KEY);
        return books ? JSON.parse(books) : [];
    }

    static saveBooks(books) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
    }

    static addBook(book) {
        const books = this.getBooks();
        books.push(book);
        this.saveBooks(books);
    }

    static deleteBook(id) {
        const books = this.getBooks();
        const filteredBooks = books.filter(book => book.id !== id);
        this.saveBooks(filteredBooks);
    }
}

// ========================================
// CLASE LIBRO
// ========================================
class Book {
    constructor(title, author, genre, pages, year, status, rating) {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = parseInt(pages);
        this.year = parseInt(year);
        this.status = status;
        this.rating = parseInt(rating);
        this.dateAdded = new Date().toISOString();
    }
}

// ========================================
// INTERFAZ DE USUARIO
// ========================================
class BookUI {
    static displayBooks(filter = 'all') {
        const booksContainer = document.getElementById('books-container');
        const books = BookStorage.getBooks();
        
        booksContainer.innerHTML = '';

        let filteredBooks = books;
        
        if (filter === 'leyendo') {
            filteredBooks = books.filter(book => book.status === 'leyendo');
        } else if (filter === 'por-leer') {
            filteredBooks = books.filter(book => book.status === 'por-leer');
        } else if (filter === 'leído') {
            filteredBooks = books.filter(book => book.status === 'leído');
        } else if (filter === 'favorites') {
            filteredBooks = books.filter(book => book.rating >= 4);
        }

        if (filteredBooks.length === 0) {
            booksContainer.innerHTML = `
                <p style="grid-column: 1/-1; text-align: center; color: #9b9b9b; padding: 3rem;">
                    No books to show. Add your first book! 📚
                </p>
            `;
            return;
        }

        filteredBooks.forEach(book => {
            const bookCard = document.createElement('article');
            bookCard.className = 'book-card';
            
            // Generar un color de fondo aleatorio para la portada
            const coverColors = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
            ];
            const randomColor = coverColors[Math.floor(Math.random() * coverColors.length)];
            
            // Calcular progreso (simulado basado en el rating)
            const progress = book.status === 'leído' ? 100 : 
                            book.status === 'leyendo' ? (book.rating * 20) : 0;
            
            bookCard.innerHTML = `
                <div class="book-cover" style="background: ${randomColor}">
                    <span class="book-cover-placeholder"></span>
                </div>
                <div class="book-info">
                    <h3 class="book-title">${this.escapeHtml(book.title)}</h3>
                    <p class="book-author">${this.escapeHtml(book.author)}</p>
                    
                    ${book.status === 'leyendo' || book.status === 'leído' ? `
                        <div class="book-progress">
                            <div class="progress-label">
                                <span>${progress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="book-actions">
                    <button class="btn-delete" data-id="${book.id}">Delete</button>
                </div>
            `;
            booksContainer.appendChild(bookCard);
        });
    }

    static showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${type === 'success' ? '#C9A961' : '#d00'};
            color: white;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-weight: 500;
            font-size: 0.95rem;
            animation: slideIn 0.3s ease;
            font-family: 'Inter', sans-serif;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }

    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ========================================
// EVENTOS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Cargar libros al iniciar
    BookUI.displayBooks();

    // Toggle mostrar/ocultar formulario
    const showAddFormBtn = document.getElementById('show-add-form');
    const addBookForm = document.getElementById('add-book-form');
    const cancelAddBtn = document.getElementById('cancel-add');

    showAddFormBtn.addEventListener('click', () => {
        addBookForm.classList.toggle('hidden');
        showAddFormBtn.textContent = addBookForm.classList.contains('hidden') 
            ? 'Add Book' 
            : 'Cancel';
    });

    cancelAddBtn.addEventListener('click', () => {
        addBookForm.classList.add('hidden');
        showAddFormBtn.textContent = 'Add Book';
        bookForm.reset();
        ratingValue.textContent = '3';
    });

    // Formulario de agregar libro
    const bookForm = document.getElementById('book-form');
    const ratingInput = document.getElementById('rating');
    const ratingValue = document.getElementById('rating-value');

    // Actualizar valor del rating
    ratingInput.addEventListener('input', (e) => {
        ratingValue.textContent = e.target.value;
    });

    // Enviar formulario
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const genre = document.getElementById('genre').value;
        const pages = document.getElementById('pages').value;
        const year = document.getElementById('year').value;
        const status = document.getElementById('status').value;
        const rating = document.getElementById('rating').value;

        // Validaciones
        if (!title || !author) {
            BookUI.showNotification('Title and Author are required', 'error');
            return;
        }

        // Crear y guardar libro
        const book = new Book(title, author, genre, pages, year, status, rating);
        BookStorage.addBook(book);

        // Actualizar UI con filtro activo
        const activeTab = document.querySelector('.filter-tab.active');
        const currentFilter = activeTab ? activeTab.dataset.filter : 'all';
        BookUI.displayBooks(currentFilter);
        BookUI.showNotification('Book added successfully');

        // Resetear y ocultar formulario
        bookForm.reset();
        ratingValue.textContent = '3';
        addBookForm.classList.add('hidden');
        showAddFormBtn.textContent = 'Add Book';
    });

    // Filtros por tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover active de todos los tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Activar el tab clickeado
            tab.classList.add('active');
            // Mostrar libros filtrados
            const filter = tab.dataset.filter;
            BookUI.displayBooks(filter);
        });
    });

    // Delegación de eventos para eliminar libros
    document.getElementById('books-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete') || 
            e.target.parentElement.classList.contains('btn-delete')) {
            
            const button = e.target.classList.contains('btn-delete') 
                ? e.target 
                : e.target.parentElement;
            
            const id = parseFloat(button.dataset.id);
            
            if (confirm('Are you sure you want to delete this book?')) {
                BookStorage.deleteBook(id);
                const activeTab = document.querySelector('.filter-tab.active');
                const currentFilter = activeTab ? activeTab.dataset.filter : 'all';
                BookUI.displayBooks(currentFilter);
                BookUI.showNotification('Book deleted');
            }
        }
    });
});

// Estilos para las animaciones de notificación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
