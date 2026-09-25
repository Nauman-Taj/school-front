import TeacherDetails from "@/components/admin/teachers/TeacherDetails";

type TeacherDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TeacherDetailsPage({
  params,
}: TeacherDetailsPageProps) {
  const { id } = await params;

  return <TeacherDetails teacherId={id} />;
}