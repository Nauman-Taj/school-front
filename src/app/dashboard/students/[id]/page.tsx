import { notFound } from "next/navigation";

import StudentProfile from "@/components/students/StudentProfile";
import { students } from "@/data/students";

type StudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudentPage({
  params,
}: StudentPageProps) {
  const { id } = await params;

  const student = students.find(
    (student) => student.id === Number(id)
  );

  if (!student) {
    notFound();
  }

  return <StudentProfile student={student} />;
}