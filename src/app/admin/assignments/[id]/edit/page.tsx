import AssignmentLoader from "@/components/admin/assignments/AssignmentLoader";

type EditAssignmentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAssignmentPage({
  params,
}: EditAssignmentPageProps) {
  const { id } = await params;
  return <AssignmentLoader id={id} mode="edit" />;
}
