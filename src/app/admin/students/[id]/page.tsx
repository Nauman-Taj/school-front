import StudentRecordLoader from "@/components/admin/students/StudentRecordLoader";

type StudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudentPage({
  params,
}: StudentPageProps) {
  const { id } = await params;

  return <StudentRecordLoader id={id} mode="view" />;
}