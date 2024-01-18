import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ForecastsService } from './forecasts.service';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { UpdateForecastDto } from './dto/update-forecast.dto';
import { DateParam } from 'src/pipes/dateParam';

@Controller('forecasts')
export class ForecastsController {
  constructor(private readonly forecastService: ForecastsService) {}

  @Post()
  create(@Body() createForecastDto: CreateForecastDto) {
    return this.forecastService.create(createForecastDto);
  }

  @Get()
  findAll() {
    return this.forecastService.findAll();
  }

  @Get(':location')
  findInLocation(@Param('location') location: string) {
    return this.forecastService.findInLocation(location);
  }

  @Get(':location/:date')
  findOne(
    @Param('location') location: string,
    @Param('date', DateParam) date: Date,
  ) {
    return this.forecastService.findOne(location, date);
  }

  @Patch(':location/:date')
  update(
    @Param('location') location: string,
    @Param('date', DateParam) date: Date,
    @Body() updateForecastDto: UpdateForecastDto,
  ) {
    return this.forecastService.update(location, date, updateForecastDto);
  }

  @Delete(':location/:date')
  remove(
    @Param('location') location: string,
    @Param('date', DateParam) date: Date,
  ) {
    return this.forecastService.remove(location, date);
  }
}
