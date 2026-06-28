import { Test, TestingModule } from '@nestjs/testing';
import { PessoafisicaService } from './pessoafisica.service';

describe('PessoafisicaService', () => {
  let service: PessoafisicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoafisicaService],
    }).compile();

    service = module.get<PessoafisicaService>(PessoafisicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
