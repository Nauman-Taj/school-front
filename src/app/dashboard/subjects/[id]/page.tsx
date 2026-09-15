import { notFound } from "next/navigation";

import { subjects } from "@/data/subjects";
import SubjectProfile from "@/components/subjects/SubjectProfile";

type SubjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SubjectPage({
  params,
}: SubjectPageProps) {
  const { id } = await params;

  const subject = subjects.find((subject) => subject.id === id);

  if (!subject) {
    notFound();
  }

  return <SubjectProfile subject={subject} />;
}