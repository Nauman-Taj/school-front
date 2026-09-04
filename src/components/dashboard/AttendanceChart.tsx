"use client";
import { attendanceData } from "@/data/dashboard";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export default function AttendanceChart() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Attendance Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Monthly attendance percentage
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="month"
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