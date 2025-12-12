# 📘 Documentación de APIs REST con Swagger - Examen 01

## 🎯 Objetivo del Taller

Documentar los endpoints de JSONPlaceholder usando el estándar OpenAPI 3.0 y visualizarlos con Swagger UI para crear una interfaz interactiva de testing.

## 📋 Contenido

- **swagger-documentation.yaml**: Documentación completa de la API de JSONPlaceholder en formato OpenAPI 3.0

## 🚀 Cómo usar esta documentación

### Opción 1: Swagger Editor Online (Recomendado)

1. Visita [Swagger Editor](https://editor.swagger.io/)
2. Copia todo el contenido del archivo `swagger-documentation.yaml`
3. Pégalo en el editor (reemplaza el contenido existente)
4. La documentación se visualizará automáticamente en el panel derecho
5. Puedes probar los endpoints directamente desde la interfaz haciendo clic en "Try it out"

### Opción 2: Visualización local

Si deseas ejecutar la documentación localmente:

```bash
# Instalar swagger-ui-express
npm install -g swagger-ui-express

# O usar Docker
docker run -p 8080:8080 -e SWAGGER_JSON=/swagger/swagger-documentation.yaml -v $(pwd):/swagger swaggerapi/swagger-ui
```

## 📚 Endpoints Documentados

La documentación incluye todos los endpoints principales de JSONPlaceholder:

### 🔖 Posts
- `GET /posts` - Obtener todos los posts
- `POST /posts` - Crear un nuevo post
- `GET /posts/{id}` - Obtener un post por ID
- `PUT /posts/{id}` - Actualizar un post completo
- `PATCH /posts/{id}` - Actualizar parcialmente un post
- `DELETE /posts/{id}` - Eliminar un post
- `GET /posts/{id}/comments` - Obtener comentarios de un post

### 💬 Comments
- `GET /comments` - Obtener todos los comentarios
- `POST /comments` - Crear un nuevo comentario

### 📸 Albums
- `GET /albums` - Obtener todos los álbumes
- `POST /albums` - Crear un nuevo álbum
- `GET /albums/{id}` - Obtener un álbum por ID
- `GET /albums/{id}/photos` - Obtener fotos de un álbum

### 🖼️ Photos
- `GET /photos` - Obtener todas las fotos

### ✅ Todos
- `GET /todos` - Obtener todas las tareas
- `POST /todos` - Crear una nueva tarea
- `GET /todos/{id}` - Obtener una tarea por ID

### 👥 Users
- `GET /users` - Obtener todos los usuarios
- `GET /users/{id}` - Obtener un usuario por ID

## 🎨 Características de la Documentación

✅ **Completa**: Incluye todos los endpoints principales de JSONPlaceholder
✅ **Organizada**: Agrupada por tags para fácil navegación
✅ **Descriptiva**: Cada endpoint tiene descripción detallada
✅ **Ejemplos**: Incluye ejemplos de requests y responses
✅ **Esquemas**: Define modelos de datos reutilizables
✅ **Interactiva**: Permite testing directo desde Swagger UI

## 📖 Estructura del Documento OpenAPI

```yaml
openapi: 3.0.0          # Versión de OpenAPI
info:                   # Información general de la API
servers:                # URLs de los servidores
tags:                   # Categorías de endpoints
paths:                  # Definición de todos los endpoints
  /endpoint:
    method:             # GET, POST, PUT, PATCH, DELETE
      tags:             # Categoría
      summary:          # Resumen breve
      description:      # Descripción detallada
      parameters:       # Parámetros de entrada
      requestBody:      # Cuerpo de la petición
      responses:        # Respuestas posibles
components:             # Componentes reutilizables
  schemas:              # Modelos de datos
```

## 🔍 Por qué es importante documentar una API

1. **📚 Facilita el entendimiento**: Los desarrolladores comprenden rápidamente cómo consumir la API
2. **🤝 Mejora la colaboración**: Equipos de frontend, backend y QA trabajan sincronizados
3. **🛠️ Reduce errores**: Documentación clara evita malentendidos en parámetros y respuestas
4. **🔍 Permite testing**: Herramientas como Swagger UI permiten probar directamente
5. **📈 Acelera el desarrollo**: Nuevos desarrolladores se integran más rápido al proyecto

## 🎓 Conceptos Clave de Swagger

### OpenAPI Specification (OAS)
Estándar para describir APIs REST de forma legible por máquinas y humanos.

### Swagger UI
Interfaz web interactiva que visualiza la documentación y permite testing.

### Swagger Editor
Editor online para escribir y validar documentación OpenAPI.

### Swagger Codegen
Herramienta para generar código cliente/servidor desde la especificación.

## 🔗 Enlaces Útiles

- [JSONPlaceholder API](https://jsonplaceholder.typicode.com)
- [Swagger Editor](https://editor.swagger.io/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Demo](https://petstore.swagger.io/)
- [OpenAPI Tutorial](https://swagger.io/docs/specification/about/)

## 👨‍💻 Autor

**Hernández - 2025-B - ISHQ - WEB - GR1**

Documentación creada para fines educativos en el curso de Aplicaciones Web.

---

**Fecha de creación**: Diciembre 2024  
**Versión**: 1.0.0
