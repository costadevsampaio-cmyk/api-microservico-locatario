import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';

import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';

import { LocatarioModule } from './locatario/locatario.module';
import { PessoafisicaModule } from './pessoafisica/pessoafisica.module';
import { PessoajuridicaModule } from './pessoajuridica/pessoajuridica.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    LocatarioModule,
    PessoafisicaModule,
    PessoajuridicaModule,
    HealthModule
  ],
})
export class AppModule {}