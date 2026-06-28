import { Test, TestingModule } from '@nestjs/testing';
import { PessoajuridicaService } from './pessoajuridica.service';

describe('PessoajuridicaService', () => {
  let service: PessoajuridicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoajuridicaService],
    }).compile();

    service = module.get<PessoajuridicaService>(PessoajuridicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
