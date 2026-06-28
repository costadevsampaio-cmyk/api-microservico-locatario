import { Test, TestingModule } from '@nestjs/testing';
import { PessoafisicaController } from './pessoafisica.controller';

describe('PessoafisicaController', () => {
  let controller: PessoafisicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoafisicaController],
    }).compile();

    controller = module.get<PessoafisicaController>(PessoafisicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
