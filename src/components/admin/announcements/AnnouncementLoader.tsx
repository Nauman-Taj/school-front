"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { mapAnnouncement, type ApiAnnouncement } from "@/lib/announcements";
import type { Announcement } from "@/types/announcement";
import AnnouncementForm from "./AnnouncementForm";
import AnnouncementProfile from "./AnnouncementProfile";

export default function AnnouncementLoader({ id, mode }: { id: string; mode: "profile" | "edit" }) {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true); setError("");
      const token = getAuthToken();
      if (!token) { setError("Your session has expired. Please log in again."); setLoading(false); return; }
      try {
        const data = await apiRequest<ApiAnnouncement>(`/announcements/${encodeURIComponent(id)}`, { token });
        if (!cancelled) setAnnouncement(mapAnnouncement(data));
      } catch (err) { if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load announcement."); }
      finally { if (!cancelled) setLoading(false); }
    }
    void load();
    return () => { cancelled = true; };
  }, [id, retryCount]);

  if (loading) return <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]"/><p className="mt-4 text-sm text-gray-500">Loading announcement...</p></div>;
  if (error || !announcement) return <div className="space-y-4"><div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error || "Announcement not found."}</div><div className="flex gap-3"><button type="button" onClick={() => { setLoading(true); setRetryCount((count) => count + 1); }} className="rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]">Try again</button><Link href="/admin/announcements" className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700">Back to Announcements</Link></div></div>;
  return mode === "edit" ? <AnnouncementForm mode="edit" announcement={announcement}/> : <AnnouncementProfile announcement={announcement}/>;
}
