"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { fees } from "@/data/fees";
import { Fee } from "@/types/fee";

export default function FeeTable() {
  const [feeList, setFeeList] = useState<Fee[]>(fees);
  const [search, setSearch] = useState("");

  const filteredFees = feeList.filter((fee) =>
    [
      fee.studentName,
      fee.rollNo,
      fee.className,
      fee.feeType,
      fee.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this fee record?"
    );

    if (!confirmed) return;

    setFeeList((current) =>
      current.filter((fee) => fee.id !== id)
    );
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
            placeholder="Search fees"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-gray-600">
                  Student
                </th>

                <th className="px-5 py-4 font-semibold text-gray-600">
                  Class
                </th>

                <th className="px-5 py-4 font-semibold text-gray-600">
                  Fee Type
                </th>

                <th className="px-5 py-4 font-semibold text-gray-600">
                  Amount
                </th>

                <th className="px-5 py-4 font-semibold text-gray-600">
                  Due Date
                </th>

                <th className="px-5 py-4 text-center font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-5 py-4 text-center font-semibold text-gray-600">
                  Actions
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
                    <div>
                      <p className="font-medium text-gray-900">
                        {fee.studentName}
                      </p>

                      <p className="text-xs text-gray-400">
                        {fee.rollNo}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {fee.className}
                  </td>

                  <td className="px-5 py-4 text-gray-700">
                    {fee.feeType}
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-700">
                    Rs. {fee.amount.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {fee.dueDate}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${fee.status === "Paid"
                          ? "bg-green-50 text-green-600"
                          : fee.status === "Pending"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-red-50 text-red-600"
                        }`}
                    >
                      {fee.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/dashboard/fees/${fee.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                        title="View"
                      >
                        <Eye size={17} />
                      </Link>

                      <Link
                        href={`/dashboard/fees/${fee.id}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(fee.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {filteredFees.map((fee) => (
          <div
            key={fee.id}
            className="rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {fee.studentName}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {fee.rollNo} • {fee.className}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${fee.status === "Paid"
                    ? "bg-green-50 text-green-600"
                    : fee.status === "Pending"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-red-50 text-red-600"
                  }`}
              >
                {fee.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-400">
                  Fee Type
                </p>

                <p className="mt-1 font-medium text-gray-700">
                  {fee.feeType}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Amount
                </p>

                <p className="mt-1 font-medium text-gray-700">
                  Rs. {fee.amount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Due Date
                </p>

                <p className="mt-1 font-medium text-gray-700">
                  {fee.dueDate}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Paid Date
                </p>

                <p className="mt-1 font-medium text-gray-700">
                  {fee.paidDate || "—"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-100 pt-3">
              <Link
                href={`/dashboard/fees/${fee.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                title="View"
              >
                <Eye size={17} />
              </Link>

              <Link
                href={`/dashboard/fees/${fee.id}/edit`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                title="Edit"
              >
                <Pencil size={17} />
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(fee.id)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                title="Delete"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFees.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center">
          <p className="text-sm text-gray-500">
            No fee records found.
          </p>
        </div>
      )}
    </div>
  );
}