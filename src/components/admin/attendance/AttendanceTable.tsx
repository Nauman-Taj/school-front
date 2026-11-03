"use client";

import { useState } from "react";
import { Check, Clock3, Plane, Search, Trash2, X } from "lucide-react";

import { AttendanceRecord } from "@/types/attendance";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type AttendanceTableProps = {
  records: AttendanceRecord[];
  onDeleted?: (recordId: AttendanceRecord["id"]) => void;
};

function StatusBadge({
  status,
}: {
  status: AttendanceRecord["status"];
}) {
  const styles = {
    Present: "bg-green-50 text-green-700",
    Absent: "bg-red-50 text-red-700",
    Late: "bg-yellow-50 text-yellow-700",
    Leave: "bg-blue-50 text-blue-700",
  };

  const icons = {
    Present: <Check size={14} />,
    Absent: <X size={14} />,
    Late: <Clock3 size={14} />,
    Leave: <Plane size={14} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

export default function AttendanceTable({
  records,
  onDeleted,
}: AttendanceTableProps) {
  const [deletingId, setDeletingId] = useState<
    AttendanceRecord["id"] | null
  >(null);

  const [deletedIds, setDeletedIds] = useState<
    AttendanceRecord["id"][]
  >([]);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const handleDelete = async (record: AttendanceRecord) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the attendance record for ${record.name} dated ${record.date}?`
    );

    if (!confirmed) {
      return;
    }

    setError("");

    const token = getAuthToken();

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    setDeletingId(record.id);

    try {
      await apiRequest(
        `/attendance/${encodeURIComponent(String(record.id))}`,
        {
          method: "DELETE",
          token,
        }
      );

      setDeletedIds((previous) =>
        previous.includes(record.id)
          ? previous
          : [...previous, record.id]
      );

      onDeleted?.(record.id);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete the attendance record. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const visibleRecords = records.filter(
    (record) => !deletedIds.includes(record.id)
  );
  const filteredRecords = visibleRecords.filter((record) =>
    (record.role === "Student"
      ? [record.name, record.role, record.className, record.section, record.date, record.status]
      : [record.name, record.role, record.department, record.date, record.status])
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  return (
    <div className="space-y-5">
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, class, date or status"
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796f] focus:bg-white focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  Name
                </th>

                <th className="px-5 py-4 font-semibold">
                  Type
                </th>

                <th className="px-5 py-4 font-semibold">
                  Class / Department
                </th>

                <th className="px-5 py-4 font-semibold">
                  Date
                </th>

                <th className="px-5 py-4 text-center font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    {search.trim()
                      ? "No attendance records match your search."
                      : "No attendance records found."}
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {record.name}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {record.role}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {record.role === "Student"
                        ? `${record.className}-${record.section}`
                        : record.department}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {record.date}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <StatusBadge status={record.status} />
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleDelete(record)}
                        disabled={deletingId !== null}
                        aria-label={`Delete attendance record for ${record.name}`}
                        title="Delete attendance record"
                        className="inline-flex items-center justify-center rounded-full p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={17} />
                        <span className="sr-only">
                          {deletingId === record.id
                            ? "Deleting..."
                            : "Delete"}
                        </span>
                      </button>

                      {deletingId === record.id && (
                        <span className="ml-1 text-xs text-gray-500">
                          Deleting...
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* <tfoot className="border-t border-gray-100 bg-gray-50">
              <tr>
                <td colSpan={6} className="px-5 py-3 text-sm text-gray-500">
                  Showing {filteredRecords.length} of {visibleRecords.length} records
                </td>
              </tr>
            </tfoot> */}
          </table>
        </div>
        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {filteredRecords.length} of {visibleRecords.length} records
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {filteredRecords.map((record) => (
          <article key={record.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900">{record.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{record.role}</p>
              </div>
              <StatusBadge status={record.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">Class / Department</p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {record.role === "Student"
                    ? `${record.className}-${record.section}`
                    : record.department || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Date</p>
                <p className="mt-1 text-sm font-medium text-gray-700">{record.date}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-center border-t border-gray-100 pt-3">
              <button
                type="button"
                onClick={() => void handleDelete(record)}
                disabled={deletingId !== null}
                aria-label={`Delete attendance record for ${record.name}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </article>
        ))}
        {filteredRecords.length === 0 && (
          <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            {search.trim()
              ? "No attendance records match your search."
              : "No attendance records found."}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 lg:hidden">
        Showing {filteredRecords.length} of {visibleRecords.length} records
      </p>
    </div>
  );
}
