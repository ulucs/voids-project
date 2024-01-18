import { Injectable } from '@nestjs/common';
import { Forecast } from './weather.types';

const endpoint =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

@Injectable()
export class WeatherService {
  async getWeather(
    location: string,
    startDateTime: Date,
    endDateTime: Date,
  ): Promise<Forecast> {
    const url = `${endpoint}/${location}/${startDateTime.toISOString()}/${endDateTime.toISOString()}?${new URLSearchParams(
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
