import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { dirname } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('minimal blog')
    .setDescription(
      'About this is a minimal blog backend built in node, Nest.js as a framework, Prisma as ORM and Postgres for database',
    )
    .setVersion('1.0')
    .setContact(
      'NGOGA Adolphe',
      'https://github.com/ad-ng',
      'adolphengoga@gmail.com',
    )
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
