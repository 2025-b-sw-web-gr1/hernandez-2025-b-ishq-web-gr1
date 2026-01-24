import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API RESTful - Examen Web 002')
    .setDescription(
      'API para gestión de equipos y jugadores de fútbol con NestJS, TypeORM y SQLite',
    )
    .setVersion('1.0.0')
    .addTag('Teams', 'Endpoints para gestión de equipos')
    .addTag('Players', 'Endpoints para gestión de jugadores')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Servidor ejecutándose en puerto ${port}`);
  console.log(`📚 Documentación Swagger disponible en http://localhost:${port}/api/docs`);
}
bootstrap();
