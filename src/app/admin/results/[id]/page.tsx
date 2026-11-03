import ResultLoader from '@/components/admin/results/ResultLoader';

type ResultDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ResultDetailsPage({ params }: ResultDetailsPageProps) {
  const { id } = await params;
  return <ResultLoader id={id} mode="profile" />;
}
