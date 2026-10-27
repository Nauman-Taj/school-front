
import { notFound } from "next/navigation";

import ParentProfile from "@/components/admin/parents/ParentProfile";

type ParentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ParentPage({
  params,
}: ParentPageProps) {
  const { id } = await params;
  const parentId = Number(id);

  if (!Number.isInteger(parentId) || parentId < 1) {
    notFound();
  }

  return <ParentProfile parentId={parentId} />;
}
