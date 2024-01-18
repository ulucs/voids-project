import { formatDate, head } from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Label,
  Select,
  Button,
} from "flowbite-react";
import type { ForecastsController } from "voids-project-be/src/forecasts/forecasts.controller";
import type { LocationsController } from "voids-project-be/src/locations/locations.controller";
import type { WeatherController } from "voids-project-be/src/weather/weather.controller";

const fetchForecasts = async (location: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/forecasts/${location}`
  );
  return res.json() as ReturnType<ForecastsController["findInLocation"]>;
};

const fetchWeatherMap = async (location: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/weather/${location}`
  );
  const forecast = await (res.json() as ReturnType<
    WeatherController["getForecast"]
  >);

  return new Map(forecast.days.map((day) => [String(day.datetime), day]));
};

export default async function Forecasts({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const locations = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/locations`
  ).then((res) => res.json() as ReturnType<LocationsController["findAll"]>);

  const { location: selectedLocation = locations[0].name } = searchParams;
  const forecasts = await fetchForecasts(head(selectedLocation));
  const weather = await fetchWeatherMap(head(selectedLocation));

  return (
    <div className="overflow-x-auto flex flex-col gap-4">
      <form
        className="w-full flex items-end justify-end gap-4"
        action="/forecasts"
        target="_self"
        method="GET"
      >
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Location" />
          </div>
          <Select
            id="countries"
            name="location"
            defaultValue={head(selectedLocation)}
          >
            {locations.map((location) => (
              <option key={location.name} value={location.name}>
                {location.name}
              </option>
            ))}
          </Select>
        </div>
        <Button type="submit">Filter</Button>
      </form>
      <Table>
        <TableHead>
          <TableHeadCell>Location</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>Forecasted Sales</TableHeadCell>
          <TableHeadCell>Weather Forecast</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {forecasts.map((forecast) => (
            <TableRow
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={`${forecast.location}-${forecast.date}`}
            >
              <TableCell>{forecast.location}</TableCell>
              <TableCell>{formatDate(forecast.date)}</TableCell>
              <TableCell>{forecast.forecasted_sales_quantity}</TableCell>
              <TableCell>
                {weather.get(formatDate(forecast.date))?.conditions}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
