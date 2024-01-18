"use client";

import { useState } from "react";
import { TextInput, Label, Table } from "flowbite-react";
import { formatDate } from "@/utils";
import type { TsData } from "./page";

export default function StockAnalysis({
  locationPicker,
  tsData,
}: {
  locationPicker: React.ReactNode;
  tsData: TsData;
}) {
  const [initialStock, setInitialStock] = useState(200);

  return (
    <>
      <div className="w-full flex items-end justify-end gap-4">
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Initial Stock" />
          </div>
          <TextInput
            pattern="{1-9}{0-9}+"
            value={initialStock}
            onChange={(e) => {
              setInitialStock(Number(e.target.value));
            }}
          />
        </div>
        {locationPicker}
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Location</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Incoming Stock</Table.HeadCell>
          <Table.HeadCell>Forecasted Sales</Table.HeadCell>
          <Table.HeadCell>Remaining Stock</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tsData.map((forecast) => (
            <Table.Row
              className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${
                initialStock + forecast.cdelta < 0
                  ? "text-red-600 dark:bg-red-800"
                  : ""
              }`}
              key={`${forecast.location}-${forecast.date}`}
            >
              <Table.Cell>{forecast.location}</Table.Cell>
              <Table.Cell>{formatDate(forecast.date)}</Table.Cell>
              <Table.Cell>{forecast.incoming}</Table.Cell>
              <Table.Cell>{forecast.forecasted_sales_quantity}</Table.Cell>
              <Table.Cell>{initialStock + forecast.cdelta}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
