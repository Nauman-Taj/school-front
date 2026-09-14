import { notFound } from "next/navigation";

import ClassProfile from "@/components/classes/ClassProfile";
import { classes } from "@/data/classes";

type ClassProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClassProfilePage({
  params,
}: ClassProfilePageProps) {
  const { id } = await params;

  const schoolClass = classes.find(
    (item) => item.id === Number(id)
  );

  if (!schoolClass) {
    notFound();
  }

  return <ClassProfile schoolClass={schoolClass} />;
}