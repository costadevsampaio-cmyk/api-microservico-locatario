import { Module } from '@nestjs/common';
import { PessoafisicaController } from './pessoafisica.controller';
import { PessoafisicaService } from './pessoafisica.service';

@Module({
  controllers: [PessoafisicaController],
  providers: [PessoafisicaService]
})
export class PessoafisicaModule {}
