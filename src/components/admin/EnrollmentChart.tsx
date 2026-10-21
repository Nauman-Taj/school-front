
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

import type { ApiStudent } from "@/lib/attendance-api";

type EnrollmentChartProps = {
  students: ApiStudent[];
};

export default function EnrollmentChart({
  students,
}: EnrollmentChartProps) {
  const enrollmentCounts = students.reduce<Record<string, number>>(
    (counts, student) => {
      const className = student.className?.trim() || "Unassigned";
      counts[className] = (counts[className] || 0) + 1;
      return counts;
    },
    {},
  );

  const enrollmentData = Object.entries(enrollmentCounts)
    .map(([className, count]) => ({
      className,
      students: count,
    }))
    .sort((a, b) =>
      a.className.localeCompare(b.className, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Student Enrollment
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Student enrollment by class
        </p>
      </div>

      <div className="h-72">
        {enrollmentData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No student enrollment data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={enrollmentData}
              margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="className"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                interval={0}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value) => [value, "Students"]}
                labelFormatter={(label) => `Class: ${label}`}
              />

              <Bar
                dataKey="students"
                name="Students"
                fill="#01796f"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
