"use client";

import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Collected",
    value: 82.4,
    fill: "#01796f",
  },
  {
    name: "Remaining",
    value: 17.6,
    fill: "#e5e7eb",
  },
];

export default function FeeChart() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Fee Collection
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Current collection overview
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={3}
            />
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center">
        <p className="text-3xl font-bold text-gray-900">
          75%
        </p>

        <p className="mt-1 text-sm text-gray-500">
          fees collected
        </p>
      </div>
    </div>
  );
}