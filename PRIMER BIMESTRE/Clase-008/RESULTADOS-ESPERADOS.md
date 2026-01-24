# 📊 Resultados Esperados - JSONPlaceholder API Testing

## ✅ Verificación de Peticiones

### 📝 Posts (6 peticiones)

| Archivo | Método | Endpoint | Status | Notas |
|---------|--------|----------|--------|-------|
| `get-all-posts.bru` | GET | /posts | 200 | Retorna 100 posts |
| `get-post-by-id.bru` | GET | /posts/1 | 200 | Retorna 1 post |
| `create-post.bru` | POST | /posts | 201 | Retorna post con id: 101 |
| `update-post-put.bru` | PUT | /posts/1 | 200 | Reemplaza todo el post |
| `update-post-title.bru` | PATCH | /posts/1 | 200 | Solo actualiza título |
| `delete-post.bru` | DELETE | /posts/1 | 200 | Retorna {} |

### 💬 Comments (3 peticiones)

| Archivo | Método | Endpoint | Status | Notas |
|---------|--------|----------|--------|-------|
| `get-all-comments.bru` | GET | /comments | 200 | Retorna 500 comentarios |
| `get-comments-by-post.bru` | GET | /comments?postId=1 | 200 | Retorna 5 comentarios |
| `create-comment.bru` | POST | /comments | 201 | Retorna comment con id: 501 |

### 🖼️ Albums (3 peticiones)

| Archivo | Método | Endpoint | Status | Notas |
|---------|--------|----------|--------|-------|
| `get-all-albums.bru` | GET | /albums | 200 | Retorna 100 álbumes |
| `get-album-by-id.bru` | GET | /albums/1 | 200 | Retorna 1 álbum |
| `create-album.bru` | POST | /albums | 201 | Retorna album con id: 101 |

### 📷 Photos (2 peticiones)

| Archivo | Método | Endpoint | Status | Notas |
|---------|--------|----------|--------|-------|
| `get-all-photos.bru` | GET | /photos | 200 | Retorna 5000 fotos |
| `get-photos-by-album.bru` | GET | /photos?albumId=1 | 200 | Retorna 50 fotos |

### ✔️ Todos (3 peticiones)

| Archivo | Método | Endpoint | Status | Notas |
|---------|--------|----------|--------|-------|
| `get-all-todos.bru` | GET | /todos | 200 | Retorna 200 tareas |
| `get-todo-by-id.bru` | GET | /todos/1 | 200 | Retorna 1 tarea |
| `create-todo.bru` | POST | /todos | 201 | Retorna todo con id: 201 |

### 👤 Users (2 peticiones)

| Archivo | Método | Endpoint | Status | Notas |
|---------|--------|----------|--------|-------|
| `get-all-users.bru` | GET | /users | 200 | Retorna 10 usuarios |
| `get-user-by-id.bru` | GET | /users/1 | 200 | Retorna 1 usuario |

---

## 📋 Resumen Total

- **Total de peticiones**: 19
- **Métodos GET**: 12
- **Métodos POST**: 4
- **Métodos PUT**: 1
- **Métodos PATCH**: 1
- **Métodos DELETE**: 1

## 🎯 Códigos de Estado HTTP Utilizados

| Código | Significado | Cuándo aparece |
|--------|-------------|----------------|
| **200** | OK | Peticiones exitosas (GET, PUT, PATCH, DELETE) |
| **201** | Created | Recursos creados exitosamente (POST) |
| **404** | Not Found | Recurso no existe (ej: /posts/999999) |

## 🔬 Ejemplos de Respuestas

### GET /posts/1
```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae..."
}
```

### POST /posts
**Request:**
```json
{
  "title": "foo",
  "body": "bar",
  "userId": 1
}
```

**Response (201):**
```json
{
  "title": "foo",
  "body": "bar",
  "userId": 1,
  "id": 101
}
```

### GET /users/1
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

### DELETE /posts/1
**Response (200):**
```json
{}
```

## 🧪 Pruebas Recomendadas

### 1. Verificar todos los GET retornan 200
✅ Todos los endpoints GET deberían responder con status 200

### 2. Verificar todos los POST retornan 201
✅ Todos los endpoints POST deberían responder con status 201 y un objeto con `id`

### 3. Probar query parameters
✅ `?postId=1` → Filtra por post 1
✅ `?albumId=1` → Filtra por álbum 1

### 4. Modificar IDs en las URLs
✅ Cambiar `/posts/1` a `/posts/2`, `/posts/3`, etc.
✅ Probar con ID inexistente: `/posts/999` (debería seguir retornando 200 con null o {})

### 5. Modificar datos en POST/PUT/PATCH
✅ Cambiar los valores en los JSON bodies
✅ Observar que JSONPlaceholder acepta cualquier dato válido

## ⚠️ Notas Importantes

1. **JSONPlaceholder es una API de prueba**
   - Los datos NO se guardan permanentemente
   - Los POST/PUT/PATCH/DELETE son simulados
   - Siempre retorna respuestas exitosas

2. **Datos de ejemplo**
   - La API contiene datos ficticios generados
   - Útil para prototipar y aprender
   - No usar en producción

3. **Sin autenticación**
   - No requiere API keys
   - No tiene rate limiting estricto
   - Ideal para aprendizaje

## 📝 Checklist de Verificación

Después de probar todas las peticiones, verifica:

- [ ] Todas las peticiones GET retornan status 200
- [ ] Todas las peticiones POST retornan status 201
- [ ] Los POST incluyen un `id` en la respuesta
- [ ] PUT actualiza todo el objeto
- [ ] PATCH actualiza solo los campos enviados
- [ ] DELETE retorna objeto vacío {}
- [ ] Los query parameters funcionan correctamente
- [ ] Puedes ver los Response Headers
- [ ] Puedes ver el Response Time
- [ ] Bruno muestra el formato JSON correctamente

## 🎓 Conclusión

Si todas las peticiones funcionan correctamente, habrás completado exitosamente el taller de Bruno y entendido:

- ✅ Cómo funcionan los diferentes métodos HTTP
- ✅ Qué códigos de respuesta se usan en cada caso
- ✅ Cómo estructurar peticiones con headers y body
- ✅ Cómo leer e interpretar respuestas JSON
- ✅ Cómo usar query parameters
- ✅ La diferencia entre PUT y PATCH

---

**¡Taller completado! 🎉**
