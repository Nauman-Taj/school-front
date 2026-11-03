import AssignmentLoader from "@/components/admin/assignments/AssignmentLoader";

type AssignmentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AssignmentPage({
  params,
}: AssignmentPageProps) {
  const { id } = await params;
  return <AssignmentLoader id={id} mode="profile" />;
}
