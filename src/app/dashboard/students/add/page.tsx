import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StudentForm from "@/components/students/StudentForm";

export default function AddStudentPage() {
  return (
    <div className="space-y-5">
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