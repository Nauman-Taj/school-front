"use client";

import { feeData } from "@/data/dashboard";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


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
              data={feeData}
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