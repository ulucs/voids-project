import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AnalyticsService {
  private readonly schema =
    'schema' in this.db.options ? this.db.options?.schema + '.' : '';

  constructor(@InjectDataSource() private readonly db: DataSource) {}

  async getRollingSum(lessThan: number) {
    return await this.db.query(
      `select * from
        (select
          sum(forecasted_sales_quantity) over(order by date asc rows between 2 preceding and current row) as sum_three_days,
          date as date_start,
          location from oneglass.forecasts) a
        where a.sum_three_days < $1;`,
      [lessThan],
    );
  }
}
