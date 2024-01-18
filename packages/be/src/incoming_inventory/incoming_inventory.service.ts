import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateIncomingInventoryDto } from './dto/create-incoming_inventory.dto';
import { UpdateIncomingInventoryDto } from './dto/update-incoming_inventory.dto';
import { IncomingInventory } from './entities/incoming_inventory.entity';
import { addDays } from 'date-fns';

@Injectable()
export class IncomingInventoryService {
  constructor(
    @InjectRepository(IncomingInventory)
    private readonly incomingInventoryRepository: Repository<IncomingInventory>,
  ) {}

  async create(createIncomingInventoryDto: CreateIncomingInventoryDto) {
    const incomingInventory = this.incomingInventoryRepository.create(
      createIncomingInventoryDto,
    );
    return await this.incomingInventoryRepository.save(incomingInventory);
  }

  async findAll() {
    return await this.incomingInventoryRepository.find({
      where: {
        date: And(
          LessThanOrEqual(addDays(new Date(), 14)),
          MoreThanOrEqual(new Date()),
        ),
      },
    });
  }

  async findInLocation(location: string) {
    return await this.incomingInventoryRepository.find({
      where: {
        location,
        date: And(
          LessThanOrEqual(addDays(new Date(), 14)),
          MoreThanOrEqual(new Date()),
        ),
      },
    });
  }

  async findOne(location: string, date: Date) {
    return await this.incomingInventoryRepository.findOneBy({ date, location });
  }

  async update(
    location: string,
    date: Date,
    updateIncomingInventoryDto: UpdateIncomingInventoryDto,
  ) {
    const existingIncomingInventory =
      await this.incomingInventoryRepository.findOneBy({ date, location });
    if (!existingIncomingInventory) {
      throw new Error(
        `IncomingInventory with Date ${date} and Location ${location} not found`,
      );
    }
    const updatedIncomingInventory = Object.assign(
      existingIncomingInventory,
      updateIncomingInventoryDto,
    );
    return await this.incomingInventoryRepository.save(
      updatedIncomingInventory,
    );
  }

  async remove(location: string, date: Date) {
    const existingIncomingInventory =
      await this.incomingInventoryRepository.findOneBy({ date, location });
    if (!existingIncomingInventory) {
      throw new Error(
        `IncomingInventory with Date ${date} and Location ${location} not found`,
      );
    }
    return await this.incomingInventoryRepository.remove(
      existingIncomingInventory,
    );
  }
}
