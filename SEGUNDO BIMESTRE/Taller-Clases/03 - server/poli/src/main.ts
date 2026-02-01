import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import FileStore from 'session-file-store';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const FileStoreSession = FileStore(session);
  app.use(
    session({
      store: new FileStoreSession({}),
      secret: 'mi_secreto_super_seguro',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 60 * 1000 }, // 1 hora
    }),
  );

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Poli API')
    .setDescription('API de Recetas e Ingredientes')
    .setVersion('1.0')
    .addTag('recetas')
    .addTag('ingredientes')
    .addTag('auth')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true, // mantiene la cookie entre requests
      withCredentials: true, // envía cookies automáticamente
    },
  });
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
