import { students } from "@/data/students";
import { timetable } from "@/data/timetable";

import StudentTimetableTable from "./StudentTimetableTable";

export default function StudentTimetablePage() {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  const studentTimetable = currentStudent
    ? timetable.filter(
        (entry) =>
          entry.className === currentStudent.className &&
          entry.section === currentStudent.section
      )
    : [];

  return (
    <main className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Timetable
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your weekly class timetable and schedule.
        </p>
      </div>

      <StudentTimetableTable timetable={studentTimetable} />
    </main>
  );
}