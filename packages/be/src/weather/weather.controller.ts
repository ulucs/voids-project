import { Controller, Get, Param, Query } from '@nestjs/common';
import { DateParam } from 'src/pipes/dateParam';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':location')
  getForecast(
    @Param('location') location: string,
    @Query('from', DateParam) from: Date = new Date(),
  ) {
    return this.weatherService.getWeather(location, from);
  }
}
