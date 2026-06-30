// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste o caminho se necessário

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prismaIndicator: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Verifica se a própria API responde (opcional, pode testar pingando o localhost se quiser)
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      // Verifica se a conexão com o banco via Prisma está ativa
      () => this.prismaIndicator.pingCheck('database', this.prisma),
    ]);
  }
}