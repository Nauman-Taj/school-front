import StudentForm from "@/components/students/StudentForm";

export default function AddStudentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Add Student
        </h1>

        {/* <p className="mt-1 text-sm text-gray-500">
          Add a new student to the school system.
        </p> */}
      </div>

      <StudentForm />
    </div>
  );
}