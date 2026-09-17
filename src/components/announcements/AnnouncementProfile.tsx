import Link from "next/link";
import {
  ArrowLeft,
  Megaphone,
  Pencil,
  Users,
  CalendarDays,
} from "lucide-react";

import { Announcement } from "@/types/announcement";

type AnnouncementProfileProps = {
  announcement: Announcement;
};

export default function AnnouncementProfile({
  announcement,
}: AnnouncementProfileProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/dashboard/announcements"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
        >
          <ArrowLeft size={17} />
          Back to Announcements
        </Link>

        <Link
          href={`/dashboard/announcements/${announcement.id}/edit`}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
        >
          <Pencil size={17} />
          Edit Announcement
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Announcement Details
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View announcement information.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e6f4f2] text-[#01796F]">
            <Megaphone size={27} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              {announcement.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {announcement.description}
            </p>
          </div>

          <StatusBadge status={announcement.status} />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <DetailItem
            icon={Users}
            label="Audience"
            value={announcement.audience}
          />

          <DetailItem
            icon={CalendarDays}
            label="Date"
            value={announcement.date}
          />
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <div className="flex items-center gap-2 text-gray-400">
        <Icon size={17} />
        <p className="text-xs font-medium">{label}</p>
      </div>

      <p className="mt-2 text-sm font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Announcement["status"];
}) {
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${
        status === "Published"
          ? "bg-green-50 text-green-600"
          : "bg-yellow-50 text-yellow-600"
      }`}
    >
      {status}
    </span>
  );
}