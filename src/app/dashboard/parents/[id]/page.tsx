import { notFound } from "next/navigation";

import ParentProfile from "@/components/parents/ParentProfile";
import { parents } from "@/data/parents";

type ParentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ParentPage({
  params,
}: ParentPageProps) {
  const { id } = await params;

  const parent = parents.find(
    (parent) => parent.id === Number(id)
  );

  if (!parent) {
    notFound();
  }

  return <ParentProfile parent={parent} />;
}