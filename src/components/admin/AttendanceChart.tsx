
"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { AttendanceRecord } from "@/types/attendance";

type AttendanceChartProps = {
  records: AttendanceRecord[];
};

export default function AttendanceChart({
  records,
}: AttendanceChartProps) {
  const studentRecords = records.filter(
    (record) => record.role === "Student"
  );

  const groupedRecords = new Map<
    string,
    AttendanceRecord[]
  >();

  studentRecords.forEach((record) => {
    const date = record.date;

    const existing = groupedRecords.get(date) ?? [];
    existing.push(record);
    groupedRecords.set(date, existing);
  });

  const attendanceChartData = Array.from(groupedRecords.entries())
    .sort(([dateA], [dateB]) => {
      const parseDate = (value: string) => {
        const [day, month, year] = value.split(" ");
        const monthIndex = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ].indexOf(month);

        return new Date(
          Number(year),
          monthIndex,
          Number(day)
        ).getTime();
      };

      return parseDate(dateA) - parseDate(dateB);
    })
    .map(([date, dayRecords]) => {
      const presentOrLate = dayRecords.filter(
        (record) =>
          record.status === "Present" || record.status === "Late"
      ).length;

      return {
        date,
        attendance:
          dayRecords.length > 0
            ? Number(
                ((presentOrLate / dayRecords.length) * 100).toFixed(1)
              )
            : 0,
      };
    });

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
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [`${value}%`, "Attendance"]}
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
