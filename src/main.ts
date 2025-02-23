import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Quita propiedades no especificadas en los dtos
    forbidNonWhitelisted: true, // Rechaza propiedades no especificadas en los dtos
    transformOptions: {
      enableImplicitConversion: true // Convierte tipos de datos de query a enteros, booleanos, etc
    }
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
