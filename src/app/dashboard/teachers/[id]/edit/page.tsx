import TeacherForm from "@/components/teachers/TeacherForm";

type EditTeacherPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTeacherPage({
  params,
}: EditTeacherPageProps) {
  const { id } = await params;

  return <TeacherForm mode="edit" teacherId={id} />;
}