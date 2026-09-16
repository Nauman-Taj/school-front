import AttendanceTable from "@/components/attendance/AttendanceTable";
import { attendanceData } from "@/data/attendance";

export default function StudentAttendance() {
  const studentRecords = attendanceData.filter(
    (record) => record.role === "Student"
  );

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

      <AttendanceTable records={studentRecords} />
    </div>
  );
}