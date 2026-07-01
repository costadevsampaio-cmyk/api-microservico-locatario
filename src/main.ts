// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// =========================================================================
// SOLUÇÃO DO LOADING INFINITO: Extensão global para serialização de BigInt
// =========================================================================
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS (importante para o gateway do seu amigo conseguir acessar)
  app.enableCors();

  // Configuração global de validação dos DTOs (caso use class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuração do Swagger UI (buraquinho onde você está testando as rotas)
  const config = new DocumentBuilder()
    .setTitle('Microserviço Locatário')
    .setDescription('API de gerenciamento de locatários')
    .setVersion('1.0.0')
    .addTag('Locatário')
    .addTag('Health')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Define a rota da documentação. Se o seu projeto usava outro termo 
  // no lugar de 'api' (como 'docs'), basta ajustar o nome abaixo:
  SwaggerModule.setup('api', app, document);

  // Porta que o seu servidor está rodando (vimos no seu log que é a 3002)
  const port = process.env.PORT || 3002;
  await app.listen(port);
  
  console.log(`\n🚀 Aplicação executando em: http://localhost:${port}`);
  console.log(`📊 Documentação Swagger disponível em: http://localhost:${port}/api\n`);
}

bootstrap();




// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// import { AppModule } from './app.module';
// import { ResponseInterceptor } from './common/interceptors/response.interceptors';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const configService = app.get(ConfigService);
//   const port = configService.get<number>('PORT') || 3002;

//   // Validation Pipe Global
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   // Interceptor Global
//   app.useGlobalInterceptors(new ResponseInterceptor());

//   // Filtro Global de Exceções
//   app.useGlobalFilters(new HttpExceptionFilter());

//   // Swagger
//   const config = new DocumentBuilder()
//     .setTitle('Microserviço Locatário')
//     .setDescription('API de gerenciamento de locatários')
//     .setVersion('1.0.0')
//     .addTag('Locatário')
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api/docs', app, document);

//   app.enableCors();

//   await app.listen(port);

//   console.log(`🚀 Microserviço Locatário iniciado na porta ${port}`);
//   console.log(`📄 Swagger disponível em http://localhost:${port}/api/docs`);
// }

// bootstrap();