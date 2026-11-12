import TeacherExamDetail from "@/components/teacher/exams/TeacherExamDetail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TeacherExamDetailPage({ params }: Props) {
  const { id } = await params;

  return <TeacherExamDetail examId={id} />;
}
