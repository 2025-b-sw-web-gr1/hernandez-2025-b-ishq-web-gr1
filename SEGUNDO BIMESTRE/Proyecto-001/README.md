# Proyecto-001: API REST con NestJS + Swagger

## 📋 Descripción

API RESTful para gestión de equipos y jugadores de fútbol, desarrollada con NestJS, TypeORM y SQLite. Incluye documentación completa con OpenAPI (Swagger).

## 🚀 Tecnologías Utilizadas

- **NestJS** - Framework backend progresivo para Node.js
- **TypeORM** - ORM para TypeScript y JavaScript
- **SQLite** - Base de datos embebida
- **Swagger/OpenAPI** - Documentación interactiva de la API

## 📦 Instalación

### 1. Instalar dependencias del proyecto

```bash
cd "SEGUNDO BIMESTRE/Proyecto-001"
```

```bash
npm install
```

### 2. Instalar la dependencia de Swagger

```bash
npm install @nestjs/swagger swagger-ui-express
```

## 🏃‍♂️ Ejecución

### Modo desarrollo

```bash
npm run start:dev
```

### Modo producción

```bash
npm run build
npm run start:prod
```

## 📚 Documentación de la API

Una vez que el servidor esté ejecutándose, accede a la documentación interactiva de Swagger en:

```
http://localhost:3000/api
```

Desde esta interfaz podrás:
- Ver todos los endpoints disponibles
- Probar las peticiones directamente desde el navegador
- Ver los modelos de datos y sus propiedades
- Consultar ejemplos de request/response

## 🔗 Endpoints Principales

### Teams (Equipos)

- `GET /teams` - Obtener todos los equipos
- `GET /teams/:id` - Obtener un equipo por ID
- `POST /teams` - Crear un nuevo equipo
- `PUT /teams/:id` - Actualizar un equipo
- `DELETE /teams/:id` - Eliminar un equipo
- `GET /teams/:id/players` - Obtener jugadores de un equipo

### Players (Jugadores)

- `GET /players` - Obtener todos los jugadores
- `GET /players/:id` - Obtener un jugador por ID
- `POST /players` - Crear un nuevo jugador
- `PUT /players/:id` - Actualizar un jugador
- `DELETE /players/:id` - Eliminar un jugador

## 💡 Ejemplo de Endpoint Documentado

```typescript
@Post()
@ApiOperation({ summary: 'Crear un nuevo equipo' })
@ApiResponse({
  status: 201,
  description: 'Equipo creado exitosamente',
  type: Team,
})
create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
  return this.teamsService.create(createTeamDto);
}
```

## 📝 Ejemplo de DTO Documentado

```typescript
export class CreateTeamDto {
  @ApiProperty({ example: 'Barcelona FC' })
  name: string;

  @ApiProperty({ example: 'España' })
  country: string;
}
```

## 🔧 Configuración de Swagger

La configuración de Swagger se encuentra en `src/main.ts`:

```typescript
const config = new DocumentBuilder()
  .setTitle('API de Equipos y Jugadores')
  .setDescription('Documentación de endpoints RESTful')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

## 📂 Estructura del Proyecto

```
src/
├── main.ts                 # Punto de entrada y configuración de Swagger
├── app.module.ts          # Módulo principal
├── entities/              # Entidades TypeORM
│   ├── team.entity.ts
│   └── player.entity.ts
├── teams/                 # Módulo de equipos
│   ├── dto/
│   │   └── create-team.dto.ts
│   ├── teams.controller.ts
│   ├── teams.service.ts
│   └── teams.module.ts
└── players/               # Módulo de jugadores
    ├── dto/
    │   └── create-player.dto.ts
    ├── players.controller.ts
    ├── players.service.ts
    └── players.module.ts
```

## 🎯 Características de la Documentación

- **@ApiTags**: Agrupa endpoints por recurso (Teams, Players)
- **@ApiOperation**: Describe la operación de cada endpoint
- **@ApiResponse**: Define los códigos de respuesta HTTP posibles
- **@ApiProperty**: Documenta cada propiedad de los DTOs con ejemplos

## 📖 Más Información

- [Documentación de NestJS](https://docs.nestjs.com/)
- [Documentación de Swagger con NestJS](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)

---

**Desarrollado con ❤️ para el curso de Aplicaciones Web**
