import StudentAssignmentDetails from "@/components/student-assignments/StudentAssignmentDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StudentAssignmentDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  return <StudentAssignmentDetails id={id} />;
}