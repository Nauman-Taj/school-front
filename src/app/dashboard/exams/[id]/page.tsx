import { notFound } from "next/navigation";

import { exams } from "@/data/exams";
import ExamProfile from "@/components/exams/ExamProfile";

type ExamPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ExamPage({
  params,
}: ExamPageProps) {
  const { id } = await params;

  const exam = exams.find((exam) => exam.id === id);

  if (!exam) {
    notFound();
  }

  return <ExamProfile exam={exam} />;
}