import TeacherDetails from "@/components/teachers/TeacherDetails";

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