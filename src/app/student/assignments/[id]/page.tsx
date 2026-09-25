import StudentAssignmentDetails from "@/components/student/assignments/StudentAssignmentDetails";

interface StudentAssignmentDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentAssignmentDetailsPage({
  params,
}: StudentAssignmentDetailsPageProps) {
  const { id } = await params;

  return <StudentAssignmentDetails assignmentId={id} />;
}