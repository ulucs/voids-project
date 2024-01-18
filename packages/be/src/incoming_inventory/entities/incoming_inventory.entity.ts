import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('incoming_inventory')
export class IncomingInventory {
  @PrimaryColumn({ type: 'timestamp without time zone' })
  date: Date;

  @PrimaryColumn()
  location: string;

  @Column({ type: 'integer' })
  incoming_quantity: number;
}
