"use client";

import { fees } from "@/data/fees";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const totalFeeAmount = fees.reduce(
  (total, fee) => total + fee.amount,
  0
);

const totalPaidAmount = fees.reduce(
  (total, fee) => total + fee.amount * (fee.status === "Paid" ? 1 : 0),
  0
);

const feeCollectionRate =
  totalFeeAmount > 0
    ? Number(
        ((totalPaidAmount / totalFeeAmount) * 100).toFixed(1)
      )
    : 0;

const feeData = [
  {
    name: "Collected",
    value: totalPaidAmount,
  },
  {
    name: "Remaining",
    value: totalFeeAmount - totalPaidAmount,
  },
];

const COLORS = ["#01796F", "#E5E7EB"];

export default function FeeChart() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Fee Collection
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Current collection overview
        </p>
      </div>

      <div className="relative mx-auto h-56 w-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={feeData}
              dataKey="value"
              nameKey="name"
              innerRadius={68}
              outerRadius={92}
              paddingAngle={2}
              stroke="none"
            >
              {feeData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) =>
                `PKR ${Number(value).toLocaleString()}`
              }
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {feeCollectionRate}%
          </span>

          <span className="text-xs text-gray-500">
            collected
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#01796F]" />
          <span className="text-gray-600">Collected</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          <span className="text-gray-600">Remaining</span>
        </div>
      </div>
    </div>
  );
}