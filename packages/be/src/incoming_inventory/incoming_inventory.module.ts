import { Module } from '@nestjs/common';
import { IncomingInventoryService } from './incoming_inventory.service';
import { IncomingInventoryController } from './incoming_inventory.controller';
import { IncomingInventory } from './entities/incoming_inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([IncomingInventory])],
  controllers: [IncomingInventoryController],
  providers: [IncomingInventoryService],
})
export class IncomingInventoryModule {}
