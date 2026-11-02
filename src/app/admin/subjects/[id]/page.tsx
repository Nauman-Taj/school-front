
import SubjectLoader from "@/components/admin/subjects/SubjectLoader";

type SubjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SubjectPage({
  params,
}: SubjectPageProps) {
  const { id } = await params;

  return <SubjectLoader subjectId={id} mode="profile" />;
}
