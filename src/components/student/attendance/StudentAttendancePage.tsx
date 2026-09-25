import StudentAttendanceTable from "./StudentAttendanceTable";

export default function StudentAttendancePage() {
  return (
    <main className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your attendance records and attendance summary.
        </p>
      </div>

      <StudentAttendanceTable />
    </main>
  );
}