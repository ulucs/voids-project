import { Module } from '@nestjs/common';
import { IncomingInventoryService } from './incoming_inventory.service';
import { IncomingInventoryController } from './incoming_inventory.controller';

@Module({
  controllers: [IncomingInventoryController],
  providers: [IncomingInventoryService]
})
export class IncomingInventoryModule {}
