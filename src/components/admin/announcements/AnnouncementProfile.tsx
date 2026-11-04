import Link from "next/link";
import { ArrowLeft, CalendarDays, Megaphone, Pencil, Users } from "lucide-react";
import type { Announcement } from "@/types/announcement";

export default function AnnouncementProfile({ announcement }: { announcement: Announcement }) {
  return <div className="space-y-5">
    <Link href="/admin/announcements" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"><ArrowLeft size={17}/>Back to Announcements</Link>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-2xl font-bold text-gray-900">Announcement Details</h1></div><Link href={`/admin/announcements/${announcement.id}/edit`} className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"><Pencil size={17}/>Edit Announcement</Link></div>
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e6f4f2] text-[#01796F]"><Megaphone size={27}/></div><div className="min-w-0 flex-1"><h2 className="text-xl font-bold text-gray-900">{announcement.title}</h2><p className="mt-1 text-sm text-gray-500">{announcement.description}</p></div><span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${announcement.status === "Published" ? "bg-[#e6f4f2] text-[#01796f]" : "bg-gray-100 text-gray-600"}`}>{announcement.status}</span></div><div className="mt-6 grid gap-5 sm:grid-cols-2"><Detail icon={Users} label="Audience" value={announcement.audience}/><Detail icon={CalendarDays} label="Date" value={announcement.date}/></div></div>
  </div>;
}

function Detail({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) { return <div className="rounded-xl bg-gray-50 p-4"><div className="flex items-center gap-2 text-gray-400"><Icon size={17}/><p className="text-xs font-medium">{label}</p></div><p className="mt-2 text-sm font-semibold text-gray-800">{value}</p></div>; }
