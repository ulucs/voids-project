import { Injectable } from '@nestjs/common';
import { Forecast } from './weather.types';
import { addDays } from 'date-fns';

const endpoint =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

@Injectable()
export class WeatherService {
  async getWeather(location: string, startDate: Date): Promise<Forecast> {
    const endDate = addDays(new Date(startDate), 14);

    const url = `${endpoint}/${location}/${startDate.toISOString()}/${endDate.toISOString()}?${new URLSearchParams(
      {
        key: process.env.WEATHER_API_KEY,
        unitGroup: 'metric',
        include: 'days',
        contentType: 'json',
      },
    )}`;

    const response = await fetch(url);
    return response.json();
  }
}
