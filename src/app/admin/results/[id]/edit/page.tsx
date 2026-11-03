import ResultLoader from '@/components/admin/results/ResultLoader';

type EditResultPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditResultPage({ params }: EditResultPageProps) {
  const { id } = await params;
  return <ResultLoader id={id} mode="edit" />;
}
