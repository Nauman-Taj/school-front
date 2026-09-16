import { notFound } from "next/navigation";

import { results } from "@/data/results";
import ResultForm from "@/components/results/ResultForm";

type EditResultPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditResultPage({
  params,
}: EditResultPageProps) {
  const { id } = await params;

  const result = results.find((item) => item.id === id);

  if (!result) {
    notFound();
  }

  return <ResultForm result={result} />;
}