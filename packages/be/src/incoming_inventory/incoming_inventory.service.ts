import { Injectable } from '@nestjs/common';
import { CreateIncomingInventoryDto } from './dto/create-incoming_inventory.dto';
import { UpdateIncomingInventoryDto } from './dto/update-incoming_inventory.dto';

@Injectable()
export class IncomingInventoryService {
  create(createIncomingInventoryDto: CreateIncomingInventoryDto) {
    return 'This action adds a new incomingInventory';
  }

  findAll() {
    return `This action returns all incomingInventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incomingInventory`;
  }

  update(id: number, updateIncomingInventoryDto: UpdateIncomingInventoryDto) {
    return `This action updates a #${id} incomingInventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} incomingInventory`;
  }
}
