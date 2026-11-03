
"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import AttendanceTable from "@/components/admin/attendance/AttendanceTable";
import AttendanceMarkingPanel from "@/components/admin/attendance/AttendanceMarkingPanel";
import { fetchAttendance } from "@/lib/attendance-api";
import type { AttendanceRecord } from "@/types/attendance";

export default function StudentAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchAttendance();
      setRecords(data.filter((record) => record.role === "Student"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load attendance.");
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    void loadRecords();
  }, [loadRecords]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Student Attendance
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage student attendance records.
        </p>
        </div>
        <button
          type="button"
          onClick={() => void loadRecords()}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <AttendanceMarkingPanel mode="student" />

      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Attendance History</h2>
          <p className="mt-1 text-sm text-gray-500">Review recorded student attendance.</p>
        </div>

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {loading && !hasLoaded ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
            <p className="mt-4 text-sm text-gray-500">Loading attendance history...</p>
          </div>
        ) : hasLoaded ? (
          <AttendanceTable records={records} />
        ) : null}
      </div>
    </div>
  );
}
