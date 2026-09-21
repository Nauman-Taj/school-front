import { notFound } from "next/navigation";

import ParentForm from "@/components/parents/ParentForm";
import { parents } from "@/data/parents";

type EditParentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditParentPage({
  params,
}: EditParentPageProps) {
  const { id } = await params;

  const parent = parents.find(
    (parent) => parent.id === Number(id)
  );

  if (!parent) {
    notFound();
  }

  return <ParentForm parent={parent} mode="edit" />;
}