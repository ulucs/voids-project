import { Module } from '@nestjs/common';
import { ForecastsService } from './forecasts.service';
import { ForecastsController } from './forecasts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forecast } from './entities/forecast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forecast])],
  controllers: [ForecastsController],
  providers: [ForecastsService],
})
export class ForecastsModule {}
