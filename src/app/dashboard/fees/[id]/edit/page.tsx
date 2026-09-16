import { notFound } from "next/navigation";

import { fees } from "@/data/fees";
import FeeForm from "@/components/fees/FeeForm";

type EditFeePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditFeePage({
  params,
}: EditFeePageProps) {
  const { id } = await params;

  const fee = fees.find((item) => item.id === id);

  if (!fee) {
    notFound();
  }

  return <FeeForm fee={fee} />;
}