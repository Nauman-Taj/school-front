"use client";

import { attendance } from "@/data/attendance";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const attendanceChartData = [
  ...new Set(
    attendance
      .filter((record) => record.role === "Student")
      .map((record) => record.date)
  ),
]
  .sort()
  .map((date) => {
    const records = attendance.filter(
      (record) =>
        record.role === "Student" &&
        record.date === date
    );

    const presentOrLate = records.filter(
      (record) =>
        record.status === "Present" ||
        record.status === "Late"
    ).length;

    const percentage =
      records.length > 0
        ? Number(
            ((presentOrLate / records.length) * 100).toFixed(1)
          )
        : 0;

    return {
      date,
      attendance: percentage,
    };
  });

export default function AttendanceChart() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Attendance Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Student attendance percentage
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={attendanceChartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[60, 100]}
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => `${value}%`}
            />

            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#01796f"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}