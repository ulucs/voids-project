import { Test, TestingModule } from '@nestjs/testing';
import { IncomingInventoryController } from './incoming_inventory.controller';
import { IncomingInventoryService } from './incoming_inventory.service';

describe('IncomingInventoryController', () => {
  let controller: IncomingInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomingInventoryController],
      providers: [IncomingInventoryService],
    }).compile();

    controller = module.get<IncomingInventoryController>(IncomingInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
