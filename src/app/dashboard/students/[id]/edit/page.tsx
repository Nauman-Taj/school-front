import { notFound } from "next/navigation";

import StudentForm from "@/components/students/StudentForm";
import { students } from "@/data/students";

type EditStudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  const { id } = await params;

  const student = students.find(
    (student) => student.id === Number(id)
  );

  if (!student) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Student
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update student information.
        </p>
      </div>

      <StudentForm student={student} />
    </div>
  );
}