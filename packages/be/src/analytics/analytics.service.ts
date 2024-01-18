import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { addDays } from 'date-fns';
import { DataSource } from 'typeorm';

@Injectable()
export class AnalyticsService {
  private readonly schema =
    'schema' in this.db.options ? this.db.options?.schema + '.' : '';

  constructor(@InjectDataSource() private readonly db: DataSource) {}

  async getRollingSum(lessThan: number): Promise<
    {
      sum_three_days: number;
      date_start: Date;
      location: string;
    }[]
  > {
    return await this.db.query(
      `select * from
        (select
          sum(forecasted_sales_quantity) over(order by date asc rows between 2 preceding and current row) as sum_three_days,
          date as date_start,
          location from ${this.schema}forecasts) a
        where date_start <= $1 and a.sum_three_days < $2;`,
      [addDays(new Date(), 14), lessThan],
    );
  }
}
