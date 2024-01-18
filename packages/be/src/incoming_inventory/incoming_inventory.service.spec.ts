import { Test, TestingModule } from '@nestjs/testing';
import { IncomingInventoryService } from './incoming_inventory.service';

describe('IncomingInventoryService', () => {
  let service: IncomingInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomingInventoryService],
    }).compile();

    service = module.get<IncomingInventoryService>(IncomingInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
