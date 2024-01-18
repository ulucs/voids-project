import { Injectable } from '@nestjs/common';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { UpdateForecastDto } from './dto/update-forecast.dto';
import { And, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Forecast } from './entities/forecast.entity';
import { addDays } from 'date-fns';

@Injectable()
export class ForecastsService {
  constructor(
    @InjectRepository(Forecast)
    private readonly forecastRepository: Repository<Forecast>,
  ) {}

  async create(createForecastDto: CreateForecastDto) {
    const forecast = this.forecastRepository.create(createForecastDto);
    return await this.forecastRepository.save(forecast);
  }

  async findAll() {
    return await this.forecastRepository.find({
      where: {
        date: And(
          LessThanOrEqual(addDays(new Date(), 14)),
          MoreThanOrEqual(new Date()),
        ),
      },
    });
  }

  async findInLocation(location: string) {
    return await this.forecastRepository.find({
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
    return await this.forecastRepository.findOneBy({ date, location });
  }

  async update(
    location: string,
    date: Date,
    updateForecastDto: UpdateForecastDto,
  ) {
    const existingForecast = await this.forecastRepository.findOneBy({
      date,
      location,
    });
    if (!existingForecast) {
      throw new Error(
        `Forecast with Date ${date} and Location ${location} not found`,
      );
    }
    const updatedForecast = Object.assign(existingForecast, updateForecastDto);
    return await this.forecastRepository.save(updatedForecast);
  }

  async remove(location: string, date: Date) {
    const existingForecast = await this.forecastRepository.findOneBy({
      date,
      location,
    });
    if (!existingForecast) {
      throw new Error(
        `Forecast with Date ${date} and Location ${location} not found`,
      );
    }
    return await this.forecastRepository.remove(existingForecast);
  }
}
