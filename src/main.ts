import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3002;

  // -----------------------------
  // VALIDATION PIPE GLOBAL
  // -----------------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // -----------------------------
  // GLOBAL INTERCEPTOR (PADRÃO RESPONSE)
  // -----------------------------
  app.useGlobalInterceptors(new ResponseInterceptor());

  // -----------------------------
  // GLOBAL EXCEPTION FILTER (ERROS PADRONIZADOS)
  // -----------------------------
  app.useGlobalFilters(new HttpExceptionFilter());

  // -----------------------------
  // SWAGGER CONFIG
  // -----------------------------
  const config = new DocumentBuilder()
    .setTitle('Microserviço Locatário')
    .setDescription('API de gerenciamento de locatários da imobiliária')
    .setVersion('1.0')
    .addTag('Locatário')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // -----------------------------
  // CORS
  // -----------------------------
  app.enableCors();

  // -----------------------------
  // START SERVER
  // -----------------------------
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();