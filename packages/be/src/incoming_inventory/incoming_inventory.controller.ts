import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncomingInventoryService } from './incoming_inventory.service';
import { CreateIncomingInventoryDto } from './dto/create-incoming_inventory.dto';
import { UpdateIncomingInventoryDto } from './dto/update-incoming_inventory.dto';
import { DateParam } from 'src/pipes/dateParam';

@Controller('incoming-inventory')
export class IncomingInventoryController {
  constructor(
    private readonly incomingInventoryService: IncomingInventoryService,
  ) {}

  @Post()
  create(@Body() createIncomingInventoryDto: CreateIncomingInventoryDto) {
    return this.incomingInventoryService.create(createIncomingInventoryDto);
  }

  @Get()
  findAll() {
    return this.incomingInventoryService.findAll();
  }

  @Get(':location/:date')
  findOne(
    @Param('location') location: string,
    @Param('date', DateParam) date: Date,
  ) {
    return this.incomingInventoryService.findOne(location, date);
  }

  @Patch(':location/:date')
  update(
    @Param('location') location: string,
    @Param('date', DateParam) date: Date,
    @Body() updateIncomingInventoryDto: UpdateIncomingInventoryDto,
  ) {
    return this.incomingInventoryService.update(
      location,
      date,
      updateIncomingInventoryDto,
    );
  }

  @Delete(':location/:date')
  remove(
    @Param('location') location: string,
    @Param('date', DateParam) date: Date,
  ) {
    return this.incomingInventoryService.remove(location, date);
  }
}
