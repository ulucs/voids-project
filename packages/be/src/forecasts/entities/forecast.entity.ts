import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('forecasts')
export class Forecast {
  @PrimaryColumn({ type: 'timestamp without time zone' })
  date: Date;

  @PrimaryColumn()
  location: string;

  @Column()
  forecasted_sales_quantity: number;
}
