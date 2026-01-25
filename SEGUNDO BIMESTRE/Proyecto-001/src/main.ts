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
    .setTitle('API de Equipos y Jugadores')
    .setDescription('Documentación de endpoints RESTful')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
  console.log(`📚 Documentación Swagger disponible en http://localhost:${port}/api`);
}
bootstrap();
