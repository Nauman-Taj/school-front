"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

import { ParentFee } from "@/types/parentFee";

type ParentFeeTableProps = {
  fees: ParentFee[];
};

export default function ParentFeeTable({
  fees,
}: ParentFeeTableProps) {
  const [search, setSearch] = useState("");

  const filteredFees = fees.filter((fee) =>
    `${fee.childName} ${fee.className} ${fee.feeType} ${fee.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatusStyles = (status: ParentFee["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-green-50 text-green-700";
      case "Pending":
        return "bg-yellow-50 text-yellow-700";
      case "Overdue":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getStatusIcon = (status: ParentFee["status"]) => {
    switch (status) {
      case "Paid":
        return <CheckCircle size={16} />;
      case "Pending":
        return <Clock size={16} />;
      case "Overdue":
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

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
          placeholder="Search child, class, fee type or status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Child
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Class
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Fee Type
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Amount
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Due Date
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredFees.map((fee) => (
                <tr
                  key={fee.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {fee.childName}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {fee.className}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {fee.feeType}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    Rs. {fee.amount.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {fee.dueDate}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(
                        fee.status
                      )}`}
                    >
                      {getStatusIcon(fee.status)}
                      {fee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFees.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-gray-500">
            No fee records found.
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {filteredFees.map((fee) => (
          <div
            key={fee.id}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {fee.childName}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {fee.className}
                </p>
              </div>

              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(
                  fee.status
                )}`}
              >
                {getStatusIcon(fee.status)}
                {fee.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">
                  Fee Type
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {fee.feeType}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Amount
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  Rs. {fee.amount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Due Date
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {fee.dueDate}
                </p>
              </div>

              {fee.paidDate && (
                <div>
                  <p className="text-xs text-gray-400">
                    Paid Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {fee.paidDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredFees.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center text-sm text-gray-500">
            No fee records found.
          </div>
        )}
      </div>
    </div>
  );
}