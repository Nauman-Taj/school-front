"use client";

import { CalendarDays, Search } from "lucide-react";

import type { ApiStudentFee } from "@/lib/student-api";

type Props = {
  fees: ApiStudentFee[];
  search: string;
  setSearch: (value: string) => void;
  total: number;
};

const statusStyles: Record<string, string> = {
  Paid: "bg-green-50 text-green-700",
  Partial: "bg-yellow-50 text-yellow-700",
  Pending: "bg-red-50 text-red-700",
  Overdue: "bg-red-50 text-red-700",
};

export default function StudentFeeTable({
  fees,
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
            placeholder="Search fee records"
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
                <th className="px-5 py-4 font-semibold">Invoice</th>
                <th className="px-5 py-4 font-semibold">Fee Type</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
                <th className="px-5 py-4 font-semibold">Paid</th>
                <th className="px-5 py-4 font-semibold">Remaining</th>
                <th className="px-5 py-4 font-semibold">Due Date</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {fees.length > 0 ? (
                fees.map((fee) => (
                  <tr key={fee.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                          <CalendarDays size={18} />
                        </div>

                        <p className="font-medium text-gray-900">
                          {fee.invoiceNumber}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">{fee.feeType}</td>

                    <td className="px-5 py-4 text-gray-600">
                      Rs. {fee.amount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      Rs. {fee.paidAmount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      Rs. {fee.remainingAmount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-gray-600">{fee.dueDate}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                          statusStyles[fee.status] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {fee.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No fee records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {fees.length} of {total} fee records
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {fees.length > 0 ? (
          fees.map((fee) => (
            <div
              key={fee.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                    <CalendarDays size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">
                      {fee.feeType}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {fee.invoiceNumber} · due {fee.dueDate}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    statusStyles[fee.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {fee.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {fee.amount.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Paid</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {fee.paidAmount.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Remaining</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {fee.remainingAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            No fee records found.
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 md:hidden">
        Showing {fees.length} of {total} fee records
      </p>
    </div>
  );
}
