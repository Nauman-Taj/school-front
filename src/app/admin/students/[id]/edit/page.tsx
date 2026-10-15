import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import StudentRecordLoader from "@/components/admin/students/StudentRecordLoader";

type EditStudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
        >
          <ArrowLeft size={17} />
          Back to Students
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Edit Student
        </h1>
      </div>

      <StudentRecordLoader id={id} mode="edit" />
    </div>
  );
}