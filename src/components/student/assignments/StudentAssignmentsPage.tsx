import { students } from "@/data/students";
import { assignments } from "@/data/assignments";
import StudentAssignmentTable from "./StudentAssignmentTable";

export default function StudentAssignmentsPage() {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  const studentAssignments = currentStudent
    ? assignments.filter(
        (assignment) =>
          assignment.className === currentStudent.className &&
          assignment.section === currentStudent.section
      )
    : [];

  return (
    <main className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Assignments
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your assignments, submission status, and due dates.
        </p>
      </div>

      <StudentAssignmentTable
        assignments={studentAssignments}
      />
    </main>
  );
}