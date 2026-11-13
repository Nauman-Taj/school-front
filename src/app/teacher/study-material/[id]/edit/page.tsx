import StudyMaterialForm from "@/components/teacher/study-material/StudyMaterialForm";

type EditStudyMaterialPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditStudyMaterialPage({
  params,
}: EditStudyMaterialPageProps) {
  const { id } = await params;

  const materialId = Number(id);

  if (!Number.isInteger(materialId) || materialId < 1) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">
          Study material not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The requested study material does not exist.
        </p>
      </div>
    );
  }

  return <StudyMaterialForm materialId={materialId} />;
}
