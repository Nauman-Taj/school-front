import { notFound } from "next/navigation";

import { results } from "@/data/results";
import ResultProfile from "@/components/results/ResultProfile";

type ResultDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ResultDetailsPage({
  params,
}: ResultDetailsPageProps) {
  const { id } = await params;

  const result = results.find((item) => item.id === id);

  if (!result) {
    notFound();
  }

  return <ResultProfile result={result} />;
}