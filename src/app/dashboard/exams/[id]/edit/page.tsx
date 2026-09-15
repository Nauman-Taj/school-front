import { notFound } from "next/navigation";

import { exams } from "@/data/exams";
import ExamForm from "@/components/exams/ExamForm";

type EditExamPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditExamPage({
  params,
}: EditExamPageProps) {
  const { id } = await params;

  const exam = exams.find((exam) => exam.id === id);

  if (!exam) {
    notFound();
  }

  return <ExamForm exam={exam} isEdit />;
}