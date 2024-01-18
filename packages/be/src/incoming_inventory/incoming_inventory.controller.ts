import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncomingInventoryService } from './incoming_inventory.service';
import { CreateIncomingInventoryDto } from './dto/create-incoming_inventory.dto';
import { UpdateIncomingInventoryDto } from './dto/update-incoming_inventory.dto';

@Controller('incoming-inventory')
export class IncomingInventoryController {
  constructor(private readonly incomingInventoryService: IncomingInventoryService) {}

  @Post()
  create(@Body() createIncomingInventoryDto: CreateIncomingInventoryDto) {
    return this.incomingInventoryService.create(createIncomingInventoryDto);
  }

  @Get()
  findAll() {
    return this.incomingInventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomingInventoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncomingInventoryDto: UpdateIncomingInventoryDto) {
    return this.incomingInventoryService.update(+id, updateIncomingInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomingInventoryService.remove(+id);
  }
}
