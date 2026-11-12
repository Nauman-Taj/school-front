"use client";

import { useState } from "react";
import {
  Check,
  Clock3,
  AlertCircle,
  Search,
} from "lucide-react";

import { Fee } from "@/types/fee";

type ParentFeeTableProps = {
  fees: Fee[];
};

const statusStyles = {
  Paid: {
    className: "bg-green-50 text-green-700",
    icon: Check,
  },
  Partial: {
    className: "bg-yellow-50 text-yellow-700",
    icon: Clock3,
  },
  Pending: {
    className: "bg-blue-50 text-blue-700",
    icon: Clock3,
  },
  Overdue: {
    className: "bg-red-50 text-red-700",
    icon: AlertCircle,
  },
};

export default function ParentFeeTable({
  fees,
}: ParentFeeTableProps) {
  const [search, setSearch] = useState("");

  const filteredFees = fees.filter((fee) => {
    const searchTerm = search.toLowerCase();

    return (
      fee.student.toLowerCase().includes(searchTerm) ||
      fee.className.toLowerCase().includes(searchTerm) ||
      fee.section.toLowerCase().includes(searchTerm) ||
      fee.feeType.toLowerCase().includes(searchTerm) ||
      fee.status.toLowerCase().includes(searchTerm) ||
      fee.dueDate.toLowerCase().includes(searchTerm)
    );
  });

  const formatAmount = (amount: number) =>
    `Rs. ${amount.toLocaleString()}`;

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
                type="text"
                placeholder="Search fee records"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
              />
          </div>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-5 py-4 font-semibold">
                      Date
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Fee Type
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Amount
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Paid
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Remaining
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredFees.map((fee) => {
                    const status = statusStyles[fee.status];
                    const Icon = status.icon;

                    return (
                      <tr
                        key={fee.id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-5 py-4 text-gray-700">
                          {new Date(fee.dueDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>

                        <td className="px-5 py-4 font-medium text-gray-900">
                          {fee.feeType}
                        </td>

                        <td className="px-5 py-4 text-gray-700">
                          {formatAmount(fee.amount)}
                        </td>

                        <td className="px-5 py-4 text-green-600">
                          {formatAmount(fee.paidAmount)}
                        </td>

                        <td className="px-5 py-4 text-gray-700">
                          {formatAmount(fee.remainingAmount)}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                          >
                            <Icon size={14} />
                            {fee.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredFees.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-8 text-center text-sm text-gray-500"
                      >
                        No fee records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
          </div>
          <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
              Showing {filteredFees.length} of {fees.length} fee records
          </div>
      </div>

      {/* Mobile */}
      <p className="text-sm text-gray-500 md:hidden">
          Showing {filteredFees.length} of {fees.length} fee records
      </p>

      <div className="space-y-3 md:hidden">
        {filteredFees.map((fee) => {
          const status = statusStyles[fee.status];
          const Icon = status.icon;

          return (
            <div
              key={fee.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {fee.feeType}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {fee.className}-{fee.section}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                >
                  <Icon size={14} />
                  {fee.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Due Date
                  </span>

                  <span className="text-gray-700">
                    {new Date(fee.dueDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Amount
                  </span>

                  <span className="font-medium text-gray-900">
                    {formatAmount(fee.amount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Paid
                  </span>

                  <span className="text-green-600">
                    {formatAmount(fee.paidAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Remaining
                  </span>

                  <span className="font-medium text-gray-700">
                    {formatAmount(fee.remainingAmount)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredFees.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
            No fee records found.
          </div>
        )}
      </div>
    </div>
  );
}