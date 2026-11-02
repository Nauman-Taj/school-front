import ExamLoader from "@/components/admin/exams/ExamLoader";

type ExamPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ExamPage({
  params,
}: ExamPageProps) {
  const { id } = await params;

  return <ExamLoader id={id} mode="profile" />;
}
