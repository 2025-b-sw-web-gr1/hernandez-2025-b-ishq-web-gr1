#  Clase 008 - Taller Bruno API Testing

## Descripción

Este taller utiliza **Bruno** (https://www.usebruno.com/) para probar todos los endpoints de la API pública **JSONPlaceholder** (https://jsonplaceholder.typicode.com/).

Bruno es una herramienta moderna de testing de APIs, similar a Postman, pero que almacena las colecciones en archivos `.bru` directamente en tu repositorio Git.

## Instalación de Bruno

### Opción 1: Descargar desde el sitio web
1. Ve a https://www.usebruno.com/
2. Descarga la versión para Windows
3. Instala el programa

### Opción 2: Usando winget (Windows)
```powershell
winget install Bruno.Bruno
```

### Opción 3: Usando Chocolatey (Windows)
```powershell
choco install bruno
```

##  Estructura del Proyecto

```
Clase-008/
├── bruno.json                    # Configuración de la colección
├── README.md                     # Este archivo
│
├── Posts (6 peticiones)
│   ├── get-all-posts.bru         # GET /posts
│   ├── get-post-by-id.bru        # GET /posts/1
│   ├── create-post.bru           # POST /posts
│   ├── update-post-put.bru       # PUT /posts/1
│   ├── update-post-title.bru     # PATCH /posts/1
│   └── delete-post.bru           # DELETE /posts/1
│
├── Comments (3 peticiones)
│   ├── get-all-comments.bru      # GET /comments
│   ├── get-comments-by-post.bru  # GET /comments?postId=1
│   └── create-comment.bru        # POST /comments
│
├── Albums (3 peticiones)
│   ├── get-all-albums.bru        # GET /albums
│   ├── get-album-by-id.bru       # GET /albums/1
│   └── create-album.bru          # POST /albums
│
├── Photos (2 peticiones)
│   ├── get-all-photos.bru        # GET /photos
│   └── get-photos-by-album.bru   # GET /photos?albumId=1
│
├── Todos (3 peticiones)
│   ├── get-all-todos.bru         # GET /todos
│   ├── get-todo-by-id.bru        # GET /todos/1
│   └── create-todo.bru           # POST /todos
│
└── Users (2 peticiones)
    ├── get-all-users.bru         # GET /users
    └── get-user-by-id.bru        # GET /users/1
```

**Total: 19 peticiones**

## Cómo usar este taller

### 1. Abrir la colección en Bruno

1. Abre **Bruno**
2. Haz clic en **"Open Collection"**
3. Navega a la carpeta `Clase-008` de este repositorio
4. Selecciona la carpeta completa

Bruno detectará automáticamente todos los archivos `.bru` y el archivo `bruno.json`.

### 2. Ejecutar las peticiones

Para cada archivo `.bru`:

1. Haz clic en el nombre de la petición en el panel izquierdo
2. Verás:
   - **Método HTTP** (GET, POST, PUT, PATCH, DELETE)
   - **URL** del endpoint
   - **Headers** (si aplica)
   - **Body** con el JSON de prueba (si aplica)
3. Haz clic en el botón **"Send"** o presiona `Ctrl+Enter`
4. Observa la respuesta:
   - **Status Code** (200, 201, 404, etc.)
   - **Response Time** (tiempo de respuesta)
   - **Response Body** (datos JSON devueltos)
   - **Response Headers**

### 3. Qué observar en cada petición

#### GET Requests (Obtener datos)
- ✅ **Status Code esperado**: `200 OK`
- ✅ **Response**: Array de objetos o un objeto único
- 📝 **Nota**: Los GET no modifican datos

**Ejemplo con `get-all-posts.bru`:**
```
Status: 200 OK
Response: Array con 100 posts
```

#### POST Requests (Crear datos)
- ✅ **Status Code esperado**: `201 Created`
- ✅ **Response**: El objeto creado con un `id` asignado
- 📝 **Nota**: JSONPlaceholder simula la creación (no persiste realmente)

**Ejemplo con `create-post.bru`:**
```json
{
  "title": "foo",
  "body": "bar",
  "userId": 1,
  "id": 101
}
```

#### PUT Requests (Actualizar completo)
- ✅ **Status Code esperado**: `200 OK`
- ✅ **Response**: El objeto completo actualizado
- 📝 **Nota**: Reemplaza TODO el recurso

**Ejemplo con `update-post-put.bru`:**
```json
{
  "id": 1,
  "title": "foo",
  "body": "bar",
  "userId": 1
}
```

#### PATCH Requests (Actualizar parcial)
- ✅ **Status Code esperado**: `200 OK`
- ✅ **Response**: El objeto con solo los campos actualizados
- 📝 **Nota**: Solo modifica los campos enviados

**Ejemplo con `update-post-title.bru`:**
```json
{
  "userId": 1,
  "id": 1,
  "title": "updated title",  // ← Solo este campo cambió
  "body": "quia et suscipit..."
}
```

#### DELETE Requests (Eliminar)
- ✅ **Status Code esperado**: `200 OK`
- ✅ **Response**: Objeto vacío `{}`
- 📝 **Nota**: Simula la eliminación

### 4. Entender los Query Parameters

Algunas peticiones usan **query parameters** en la URL:

**Ejemplo:** `get-comments-by-post.bru`
```
URL: https://jsonplaceholder.typicode.com/comments?postId=1
                                                    ↑
                                            Query Parameter
```

Esto filtra los comentarios que pertenecen al post con ID 1.

**Prueba modificar el valor:**
- `?postId=2` → Comentarios del post 2
- `?postId=3` → Comentarios del post 3

## 📊 Tabla de Métodos HTTP

| Método | Acción | Idempotente* | Códigos comunes |
|--------|--------|--------------|-----------------|
| **GET** | Obtener datos | ✅ Sí | 200, 404 |
| **POST** | Crear recurso | ❌ No | 201, 400 |
| **PUT** | Actualizar completo | ✅ Sí | 200, 404 |
| **PATCH** | Actualizar parcial | ❌ No | 200, 404 |
| **DELETE** | Eliminar recurso | ✅ Sí | 200, 204, 404 |

*Idempotente = Ejecutar la petición múltiples veces produce el mismo resultado


## ✅ Lista de Verificación del Taller

Marca cada petición después de probarla exitosamente:

### Posts
- [✅] GET all posts (200 OK)
- [✅] GET post by ID (200 OK)
- [✅] POST create post (201 Created)
- [✅] PUT update post (200 OK)
- [✅] PATCH update title (200 OK)
- [✅] DELETE post (200 OK)

### Comments
- [✅] GET all comments (200 OK)
- [✅] GET comments by post (200 OK)
- [✅] POST create comment (201 Created)

### Albums
- [✅] GET all albums (200 OK)
- [✅] GET album by ID (200 OK)
- [✅] POST create album (201 Created)

### Photos
- [✅] GET all photos (200 OK)
- [✅] GET photos by album (200 OK)

### Todos
- [✅] GET all todos (200 OK)
- [✅] GET todo by ID (200 OK)
- [✅] POST create todo (201 Created)

### Users
- [✅] GET all users (200 OK)
- [✅] GET user by ID (200 OK)




