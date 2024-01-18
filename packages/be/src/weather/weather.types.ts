export type Forecast = {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: Day[];
  stations: { [key: string]: Station };
};

export type Day = {
  datetime: Date;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  precipcover: number;
  preciptype: Icon[] | null;
  snow: number | null;
  snowdepth: number | null;
  windgust: number | null;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation: number | null;
  solarenergy: number | null;
  uvindex: number | null;
  severerisk?: number;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
  conditions: string;
  description: string;
  icon: Icon;
  stations: string[] | null;
  source: Source;
  normal: Normal;
};

export type Icon =
  | 'snow'
  | 'clear-day'
  | 'partly-cloudy-day'
  | 'rain'
  | 'cloudy';

export type Normal = {
  tempmax: number[];
  tempmin: number[];
  feelslike: number[];
  precip: number[];
  humidity: number[];
  snowdepth: null[];
  windspeed: number[];
  windgust: (number | null)[];
  winddir: number[];
  cloudcover: number[];
};

export type Source = 'comb' | 'fcst' | 'stats';

export type Station = {
  distance: number;
  latitude: number;
  longitude: number;
  useCount: number;
  id: string;
  name: string;
  quality: number;
  contribution: number;
};
