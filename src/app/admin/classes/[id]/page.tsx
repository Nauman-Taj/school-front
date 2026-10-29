
import ClassRecordLoader from "@/components/admin/classes/ClassRecordLoader";

type ClassProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClassProfilePage({
  params,
}: ClassProfilePageProps) {
  const { id } = await params;

  return <ClassRecordLoader id={id} />;
}
