
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Eye, Pencil, Trash2, RefreshCw } from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { Fee } from "@/types/fee";

type ApiFee = {
  id: string;
  studentId: number;
  student: string;
  className: string;
  section: string;
  feeType: string;
  amount: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string;
  status: Fee["status"];
};

function formatAmount(amount: number) {
  return `Rs. ${Number(amount).toLocaleString("en-PK")}`;
}

function formatDate(date: string) {
  if (!date) return "—";

  const [year, month, day] = date.slice(0, 10).split("-");
  return `${day}-${month}-${year}`;
}

function statusClasses(status: string) {
  switch (status) {
    case "Paid":
      return "bg-green-50 text-green-600";
    case "Partial":
      return "bg-blue-50 text-blue-600";
    case "Pending":
      return "bg-yellow-50 text-yellow-600";
    case "Overdue":
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function FeeTable() {
  const [feeList, setFeeList] = useState<ApiFee[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFees() {
      setLoading(true);
      setError("");

      try {
        const token = getAuthToken();

        if (!token) {
          throw new Error("Your session has expired. Please log in again.");
        }

        const data = await apiRequest<ApiFee[]>("/fees", { token });

        if (active) {
          setFeeList(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load fee records.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadFees();

    return () => {
      active = false;
    };
  }, []);

  const filteredFees = feeList.filter((fee) =>
    [
      fee.id,
      fee.student,
      fee.studentId,
      fee.className,
      fee.section,
      fee.feeType,
      fee.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  async function reloadFees() {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const data = await apiRequest<ApiFee[]>("/fees", { token });
      setFeeList(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load fee records.",
      );
    } finally {
      setLoading(false);
    }
  }

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
          placeholder="Search by student, class, fee type, status or invoice ID"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center">
          <RefreshCw
            size={22}
            className="mx-auto animate-spin text-[#01796f]"
          />
          <p className="mt-3 text-sm text-gray-500">
            Loading fee records...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-white p-6 text-center">
          <p className="text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={reloadFees}
            className="mt-4 rounded-full bg-[#01796f] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="text-sm text-gray-500">
            Showing {filteredFees.length} of {feeList.length} fee records
          </p>

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
                        <p className="font-medium text-gray-900">
                          {fee.student}
                        </p>
                        <p className="text-xs text-gray-400">
                          Student ID: {fee.studentId} · Invoice: {fee.id}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {fee.className}
                        {fee.section ? `-${fee.section}` : ""}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {fee.feeType}
                      </td>

                      <td className="px-5 py-4 font-medium text-gray-700">
                        {formatAmount(fee.amount)}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(fee.dueDate)}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClasses(fee.status)}`}
                        >
                          {fee.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/fees/${fee.id}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                            title="View"
                          >
                            <Eye size={17} />
                          </Link>

                          <Link
                            href={`/admin/fees/${fee.id}/edit`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                            title="Edit"
                          >
                            <Pencil size={17} />
                          </Link>

                          <button
                            type="button"
                            disabled
                            className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg text-gray-300"
                            title="Delete API not implemented yet"
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
                      {fee.student}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                      Student ID: {fee.studentId} · {fee.className}
                      {fee.section ? `-${fee.section}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Invoice: {fee.id}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses(fee.status)}`}
                  >
                    {fee.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Fee Type</p>
                    <p className="mt-1 font-medium text-gray-700">
                      {fee.feeType}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Total Amount</p>
                    <p className="mt-1 font-medium text-gray-700">
                      {formatAmount(fee.amount)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Paid Amount</p>
                    <p className="mt-1 font-medium text-green-700">
                      {formatAmount(fee.paidAmount)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Remaining Amount</p>
                    <p className="mt-1 font-medium text-gray-700">
                      {formatAmount(fee.remainingAmount)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Due Date</p>
                    <p className="mt-1 font-medium text-gray-700">
                      {formatDate(fee.dueDate)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-100 pt-3">
                  <Link
                    href={`/admin/fees/${fee.id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                    title="View"
                  >
                    <Eye size={17} />
                  </Link>

                  <Link
                    href={`/admin/fees/${fee.id}/edit`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                    title="Edit"
                  >
                    <Pencil size={17} />
                  </Link>

                  <button
                    type="button"
                    disabled
                    className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg text-gray-300"
                    title="Delete API not implemented yet"
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
        </>
      )}
    </div>
  );
}
