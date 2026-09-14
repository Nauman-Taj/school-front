import { notFound } from "next/navigation";

import ClassForm from "@/components/classes/ClassForm";
import { classes } from "@/data/classes";

type EditClassPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditClassPage({
  params,
}: EditClassPageProps) {
  const { id } = await params;

  const schoolClass = classes.find(
    (item) => item.id === Number(id)
  );

  if (!schoolClass) {
    notFound();
  }

  return <ClassForm schoolClass={schoolClass} />;
}