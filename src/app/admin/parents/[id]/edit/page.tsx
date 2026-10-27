
import { notFound } from "next/navigation";

import ParentEditLoader from "@/components/admin/parents/ParentEditLoader";

type EditParentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditParentPage({
  params,
}: EditParentPageProps) {
  const { id } = await params;
  const parentId = Number(id);

  if (!Number.isSafeInteger(parentId) || parentId <= 0) {
    notFound();
  }

  return <ParentEditLoader id={String(parentId)} />;
}
