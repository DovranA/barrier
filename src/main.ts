import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API for authentication and registration')
    .setVersion('1.0')
    .addBearerAuth() // Если используете Bearer токены
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    credentials: true,
    allowedHeaders: '*',
    exposedHeaders: 'set-cookie',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors
          .map((err) => Object.values(err.constraints))
          .flat();
        return new BadRequestException(formattedErrors);
      },
    }),
  );
  await app.listen(4200);
}
bootstrap();
