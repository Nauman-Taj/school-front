import { notFound } from "next/navigation";

import { subjects } from "@/data/subjects";
import SubjectForm from "@/components/subjects/SubjectForm";

type EditSubjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSubjectPage({
  params,
}: EditSubjectPageProps) {
  const { id } = await params;

  const subject = subjects.find((subject) => subject.id === id);

  if (!subject) {
    notFound();
  }

  return <SubjectForm subject={subject} isEdit />;
}