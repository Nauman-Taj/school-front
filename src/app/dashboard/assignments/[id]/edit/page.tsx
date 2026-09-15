import { notFound } from "next/navigation";

import { assignments } from "@/data/assignments";
import AssignmentForm from "@/components/assignments/AssignmentForm";

type EditAssignmentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAssignmentPage({
  params,
}: EditAssignmentPageProps) {
  const { id } = await params;

  const assignment = assignments.find(
    (assignment) => assignment.id === id
  );

  if (!assignment) {
    notFound();
  }

  return (
    <AssignmentForm
      assignment={assignment}
      isEdit
    />
  );
}