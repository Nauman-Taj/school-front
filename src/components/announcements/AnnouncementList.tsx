import { CalendarDays, Megaphone } from "lucide-react";
import { announcements } from "@/data/announcements";

export default function AnnouncementList() {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
        >
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
              <Megaphone size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                {announcement.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {announcement.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <CalendarDays size={15} />
                <span>{announcement.date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}