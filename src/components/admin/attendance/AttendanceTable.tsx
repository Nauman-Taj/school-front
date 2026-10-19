"use client";

import { useState } from "react";
import { Check, Clock3, Plane, Trash2, X } from "lucide-react";

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

  return (
    <div className="space-y-3">
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Class / Department
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {visibleRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                visibleRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {record.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.role}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.role === "Student"
                        ? `${record.className}-${record.section}`
                        : record.department}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.date}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={record.status} />
                    </td>

                    <td className="px-6 py-4 text-center">
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
          </table>
        </div>
      </div>
    </div>
  );
}
