import { Module } from '@nestjs/common';
import { PessoajuridicaController } from './pessoajuridica.controller';
import { PessoajuridicaService } from './pessoajuridica.service';

@Module({
  controllers: [PessoajuridicaController],
  providers: [PessoajuridicaService]
})
export class PessoajuridicaModule {}
