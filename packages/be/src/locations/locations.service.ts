import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class LocationsService {
  private readonly schema =
    'schema' in this.db.options ? this.db.options?.schema + '.' : '';

  constructor(@InjectDataSource() private readonly db: DataSource) {}

  async findAll() {
    return await this.db.query(
      `select distinct location as name from ${this.schema}incoming_inventory`,
    );
  }
}
