"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Search,
} from "lucide-react";

import { Fee } from "@/types/fee";

type StudentFeeTableProps = {
  fees: Fee[];
};

export default function StudentFeeTable({
  fees,
}: StudentFeeTableProps) {
  const [search, setSearch] = useState("");

  const filteredFees = fees.filter((fee) =>
    `${fee.feeType} ${fee.status} ${fee.dueDate}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Fee Records
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your fee payment history.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fees..."
              className="w-full rounded-full border border-gray-200 py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[800px]">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Fee Type
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-gray-600">
                Amount
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-gray-600">
                Paid
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-gray-600">
                Remaining
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Due Date
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredFees.map((fee) => (
              <tr
                key={fee.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-5 py-4 text-sm font-medium text-gray-900">
                  {fee.feeType}
                </td>

                <td className="px-5 py-4 text-right text-sm text-gray-600">
                  Rs. {fee.amount.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-right text-sm text-gray-600">
                  Rs. {fee.paidAmount.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-right text-sm font-medium text-gray-900">
                  Rs. {fee.remainingAmount.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {fee.dueDate}
                </td>

                <td className="px-5 py-4 text-center">
                  <StatusBadge status={fee.status} />
                </td>
              </tr>
            ))}

            {filteredFees.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No fee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 p-4 md:hidden">
        {filteredFees.map((fee) => (
          <div
            key={fee.id}
            className="rounded-xl border border-gray-100 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {fee.feeType}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Rs. {fee.amount.toLocaleString()}
                </p>
              </div>

              <StatusBadge status={fee.status} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-400">
                  Paid
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  Rs. {fee.paidAmount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Remaining
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  Rs. {fee.remainingAmount.toLocaleString()}
                </p>
              </div>

              <div className="col-span-2">
                <p className="flex items-center gap-1.5 text-xs text-gray-400">
                  <CalendarDays size={14} />
                  Due Date
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {fee.dueDate}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredFees.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No fee records found.
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Fee["status"];
}) {
  const config = {
    Paid: {
      className: "bg-green-50 text-green-700",
      icon: <CheckCircle2 size={14} />,
    },
    Partial: {
      className: "bg-yellow-50 text-yellow-700",
      icon: <Clock3 size={14} />,
    },
    Pending: {
      className: "bg-red-50 text-red-700",
      icon: <Clock3 size={14} />,
    },
  };

  const current = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${current.className}`}
    >
      {current.icon}
      {status}
    </span>
  );
}