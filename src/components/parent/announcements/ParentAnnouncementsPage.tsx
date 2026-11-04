"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchAnnouncements } from "@/lib/announcements";
import type { Announcement } from "@/types/announcement";
import ParentAnnouncementTable from "./ParentAnnouncementTable";

export default function ParentAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { let active = true; fetchAnnouncements().then((data) => { if (active) setAnnouncements(data); }).catch((err: unknown) => { if (active) setError(err instanceof Error ? err.message : "Unable to load announcements."); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  const stats = useMemo(() => [{ title: "Total", value: announcements.length }, { title: "For Everyone", value: announcements.filter((item) => item.audience === "All").length }, { title: "For Parents", value: announcements.filter((item) => item.audience === "Parents").length }, { title: "Published", value: announcements.filter((item) => item.status === "Published").length }], [announcements]);
  return <div className="space-y-5"><div><h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Announcements</h1><p className="mt-1 text-sm text-gray-500 sm:text-base">View school announcements and important updates for parents.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map((stat) => <div key={stat.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-gray-500">{stat.title}</p><p className="mt-2 text-2xl font-bold text-gray-900">{loading ? "—" : stat.value}</p></div>)}</div>{error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}<div><div className="mb-4"><h2 className="text-lg font-semibold text-gray-800">School Announcements</h2><p className="mt-1 text-sm text-gray-500">Latest published announcements available to parents.</p></div>{loading ? <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]"/><p className="mt-4 text-sm text-gray-500">Loading announcements...</p></div> : <ParentAnnouncementTable announcements={announcements}/>}</div></div>;
}
