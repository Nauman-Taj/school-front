"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchAnnouncements } from "@/lib/announcements";
import type { Announcement } from "@/types/announcement";
import TeacherAnnouncementTable from "./TeacherAnnouncementTable";

export default function TeacherAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { let active = true; fetchAnnouncements().then((data) => { if (active) setAnnouncements(data); }).catch((err: unknown) => { if (active) setError(err instanceof Error ? err.message : "Unable to load announcements."); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  const filtered = useMemo(() => { const q = search.trim().toLowerCase(); return announcements.filter((item) => !q || [item.title, item.description, item.audience, item.date, item.status].join(" ").toLowerCase().includes(q)); }, [announcements, search]);
  return <div className="space-y-5"><div><h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Announcements</h1><p className="mt-1 text-sm text-gray-500 sm:text-base">View school announcements relevant to you.</p></div>{error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}{loading ? <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]"/><p className="mt-4 text-sm text-gray-500">Loading announcements...</p></div> : <TeacherAnnouncementTable announcements={filtered} search={search} setSearch={setSearch}/>}</div>;
}
