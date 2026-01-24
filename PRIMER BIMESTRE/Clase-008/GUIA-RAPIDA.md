# 🚀 Guía Rápida - Inicio del Taller Bruno

## ⚡ Pasos para empezar (5 minutos)

### 1️⃣ Instala Bruno
```powershell
# Opción recomendada: Descargar desde
https://www.usebruno.com/downloads

# O usando winget:
winget install Bruno.Bruno
```

### 2️⃣ Abre la colección
1. Inicia **Bruno**
2. Click en **"Open Collection"**
3. Selecciona la carpeta **`Clase-008`**
4. Verás las 19 peticiones cargadas automáticamente

### 3️⃣ Ejecuta tu primera petición
1. Click en **`get-all-posts.bru`**
2. Click en el botón **"Send"** (o `Ctrl+Enter`)
3. ✅ Deberías ver:
   - Status: **200 OK**
   - Response: Array con 100 posts
   - Time: ~200-500ms

### 4️⃣ Prueba una petición POST
1. Click en **`create-post.bru`**
2. Observa el JSON en la sección **Body**
3. Click en **"Send"**
4. ✅ Deberías ver:
   - Status: **201 Created**
   - Response con `id: 101`

### 5️⃣ Explora los query parameters
1. Click en **`get-comments-by-post.bru`**
2. Observa la URL: `...comments?postId=1`
3. Click en **"Send"**
4. Modifica `postId=1` a `postId=2` y vuelve a enviar
5. ✅ Nota cómo cambian los comentarios

---

## 📋 Checklist de Verificación Rápida

Prueba estas 5 peticiones esenciales:

| # | Petición | Método | Status esperado | Tiempo |
|---|----------|--------|-----------------|--------|
| 1 | `get-all-posts.bru` | GET | 200 OK | ⏱️ ~300ms |
| 2 | `create-post.bru` | POST | 201 Created | ⏱️ ~400ms |
| 3 | `update-post-title.bru` | PATCH | 200 OK | ⏱️ ~300ms |
| 4 | `delete-post.bru` | DELETE | 200 OK | ⏱️ ~300ms |
| 5 | `get-all-users.bru` | GET | 200 OK | ⏱️ ~200ms |

---

## 🎯 Lo que debes observar

### En cada petición verás 4 secciones:

1. **Request** (Parte superior)
   - Método HTTP (GET, POST, etc.)
   - URL del endpoint
   - Headers (si aplica)
   - Body (si aplica)

2. **Response Status** (Después de Send)
   - Código (200, 201, 404...)
   - Tiempo de respuesta
   - Tamaño de la respuesta

3. **Response Body** (Panel inferior)
   - Datos JSON devueltos
   - Formato legible
   - Posibilidad de copiar

4. **Response Headers**
   - Content-Type: application/json
   - Date, Server, etc.

---

## 🔍 Conceptos Clave

### Métodos HTTP (Verbos)

```
GET    → Obtener datos (leer)
POST   → Crear nuevo recurso
PUT    → Actualizar recurso completo
PATCH  → Actualizar recurso parcialmente
DELETE → Eliminar recurso
```

### Códigos de Estado HTTP

```
200 OK          → Petición exitosa
201 Created     → Recurso creado exitosamente
404 Not Found   → Recurso no existe
500 Server Error → Error del servidor
```

### Estructura de una petición POST/PUT/PATCH

```
Headers:
  Content-Type: application/json

Body:
  {
    "campo1": "valor1",
    "campo2": "valor2"
  }
```

---

## 💡 Tips para el Taller

### ✅ Hacer
- Ejecuta TODAS las 19 peticiones
- Modifica los valores en los Body (POST/PUT/PATCH)
- Cambia los IDs en las URLs
- Observa los códigos de respuesta
- Compara PUT vs PATCH
- Prueba los query parameters

### ❌ No hacer
- No te preocupes si "rompes" algo (es una API de prueba)
- No necesitas configurar nada más allá de abrir la colección
- No hay autenticación, API keys ni configuración

---

## 📚 Archivos del Taller

```
Clase-008/
├── 📄 README.md                    ← Documentación completa
├── 📄 GUIA-RAPIDA.md              ← Este archivo
├── 📄 RESULTADOS-ESPERADOS.md     ← Tabla de verificación
├── 📄 bruno.json                   ← Configuración
│
└── 📁 19 archivos .bru             ← Las peticiones
    ├── get-all-posts.bru
    ├── create-post.bru
    ├── update-post-put.bru
    └── ... (16 más)
```

---

## 🎓 Objetivos del Taller

Al finalizar este taller sabrás:

1. ✅ Usar Bruno como herramienta de testing de APIs
2. ✅ Diferenciar los 5 métodos HTTP principales
3. ✅ Interpretar códigos de respuesta HTTP
4. ✅ Enviar JSON en el body de peticiones
5. ✅ Usar query parameters para filtrar datos
6. ✅ Leer respuestas JSON
7. ✅ Entender la diferencia entre PUT y PATCH

---

## 🆘 Solución de Problemas

### Bruno no abre la colección
- Asegúrate de seleccionar la carpeta `Clase-008` completa
- Verifica que exista el archivo `bruno.json`

### Las peticiones fallan
- Verifica tu conexión a internet
- JSONPlaceholder debe estar disponible en https://jsonplaceholder.typicode.com

### No veo el Response
- Espera a que aparezca el spinner de carga
- Algunas peticiones (como GET /photos) pueden tardar más

---

## 📞 Recursos de Ayuda

- **Bruno Docs**: https://docs.usebruno.com/
- **JSONPlaceholder**: https://jsonplaceholder.typicode.com/guide/
- **HTTP Methods**: https://developer.mozilla.org/es/docs/Web/HTTP/Methods

---

## ✨ ¡Listo para empezar!

1. Abre Bruno
2. Carga la carpeta `Clase-008`
3. Ejecuta `get-all-posts.bru`
4. ¡Explora el resto de peticiones!

**Tiempo estimado**: 30-45 minutos para probar todas las peticiones

---

**¡Buena suerte! 🚀**
