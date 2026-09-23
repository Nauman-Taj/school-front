"use client";

import { useState } from "react";
import {
  Check,
  Clock3,
  Search,
  X,
} from "lucide-react";

import { ParentAttendanceRecord } from "@/types/parentAttendance";

type ParentAttendanceTableProps = {
  records: ParentAttendanceRecord[];
};

const statusStyles = {
  Present: {
    className: "bg-green-50 text-green-700",
    icon: Check,
  },
  Absent: {
    className: "bg-red-50 text-red-700",
    icon: X,
  },
  Late: {
    className: "bg-yellow-50 text-yellow-700",
    icon: Clock3,
  },
};

export default function ParentAttendanceTable({
  records,
}: ParentAttendanceTableProps) {
  const [search, setSearch] = useState("");

  const filteredRecords = records.filter((record) => {
    const searchTerm = search.toLowerCase();

    return (
      record.childName.toLowerCase().includes(searchTerm) ||
      record.className.toLowerCase().includes(searchTerm) ||
      record.date.toLowerCase().includes(searchTerm) ||
      record.status.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search attendance"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
        />
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Child</th>
              <th className="px-6 py-4 font-medium">Class</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.map((record) => {
              const status = statusStyles[record.status];
              const Icon = status.icon;

              return (
                <tr
                  key={record.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(record.date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {record.childName}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {record.className}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                    >
                      <Icon size={14} />
                      {record.status}
                    </span>
                  </td>
                </tr>
              );
            })}

            {filteredRecords.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {filteredRecords.map((record) => {
          const status = statusStyles[record.status];
          const Icon = status.icon;

          return (
            <div
              key={record.id}
              className="rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {record.childName}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {record.className}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                >
                  <Icon size={14} />
                  {record.status}
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                {new Date(record.date).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          );
        })}

        {filteredRecords.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
            No attendance records found.
          </div>
        )}
      </div>
    </div>
  );
}

