import TeacherExamForm from "@/components/teacher/exams/TeacherExamForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TeacherExamEditPage({
  params,
}: Props) {
  const { id } = await params;

  return <TeacherExamForm examId={id} />;
}