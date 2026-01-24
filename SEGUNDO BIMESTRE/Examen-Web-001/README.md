# API RESTful - Examen Web 002

API RESTful desarrollada con **NestJS**, **TypeORM** y **SQLite** para la gestión de equipos y jugadores.

## 📋 Descripción del Proyecto

Esta es una API RESTful que implementa un sistema de gestión de equipos y jugadores de fútbol. Incluye:

- **Teams (Equipos):** Gestión completa de equipos con relación a jugadores
- **Players (Jugadores):** Gestión de jugadores asociados a equipos
- **Relación 1:N:** Un equipo puede tener múltiples jugadores

## 🛠️ Tecnologías Utilizadas

- **NestJS** 10.2.10 - Framework backend
- **TypeORM** 0.3.17 - ORM para bases de datos
- **SQLite** 5.1.6 - Base de datos
- **TypeScript** 5.2.2 - Lenguaje de programación

## 📦 Instalación

### Requisitos previos
- Node.js (v16 o superior)
- npm o yarn

### Pasos de instalación

1. **Navegar al directorio del proyecto:**
```bash
cd examen-web-002
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **La base de datos se crea automáticamente** al ejecutar el servidor por primera vez (SQLite)

## 🚀 Ejecución

### Modo desarrollo (con hot reload)
```bash
npm run start:dev
```

### Modo producción
```bash
npm run build
npm run start:prod
```

El servidor estará disponible en `http://localhost:3000`

## 📝 Estructura del Proyecto

```
src/
├── entities/              # Entidades TypeORM
│   ├── team.entity.ts    # Entidad Team
│   └── player.entity.ts  # Entidad Player
├── dtos/                  # Data Transfer Objects
│   ├── team.dto.ts       # DTOs para Team
│   └── player.dto.ts     # DTOs para Player
├── teams/                 # Módulo Teams
│   ├── teams.controller.ts
│   ├── teams.service.ts
│   └── teams.module.ts
├── players/               # Módulo Players
│   ├── players.controller.ts
│   ├── players.service.ts
│   └── players.module.ts
├── app.module.ts         # Módulo principal
└── main.ts              # Punto de entrada
```

## 🔗 Endpoints de la API

### 🏆 Teams (Equipos)

#### Obtener todos los equipos
```bash
GET /teams
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Real Madrid",
    "country": "España",
    "players": [
      {
        "id": 1,
        "name": "Vinicius Jr",
        "position": "Delantero",
        "teamId": 1
      }
    ]
  }
]
```

#### Obtener un equipo por ID
```bash
GET /teams/:id
```

**Ejemplo:**
```bash
GET /teams/1
```

#### Crear un nuevo equipo
```bash
POST /teams
```

**Body:**
```json
{
  "name": "Barcelona",
  "country": "España"
}
```

**Respuesta:**
```json
{
  "id": 2,
  "name": "Barcelona",
  "country": "España",
  "players": []
}
```

#### Actualizar un equipo
```bash
PUT /teams/:id
```

**Ejemplo:**
```bash
PUT /teams/1
```

**Body:**
```json
{
  "name": "Real Madrid CF",
  "country": "España"
}
```

#### Eliminar un equipo
```bash
DELETE /teams/:id
```

**Ejemplo:**
```bash
DELETE /teams/1
```

#### Obtener los jugadores de un equipo (Endpoint especial)
```bash
GET /teams/:id/players
```

**Ejemplo:**
```bash
GET /teams/1/players
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Vinicius Jr",
    "position": "Delantero",
    "teamId": 1
  },
  {
    "id": 2,
    "name": "Rodrygo",
    "position": "Delantero",
    "teamId": 1
  }
]
```

### ⚽ Players (Jugadores)

#### Obtener todos los jugadores
```bash
GET /players
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Vinicius Jr",
    "position": "Delantero",
    "teamId": 1,
    "team": {
      "id": 1,
      "name": "Real Madrid",
      "country": "España"
    }
  }
]
```

#### Obtener un jugador por ID
```bash
GET /players/:id
```

**Ejemplo:**
```bash
GET /players/1
```

#### Crear un nuevo jugador
```bash
POST /players
```

**Body:**
```json
{
  "name": "Rodrygo",
  "position": "Delantero",
  "teamId": 1
}
```

**Respuesta:**
```json
{
  "id": 3,
  "name": "Rodrygo",
  "position": "Delantero",
  "teamId": 1,
  "team": {
    "id": 1,
    "name": "Real Madrid",
    "country": "España"
  }
}
```

#### Actualizar un jugador
```bash
PUT /players/:id
```

**Ejemplo:**
```bash
PUT /players/1
```

**Body:**
```json
{
  "name": "Vinicius Jr Alcantara",
  "position": "Extremo"
}
```

#### Eliminar un jugador
```bash
DELETE /players/:id
```

**Ejemplo:**
```bash
DELETE /players/1
```

## 🧪 Ejemplos de Uso con curl

### 1. Crear un equipo
```bash
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"name":"Manchester City","country":"Inglaterra"}'
```

### 2. Obtener todos los equipos
```bash
curl http://localhost:3000/teams
```

### 3. Obtener un equipo específico
```bash
curl http://localhost:3000/teams/1
```

### 4. Crear un jugador
```bash
curl -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{"name":"Harry Kane","position":"Delantero","teamId":1}'
```

### 5. Obtener todos los jugadores
```bash
curl http://localhost:3000/players
```

### 6. Obtener jugadores de un equipo específico
```bash
curl http://localhost:3000/teams/1/players
```

### 7. Actualizar un equipo
```bash
curl -X PUT http://localhost:3000/teams/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Manchester City FC","country":"Inglaterra"}'
```

### 8. Actualizar un jugador
```bash
curl -X PUT http://localhost:3000/players/1 \
  -H "Content-Type: application/json" \
  -d '{"position":"Mediapunta"}'
```

### 9. Eliminar un equipo
```bash
curl -X DELETE http://localhost:3000/teams/1
```

### 10. Eliminar un jugador
```bash
curl -X DELETE http://localhost:3000/players/1
```

## 🧪 Ejemplos con HTTPie

Si prefieres usar **HTTPie** (más legible que curl):

### 1. Crear un equipo
```bash
http POST http://localhost:3000/teams name="Bayern Munich" country="Alemania"
```

### 2. Obtener todos los equipos
```bash
http GET http://localhost:3000/teams
```

### 3. Obtener un equipo específico
```bash
http GET http://localhost:3000/teams/1
```

### 4. Crear un jugador
```bash
http POST http://localhost:3000/players name="Robert Lewandowski" position="Delantero" teamId=1
```

### 5. Obtener todos los jugadores
```bash
http GET http://localhost:3000/players
```

### 6. Obtener jugadores de un equipo
```bash
http GET http://localhost:3000/teams/1/players
```

### 7. Actualizar un equipo
```bash
http PUT http://localhost:3000/teams/1 name="Bayern Munich 2024"
```

### 8. Actualizar un jugador
```bash
http PUT http://localhost:3000/players/1 position="Extremo Izquierdo"
```

### 9. Eliminar un equipo
```bash
http DELETE http://localhost:3000/teams/1
```

### 10. Eliminar un jugador
```bash
http DELETE http://localhost:3000/players/1
```

## 📊 Modelo de Base de Datos

### Tabla: teams
| Campo   | Tipo    | Descripción          |
|---------|---------|----------------------|
| id      | INTEGER | ID único (PK)        |
| name    | VARCHAR | Nombre del equipo    |
| country | VARCHAR | País del equipo      |

### Tabla: players
| Campo    | Tipo    | Descripción            |
|----------|---------|------------------------|
| id       | INTEGER | ID único (PK)          |
| name     | VARCHAR | Nombre del jugador     |
| position | VARCHAR | Posición del jugador   |
| teamId   | INTEGER | ID del equipo (FK)     |

## 🔍 Validaciones

- **Team:** Requiere `name` y `country`
- **Player:** Requiere `name`, `position` y `teamId`
- El `teamId` debe corresponder a un equipo existente
- Los IDs deben ser números válidos
- Se previene eliminación de jugadores al eliminar un equipo (CASCADE)

## 🚨 Códigos de Error

| Código | Descripción                          |
|--------|--------------------------------------|
| 200    | Operación exitosa                    |
| 201    | Recurso creado                       |
| 400    | Solicitud inválida                   |
| 404    | Recurso no encontrado                |
| 500    | Error interno del servidor           |

## 📚 Scripts disponibles

```bash
npm run build       # Compilar el proyecto
npm run start       # Iniciar el servidor
npm run start:dev   # Iniciar con hot reload
npm run start:prod  # Iniciar versión de producción
npm run lint        # Ejecutar linter
npm test            # Ejecutar pruebas
```

## 🗄️ Base de Datos

La base de datos **SQLite** se crea automáticamente en el archivo `db.sqlite` en la raíz del proyecto cuando se ejecuta el servidor por primera vez.

## 📝 Notas

- La API habilita **CORS** para permitir acceso desde diferentes orígenes
- TypeORM con `synchronize: true` crea/actualiza automáticamente las tablas
- Las relaciones se cargan automáticamente con `relations: ['players']`
- Los errores retornan mensajes descriptivos en español

## ✨ Características

✅ CRUD completo para Teams y Players
✅ Relación 1:N entre Teams y Players
✅ Endpoint especial para obtener jugadores de un equipo
✅ Validaciones de integridad referencial
✅ Manejo de errores con mensajes en español
✅ Base de datos SQLite sincronizada automáticamente
✅ Código limpio siguiendo principios SOLID
✅ Inyección de dependencias con NestJS

## 🎯 Mejoras Futuras

- Agregar validación con class-validator
- Implementar paginación
- Agregar autenticación JWT
- Crear tests unitarios
- Agregar documentación OpenAPI/Swagger
- Implementar logging avanzado

## 👨‍💻 Autor

Desarrollado como parte del examen de Aplicaciones Web.

## 📄 Licencia

MIT
