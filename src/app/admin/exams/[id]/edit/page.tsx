import ExamLoader from "@/components/admin/exams/ExamLoader";

type EditExamPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditExamPage({
  params,
}: EditExamPageProps) {
  const { id } = await params;

  return <ExamLoader id={id} mode="edit" />;
}
