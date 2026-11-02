
import SubjectLoader from "@/components/admin/subjects/SubjectLoader";

type EditSubjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSubjectPage({
  params,
}: EditSubjectPageProps) {
  const { id } = await params;

  return <SubjectLoader subjectId={id} mode="edit" />;
}
