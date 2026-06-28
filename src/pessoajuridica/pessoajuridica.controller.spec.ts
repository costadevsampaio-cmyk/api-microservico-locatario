import { Test, TestingModule } from '@nestjs/testing';
import { PessoajuridicaController } from './pessoajuridica.controller';

describe('PessoajuridicaController', () => {
  let controller: PessoajuridicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoajuridicaController],
    }).compile();

    controller = module.get<PessoajuridicaController>(PessoajuridicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
