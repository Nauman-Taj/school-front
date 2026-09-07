import { notFound } from "next/navigation";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/students"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
          >
            <ArrowLeft size={17} />
            Back to Students
          </Link>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Edit Student
        </h1>

        {/* <p className="mt-1 text-sm text-gray-500">
          Update student information.
        </p> */}
      </div>

      <StudentForm student={student} />
    </div>
  );
}