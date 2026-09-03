import AnnouncementList from "@/components/announcements/AnnouncementList";

export default function AnnouncementsPage() {
  return (
    <main className="space-y-8">
      {/* <div className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="mb-8"> */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Announcements
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage and view important school announcements.
          </p>
        </div>

        <AnnouncementList />
      {/* </div> */}
    </main>
  );
}