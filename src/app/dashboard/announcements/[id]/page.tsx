import { notFound } from "next/navigation";

import { announcements } from "@/data/announcements";
import AnnouncementProfile from "@/components/announcements/AnnouncementProfile";

type AnnouncementPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AnnouncementDetailsPage({
  params,
}: AnnouncementPageProps) {
  const { id } = await params;

  const announcement = announcements.find(
    (item) => item.id === Number(id)
  );

  if (!announcement) {
    notFound();
  }

  return (
    <AnnouncementProfile announcement={announcement} />
  );
}