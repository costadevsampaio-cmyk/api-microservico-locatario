import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

import { LocatarioModule } from './locatario/locatario.module';
import { PessoafisicaModule } from './pessoafisica/pessoafisica.module';
import { PessoajuridicaModule } from './pessoajuridica/pessoajuridica.module';

import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    LocatarioModule,
    PessoafisicaModule,
    PessoajuridicaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}