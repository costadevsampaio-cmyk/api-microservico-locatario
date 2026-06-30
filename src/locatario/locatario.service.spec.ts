import { Test, TestingModule } from '@nestjs/testing';
import { LocatarioService } from './locatario.service';

describe('LocatarioService', () => {
  let service: LocatarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocatarioService],
    }).compile();

    service = module.get<LocatarioService>(LocatarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
