import AnnouncementLoader from "@/components/admin/announcements/AnnouncementLoader";

export default async function EditAnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AnnouncementLoader id={id} mode="edit"/>;
}
