"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", students: 270 },
  { month: "Feb", students: 265 },
  { month: "Mar", students: 280 },
  { month: "Apr", students: 310 },
  { month: "May", students: 310 },
  { month: "Jun", students: 350 },
  { month: "Jul", students: 370 },
  { month: "Aug", students: 400 },
];

export default function EnrollmentChart() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Student Enrollment
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Student enrollment throughout the year
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="students"
              fill="#01796f"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}