import { notFound } from "next/navigation";

import { fees } from "@/data/fees";
import FeeProfile from "@/components/fees/FeeProfile";

type FeeDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FeeDetailsPage({
  params,
}: FeeDetailsPageProps) {
  const { id } = await params;

  const fee = fees.find((item) => item.id === id);

  if (!fee) {
    notFound();
  }

  return <FeeProfile fee={fee} />;
}