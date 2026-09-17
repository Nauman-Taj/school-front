import { notFound } from "next/navigation";

import { announcements } from "@/data/announcements";
import AnnouncementForm from "@/components/announcements/AnnouncementForm";

type EditAnnouncementPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAnnouncementPage({
  params,
}: EditAnnouncementPageProps) {
  const { id } = await params;

  const announcement = announcements.find(
    (item) => item.id === Number(id)
  );

  if (!announcement) {
    notFound();
  }

  return (
    <AnnouncementForm
      mode="edit"
      announcement={announcement}
    />
  );
}