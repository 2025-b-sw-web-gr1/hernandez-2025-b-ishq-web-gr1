# 📚 Book Tracker
Sistema de seguimiento de lectura con integración a Google Books API, múltiples vistas, métricas de lectura y lector EPUB integrado.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. **Clona el repositorio o navega a la carpeta del proyecto:**
   ```bash
   cd Clase07
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor:**
   ```bash
   npm start
   ```
   
   O para desarrollo con auto-reload:
   ```bash
   npm run dev
   ```

4. **Abre tu navegador en:**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
Clase07/
├── public/
│   ├── css/
│   │   └── style.css          # Estilos globales (dark theme)
│   └── js/
│       └── main.js             # JavaScript del cliente
├── uploads/                    # Archivos EPUB subidos
├── views/
│   ├── layouts/
│   │   └── main.handlebars    # Layout principal con sidebar
│   ├── 404.handlebars         # Página de error
│   ├── home.handlebars        # Biblioteca (Board/Gallery/Table)
│   ├── search.handlebars      # Búsqueda Google Books
│   ├── book-details.handlebars # Detalles y métricas
│   └── epub-reader.handlebars  # Lector EPUB
├── package.json
└── server.js                   # Servidor Express + Handlebars
```

## 🎯 Características Principales

### 1. Búsqueda de Libros
- Integración con **Google Books API**
- Búsqueda en tiempo real
- Información completa: título, autor, portada, descripción, páginas, categorías

### 2. Organización de Biblioteca

**Tres vistas diferentes:**
- 📊 **Board**: Vista Kanban con columnas por estado
- 🖼️ **Gallery**: Vista de galería con tarjetas
- 📋 **Table**: Vista de tabla con todos los datos

**Estados de lectura:**
- 📖 Leyendo
- 📚 Por Leer
- ✅ Completado
- ❌ Abandonado

### 3. Seguimiento de Lectura

**Métricas incluidas:**
- Páginas leídas y progreso porcentual
- Tiempo total de lectura
- Fecha de inicio y finalización
- Palabras totales y por página
- Número de capítulos
- Tiempo estimado de lectura
- Géneros literarios

**Sesiones de lectura:**
- Registro manual de sesiones
- Historial completo de lecturas
- Duración y páginas por sesión


## 🛠️ Tecnologías

### Backend
- **Node.js** + **Express 4.18.2**
- **Handlebars 7.1.2** (motor de plantillas)
- **Multer 1.4.5** (carga de archivos)
- **Axios 1.6.2** (HTTP client)

### Frontend
- **ePub.js** (renderizado de EPUB)
- **Vanilla JavaScript**
- **CSS3** (Grid, Flexbox, Variables)

### APIs
- **Google Books API v1**

## 🎨 Tema Oscuro

La aplicación usa un esquema de colores oscuro:

```css
--bg-primary: #191919      /* Fondo principal */
--bg-secondary: #202020    /* Fondo secundario */
--bg-tertiary: #2a2a2a     /* Fondo terciario */
--text-primary: #ffffff    /* Texto principal */
--accent-blue: #3b82f6     /* Acentos azules */
--accent-green: #10b981    /* Acentos verdes */
--accent-yellow: #f59e0b   /* Ratings */
```

## 🔧 Helpers de Handlebars

El proyecto incluye 8 helpers personalizados:

1. **eq(a, b)**: Compara dos valores (retorna boolean)
2. **ifEq(a, b)**: Bloque condicional de comparación
3. **formatDate(date)**: Formatea fechas a formato español
4. **truncate(text, length)**: Limita texto a cierta longitud
5. **stars(rating)**: Genera estrellas ⭐ según rating
6. **daysBetween(date1, date2)**: Calcula días entre fechas
7. **estimatedReadingTime(pages)**: Estima tiempo de lectura
8. **formatDuration(minutes)**: Formatea minutos a horas y minutos

## 📡 API Endpoints

### Libros
- `GET /` - Página principal (con filtros opcionales)
- `GET /search` - Página de búsqueda
- `GET /api/search?q=query` - Buscar en Google Books
- `POST /api/books` - Agregar libro
- `GET /book/:id` - Ver detalles del libro
- `POST /book/:id/update` - Actualizar libro
- `POST /book/:id/delete` - Eliminar libro

### Sesiones y Métricas
- `POST /book/:id/add-session` - Agregar sesión de lectura
- `GET /book/:id/stats` - Obtener estadísticas

### EPUB
- `POST /book/:id/upload-epub` - Subir archivo EPUB
- `GET /book/:id/reader` - Abrir lector EPUB
- `POST /book/:id/update-progress` - Actualizar progreso de lectura

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Verifica que no haya otro proceso usando el puerto 3000
Get-Process -Name node | Stop-Process -Force

# Reinicia el servidor
npm start
```

### Errores al instalar dependencias

```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Las vistas no se actualizan

- Handlebars no tiene hot-reload por defecto
- Reinicia el servidor después de cambios en las vistas
- Usa `npm run dev` con nodemon para auto-reload

### Archivos EPUB no se cargan

- Verifica que la carpeta `uploads/` exista
- Asegúrate de que el archivo sea `.epub` válido
- Revisa los permisos de escritura en la carpeta

## 📝 Notas de Desarrollo

### Almacenamiento
- Actualmente usa arrays en memoria (se pierden datos al reiniciar)
- Para producción, implementar MongoDB o PostgreSQL

### Seguridad
- Los archivos EPUB se almacenan sin validación profunda
- Implementar límites de tamaño de archivo
- Agregar autenticación de usuarios

### Mejoras Futuras
- [ ] Integración real con Spotify API
- [ ] Base de datos persistente
- [ ] Autenticación de usuarios
- [ ] Exportar/importar biblioteca
- [ ] Gráficos de estadísticas de lectura
- [ ] Recomendaciones de libros
- [ ] Modo de lectura compartidaS

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.
