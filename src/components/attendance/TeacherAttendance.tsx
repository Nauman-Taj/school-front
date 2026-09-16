import AttendanceTable from "@/components/attendance/AttendanceTable";
import { attendanceData } from "@/data/attendance";

export default function TeacherAttendance() {
  const teacherRecords = attendanceData.filter(
    (record) => record.role === "Teacher"
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Teacher Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage teacher attendance records.
        </p>
      </div>

      <AttendanceTable records={teacherRecords} />
    </div>
  );
}