import { formatDate } from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import type { AnalyticsController } from "voids-project-be/src/analytics/analytics.controller";

const fetchSales = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/analytics/low-sales-alerts`
  );
  return res.json() as ReturnType<AnalyticsController["getLowSalesAlerts"]>;
};

export default async function LowSales() {
  const sales = await fetchSales();

  return (
    <div className="overflow-x-auto flex flex-col gap-4">
      <Table>
        <TableHead>
          <TableHeadCell>Location</TableHeadCell>
          <TableHeadCell>Start Date</TableHeadCell>
          <TableHeadCell>3-Day Forecasted Sales</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {sales.map((forecast) => (
            <TableRow
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={`${forecast.location}-${forecast.date_start}`}
            >
              <TableCell>{forecast.location}</TableCell>
              <TableCell>{formatDate(forecast.date_start)}</TableCell>
              <TableCell>{forecast.sum_three_days}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
