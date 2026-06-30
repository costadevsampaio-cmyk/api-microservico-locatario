import { Test, TestingModule } from '@nestjs/testing';
import { LocatarioController } from './locatario.controller';

describe('LocatarioController', () => {
  let controller: LocatarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocatarioController],
    }).compile();

    controller = module.get<LocatarioController>(LocatarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
