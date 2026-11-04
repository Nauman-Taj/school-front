import AnnouncementLoader from "@/components/admin/announcements/AnnouncementLoader";

export default async function AnnouncementDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AnnouncementLoader id={id} mode="profile"/>;
}
