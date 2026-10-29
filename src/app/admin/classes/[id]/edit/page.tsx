
import ClassForm from "@/components/admin/classes/ClassForm";

type EditClassPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditClassPage({
  params,
}: EditClassPageProps) {
  const { id } = await params;

  return <ClassForm classId={id} />;
}
