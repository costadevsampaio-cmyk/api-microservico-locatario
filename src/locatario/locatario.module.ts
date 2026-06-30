import { Module } from '@nestjs/common';
import { LocatarioController } from './locatario.controller';
import { LocatarioService } from './locatario.service';

@Module({
  controllers: [LocatarioController],
  providers: [LocatarioService]
})
export class LocatarioModule {}
