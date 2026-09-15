import { notFound } from "next/navigation";

import { assignments } from "@/data/assignments";
import AssignmentProfile from "@/components/assignments/AssignmentProfile";

type AssignmentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AssignmentPage({
  params,
}: AssignmentPageProps) {
  const { id } = await params;

  const assignment = assignments.find(
    (assignment) => assignment.id === id
  );

  if (!assignment) {
    notFound();
  }

  return <AssignmentProfile assignment={assignment} />;
}