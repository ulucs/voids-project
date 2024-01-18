import { formatDate, head } from "@/utils";
import { Label, Select, Button } from "flowbite-react";
import type { ForecastsController } from "voids-project-be/src/forecasts/forecasts.controller";
import type { LocationsController } from "voids-project-be/src/locations/locations.controller";
import type { IncomingInventoryController } from "voids-project-be/src/incoming_inventory/incoming_inventory.controller";
import StockAnalysis from "./table";
import { UnwrapPromise } from "next/dist/lib/coalesced-function";

type Forecast = UnwrapPromise<
  ReturnType<ForecastsController["findInLocation"]>
>[number];

export type TsData = (Forecast & { cdelta: number; incoming: number })[];

const fetchForecasts = async (location: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/forecasts/${location}`
  );
  return res.json() as ReturnType<ForecastsController["findInLocation"]>;
};

const fetchIncomingInventoryMap = async (location: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/incoming-inventory/${location}`
  );
  const inventory = await (res.json() as ReturnType<
    IncomingInventoryController["findInLocation"]
  >);

  // integers come as strings from the API
  return new Map(
    inventory.map((day) => [
      formatDate(day.date),
      Number(day.incoming_quantity),
    ])
  );
};

export default async function Stocks({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const locations = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/locations`
  ).then((res) => res.json() as ReturnType<LocationsController["findAll"]>);

  const { location: selectedLocation = locations[0].name } = searchParams;
  const forecasts = await fetchForecasts(head(selectedLocation));
  const inventory = await fetchIncomingInventoryMap(head(selectedLocation));

  const tsData = forecasts.reduce<TsData>((acc, forecast) => {
    const last = acc[acc.length - 1];
    const incoming = inventory.get(formatDate(forecast.date));

    if (!last) {
      return [
        {
          ...forecast,
          incoming: incoming ?? 0,
          cdelta:
            // integers come as strings from the API
            (incoming ?? 0) - forecast.forecasted_sales_quantity,
        },
      ];
    }

    // a bit of a speed optimization
    acc.push({
      ...forecast,
      incoming: incoming ?? 0,
      cdelta:
        last.cdelta + (incoming ?? 0) - forecast.forecasted_sales_quantity,
    });
    return acc;
  }, []);

  return (
    <div className="overflow-x-auto flex flex-col gap-4">
      <StockAnalysis
        locationPicker={
          <form
            className="contents"
            action="/stock"
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
        }
        tsData={tsData}
      />
    </div>
  );
}
