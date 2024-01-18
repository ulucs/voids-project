import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomingInventoryDto } from './create-incoming_inventory.dto';

export class UpdateIncomingInventoryDto extends PartialType(CreateIncomingInventoryDto) {}
