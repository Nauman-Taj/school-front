"use client";

import { CalendarCheck, Check, Clock3, Search, X } from "lucide-react";

import type { AttendanceStatus } from "@/types/attendance";

type Props = {
  records: { id: number; date: string; status: AttendanceStatus }[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
};

const statusStyles: Record<AttendanceStatus, string> = {
  Present: "bg-green-50 text-green-700",
  Absent: "bg-red-50 text-red-700",
  Late: "bg-yellow-50 text-yellow-700",
  Leave: "bg-blue-50 text-blue-700",
};

const statusIcons = {
  Present: Check,
  Absent: X,
  Late: Clock3,
  Leave: CalendarCheck,
};

export default function StudentAttendanceTable({
  records,
  search,
  setSearch,
  total,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            placeholder="Search attendance"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {records.length > 0 ? (
                records.map((record) => {
                  const Icon = statusIcons[record.status];

                  return (
                    <tr
                      key={record.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 text-gray-700">
                        {record.date}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[record.status]}`}
                        >
                          <Icon size={15} />
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {records.length} of {total} records
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {records.length > 0 ? (
          records.map((record) => {
            const Icon = statusIcons[record.status];

            return (
              <div
                key={record.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-gray-900">
                    {record.date}
                  </p>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[record.status]}`}
                  >
                    <Icon size={15} />
                    {record.status}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            No attendance records found.
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 md:hidden">
        Showing {records.length} of {total} records
      </p>
    </div>
  );
}
