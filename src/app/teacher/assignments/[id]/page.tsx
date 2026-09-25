import TeacherAssignmentForm from "@/components/teacher/assignments/TeacherAssignmentForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TeacherAssignmentEditPage({
  params,
}: Props) {
  const { id } = await params;

  return <TeacherAssignmentForm assignmentId={id} />;
}