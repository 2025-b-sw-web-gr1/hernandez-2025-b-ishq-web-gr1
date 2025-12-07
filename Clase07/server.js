const express = require('express');
const { engine } = require('express-handlebars');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configuración de Multer para subir archivos EPUB
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/epub+zip' || file.originalname.endsWith('.epub')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos EPUB'));
        }
    }
});

// Configuración de Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        // Helper para comparar valores (retorna boolean para usar con if)
        eq: function(a, b) {
            return a === b;
        },
        // Helper de bloque para comparaciones
        ifEq: function(a, b, options) {
            if (a === b) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        // Helper para formatear fechas
        formatDate: function(date) {
            if (!date) return 'N/A';
            const d = new Date(date);
            return d.toLocaleDateString('es-ES');
        },
        // Helper para limitar texto
        truncate: function(text, length) {
            if (!text) return '';
            if (text.length <= length) return text;
            return text.substring(0, length) + '...';
        },
        // Helper para generar estrellas de rating
        stars: function(rating) {
            let stars = '';
            for (let i = 0; i < rating; i++) {
                stars += '⭐';
            }
            return stars;
        },
        // Helper para calcular días transcurridos
        daysBetween: function(date1, date2) {
            if (!date1 || !date2) return 0;
            const d1 = new Date(date1);
            const d2 = new Date(date2);
            const diffTime = Math.abs(d2 - d1);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        },
        // Helper para calcular tiempo estimado de lectura
        estimatedReadingTime: function(pageCount, pagesPerDay = 30) {
            if (!pageCount) return 'N/A';
            const days = Math.ceil(pageCount / pagesPerDay);
            if (days === 1) return '1 día';
            if (days < 7) return `${days} días`;
            const weeks = Math.ceil(days / 7);
            return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
        },
        // Helper para formatear duración
        formatDuration: function(minutes) {
            if (!minutes) return '0 min';
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            if (hours === 0) return `${mins} min`;
            return `${hours}h ${mins}m`;
        }
    },
    // Middleware para pasar estadísticas a todas las vistas
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Middleware para pasar estadísticas a todas las vistas
app.use((req, res, next) => {
    res.locals.stats = {
        total: books.length,
        reading: books.filter(b => b.status === 'reading').length,
        toRead: books.filter(b => b.status === 'to-read').length,
        read: books.filter(b => b.status === 'read').length,
        abandoned: books.filter(b => b.status === 'abandoned').length
    };
    next();
});

// Base de datos simulada (en memoria)
let books = [
    {
        id: 1,
        googleId: 'yl4dILkcqm4C',
        title: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        thumbnail: 'http://books.google.com/books/content?id=yl4dILkcqm4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        description: 'Una novela emblemática del realismo mágico que narra la historia de la familia Buendía.',
        publishedDate: '2003',
        pageCount: 417,
        categories: ['Fiction', 'Literary'],
        status: 'read',
        rating: 5,
        notes: 'Obra maestra de la literatura latinoamericana',
        // Nuevos campos de seguimiento
        startDate: '2025-11-01T10:00:00',
        endDate: '2025-11-15T22:30:00',
        currentPage: 417,
        readingProgress: 100,
        readingSessions: [
            { date: '2025-11-01', startPage: 1, endPage: 50, duration: 120 },
            { date: '2025-11-05', startPage: 51, endPage: 150, duration: 180 },
            { date: '2025-11-10', startPage: 151, endPage: 300, duration: 240 },
            { date: '2025-11-15', startPage: 301, endPage: 417, duration: 200 }
        ],
        totalReadingTime: 740, // minutos
        averageWordsPerPage: 250,
        totalWords: 104250,
        genres: ['Realismo Mágico', 'Ficción Literaria', 'Clásico'],
        chapters: 20,
        epubPath: null
    },
    {
        id: 2,
        googleId: 'wrOQLV6xB-wC',
        title: '1984',
        author: 'George Orwell',
        thumbnail: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        description: 'Una novela distópica sobre un futuro totalitario.',
        publishedDate: '1949',
        pageCount: 328,
        categories: ['Fiction', 'Dystopian'],
        status: 'reading',
        rating: 0,
        notes: 'Muy relevante en la actualidad',
        // Nuevos campos de seguimiento
        startDate: '2025-12-01T09:00:00',
        endDate: null,
        currentPage: 120,
        readingProgress: 36.6,
        readingSessions: [
            { date: '2025-12-01', startPage: 1, endPage: 45, duration: 90 },
            { date: '2025-12-03', startPage: 46, endPage: 90, duration: 85 },
            { date: '2025-12-06', startPage: 91, endPage: 120, duration: 60 }
        ],
        totalReadingTime: 235, // minutos
        averageWordsPerPage: 280,
        totalWords: 91840,
        genres: ['Distopía', 'Ciencia Ficción', 'Política'],
        chapters: 23,
        epubPath: null
    }
];
let nextId = 3;

// ==================== RUTAS ====================

// Página principal - Lista de libros
app.get('/', (req, res) => {
    const filter = req.query.status || 'all';
    
    let filteredBooks = books;
    if (filter !== 'all') {
        filteredBooks = books.filter(book => book.status === filter);
    }

    // Contar libros por estado
    const stats = {
        total: books.length,
        reading: books.filter(b => b.status === 'reading').length,
        toRead: books.filter(b => b.status === 'to-read').length,
        read: books.filter(b => b.status === 'read').length,
        abandoned: books.filter(b => b.status === 'abandoned').length
    };

    res.render('home', {
        title: 'Book Tracker',
        books: filteredBooks,
        stats: stats,
        currentFilter: filter,
        layout: 'main',
        helpers: {
            stats: stats
        }
    });
});

// Página de búsqueda
app.get('/search', (req, res) => {
    res.render('search', {
        title: 'Buscar Libros'
    });
});

// API de búsqueda en Google Books
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.json({ error: 'Query is required' });
    }

    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: query,
                maxResults: 20,
                langRestrict: 'es'
            }
        });

        const books = response.data.items?.map(item => ({
            googleId: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.join(', ') || 'Autor desconocido',
            description: item.volumeInfo.description || 'Sin descripción',
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || '/images/no-cover.png',
            publishedDate: item.volumeInfo.publishedDate,
            pageCount: item.volumeInfo.pageCount || 0,
            categories: item.volumeInfo.categories?.join(', ') || 'Sin categoría'
        })) || [];

        res.json({ books });
    } catch (error) {
        console.error('Error al buscar libros:', error.message);
        res.json({ error: 'Error al buscar libros en Google Books' });
    }
});

// Agregar libro desde búsqueda
app.post('/api/books', (req, res) => {
    const { googleId, title, author, thumbnail, description, publishedDate, status, pageCount, categories } = req.body;

    const newBook = {
        id: nextId++,
        googleId,
        title,
        author,
        thumbnail,
        description,
        publishedDate,
        pageCount: pageCount || 0,
        categories: categories ? categories.split(',').map(c => c.trim()) : [],
        status: status || 'to-read',
        rating: 0,
        notes: '',
        addedDate: new Date().toISOString(),
        // Nuevos campos de seguimiento
        startDate: null,
        endDate: null,
        currentPage: 0,
        readingProgress: 0,
        readingSessions: [],
        totalReadingTime: 0,
        averageWordsPerPage: 250,
        totalWords: (pageCount || 0) * 250,
        genres: [],
        chapters: 0,
        epubPath: null
    };

    books.push(newBook);
    res.json({ success: true, book: newBook });
});

// Página de detalles del libro
app.get('/book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).render('404', { title: 'Libro no encontrado' });
    }

    res.render('book-details', {
        title: book.title,
        book: book
    });
});

// Actualizar libro
app.post('/book/:id/update', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).send('Libro no encontrado');
    }

    // Actualizar campos básicos
    book.status = req.body.status || book.status;
    book.rating = parseInt(req.body.rating) || book.rating;
    book.notes = req.body.notes || book.notes;
    
    // Actualizar campos de seguimiento
    if (req.body.startDate) book.startDate = req.body.startDate;
    if (req.body.endDate) book.endDate = req.body.endDate;
    if (req.body.currentPage) {
        book.currentPage = parseInt(req.body.currentPage);
        book.readingProgress = book.pageCount ? (book.currentPage / book.pageCount * 100).toFixed(1) : 0;
    }
    if (req.body.genres) {
        book.genres = req.body.genres.split(',').map(g => g.trim()).filter(g => g);
    }
    if (req.body.chapters) book.chapters = parseInt(req.body.chapters);
    if (req.body.averageWordsPerPage) {
        book.averageWordsPerPage = parseInt(req.body.averageWordsPerPage);
        book.totalWords = book.pageCount * book.averageWordsPerPage;
    }

    res.redirect('/book/' + bookId);
});

// Eliminar libro
app.post('/book/:id/delete', (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(b => b.id !== bookId);
    res.redirect('/');
});

// ==================== NUEVAS RUTAS: SEGUIMIENTO DE LECTURA ====================

// Agregar sesión de lectura
app.post('/book/:id/add-session', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const { startPage, endPage, duration } = req.body;
    
    const session = {
        date: new Date().toISOString().split('T')[0],
        startPage: parseInt(startPage),
        endPage: parseInt(endPage),
        duration: parseInt(duration) // en minutos
    };

    if (!book.readingSessions) book.readingSessions = [];
    book.readingSessions.push(session);
    
    // Actualizar página actual y tiempo total
    book.currentPage = session.endPage;
    book.totalReadingTime = (book.totalReadingTime || 0) + session.duration;
    book.readingProgress = book.pageCount ? (book.currentPage / book.pageCount * 100).toFixed(1) : 0;

    // Si empieza a leer, establecer fecha de inicio
    if (!book.startDate) {
        book.startDate = new Date().toISOString();
    }

    // Si terminó el libro, establecer fecha de fin
    if (book.currentPage >= book.pageCount && book.status !== 'read') {
        book.endDate = new Date().toISOString();
        book.status = 'read';
    }

    res.json({ success: true, book: book });
});

// Obtener estadísticas de lectura
app.get('/book/:id/stats', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const stats = {
        totalPages: book.pageCount,
        currentPage: book.currentPage,
        pagesLeft: book.pageCount - book.currentPage,
        progress: book.readingProgress,
        totalReadingTime: book.totalReadingTime,
        totalSessions: book.readingSessions?.length || 0,
        averageSessionDuration: book.readingSessions?.length > 0 
            ? Math.round(book.totalReadingTime / book.readingSessions.length) 
            : 0,
        estimatedTimeLeft: book.pageCount && book.currentPage > 0 
            ? Math.round((book.pageCount - book.currentPage) * (book.totalReadingTime / book.currentPage))
            : 0,
        daysReading: book.startDate && book.endDate 
            ? Math.ceil((new Date(book.endDate) - new Date(book.startDate)) / (1000 * 60 * 60 * 24))
            : book.startDate 
                ? Math.ceil((new Date() - new Date(book.startDate)) / (1000 * 60 * 60 * 24))
                : 0,
        wordsRead: book.currentPage * book.averageWordsPerPage,
        wordsLeft: (book.pageCount - book.currentPage) * book.averageWordsPerPage
    };

    res.json(stats);
});

// Subir EPUB
app.post('/book/:id/upload-epub', upload.single('epub'), (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).send('Libro no encontrado');
    }

    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    book.epubPath = req.file.path;
    res.redirect('/book/' + bookId + '/reader');
});

// Lector de EPUB
app.get('/book/:id/reader', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).render('404', { title: 'Libro no encontrado' });
    }

    res.render('epub-reader', {
        title: `Leer: ${book.title}`,
        book: book
    });
});

// API para actualizar progreso de lectura en tiempo real
app.post('/book/:id/update-progress', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const { currentPage, timeSpent } = req.body;
    
    if (currentPage !== undefined) {
        book.currentPage = parseInt(currentPage);
        book.readingProgress = book.pageCount ? (book.currentPage / book.pageCount * 100).toFixed(1) : 0;
    }

    if (timeSpent !== undefined) {
        book.totalReadingTime = (book.totalReadingTime || 0) + parseInt(timeSpent);
    }

    res.json({ success: true, progress: book.readingProgress });
});

// Página 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✨ Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📚 Book Tracker con Handlebars`);
});
