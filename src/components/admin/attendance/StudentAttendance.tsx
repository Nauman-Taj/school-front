
"use client";

import { useCallback, useEffect, useState } from "react";
import AttendanceTable from "@/components/admin/attendance/AttendanceTable";
import AttendanceMarkingPanel from "@/components/admin/attendance/AttendanceMarkingPanel";
import { fetchAttendance } from "@/lib/attendance-api";
import type { AttendanceRecord } from "@/types/attendance";

export default function StudentAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
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
    }
  }, []);

  useEffect(() => {
    void loadRecords();
  }, [loadRecords]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Student Attendance
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage student attendance records.
        </p>
      </div>

      <AttendanceMarkingPanel mode="student" />

      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Attendance History
        </h2>

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-6 text-center text-sm text-gray-500">
            Loading attendance history...
          </p>
        ) : (
          <AttendanceTable records={records} />
        )}
      </div>
    </div>
  );
}
