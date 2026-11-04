"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Announcement } from "@/types/announcement";
import AnnouncementTable from "./AnnouncementTable";
import { mapAnnouncement, type ApiAnnouncement } from "@/lib/announcements";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadAnnouncements = useCallback(async () => {
    setLoading(true);
    setError("");
    const token = getAuthToken();
    if (!token) {
      setError("Your session has expired. Please log in again.");
      setLoading(false);
      return;
    }
    try {
      const data = await apiRequest<ApiAnnouncement[]>("/announcements", { token });
      setAnnouncements(data.map(mapAnnouncement));
      setHasLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load announcements.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadAnnouncements(); }, [loadAnnouncements]);

  const handleDeleted = (id: number) => setAnnouncements((current) => current.filter((item) => item.id !== id));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Announcements</h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">Manage school announcements and notices.</p>
        </div>
        <Link href="/admin/announcements/add" className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"><Plus size={18} />Add Announcement</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "Total", value: announcements.length },
          { title: "Published", value: announcements.filter((item) => item.status === "Published").length },
          { title: "Drafts", value: announcements.filter((item) => item.status === "Draft").length },
        ].map((stat) => <div key={stat.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-gray-500">{stat.title}</p><p className="mt-2 text-2xl font-bold text-gray-900">{loading && !hasLoaded ? "0" : stat.value}</p></div>)}
      </div>

      {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><div className="flex flex-wrap items-center justify-between gap-3"><span>{error}</span><button type="button" onClick={() => void loadAnnouncements()} className="rounded-full border border-red-200 px-4 py-2 font-medium hover:bg-red-100">Try again</button></div></div>}
      {loading && !hasLoaded ? <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]"/><p className="mt-4 text-sm text-gray-500">Loading announcements...</p></div> : <AnnouncementTable announcements={announcements} loading={loading} onRefresh={() => void loadAnnouncements()} onDeleted={handleDeleted} />}
    </div>
  );
}
