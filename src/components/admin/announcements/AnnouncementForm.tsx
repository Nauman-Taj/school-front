"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Announcement, AnnouncementAudience, AnnouncementStatus } from "@/types/announcement";
import { toApiAnnouncementAudience, toApiAnnouncementStatus } from "@/lib/announcements";

type Props = { mode?: "add" | "edit"; announcement?: Announcement };
const audiences: AnnouncementAudience[] = ["All", "Students", "Teachers", "Parents", "Staff"];
const statuses: AnnouncementStatus[] = ["Published", "Draft"];

export default function AnnouncementForm({ mode = "add", announcement }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(announcement?.title ?? "");
  const [description, setDescription] = useState(announcement?.description ?? "");
  const [audience, setAudience] = useState<AnnouncementAudience | "">(announcement?.audience ?? "");
  const [date, setDate] = useState(announcement?.date.slice(0, 10) ?? "");
  const [status, setStatus] = useState<AnnouncementStatus>(announcement?.status ?? "Draft");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const token = getAuthToken();
    if (!token) { setError("Your session has expired. Please log in again."); return; }
    if (!audience) { setError("Select an audience."); return; }
    setSaving(true);
    try {
      await apiRequest(mode === "edit" && announcement ? `/announcements/${announcement.id}` : "/announcements", {
        method: mode === "edit" ? "PATCH" : "POST", token,
        body: JSON.stringify({ title: title.trim(), description: description.trim(), audience: toApiAnnouncementAudience(audience), date, status: toApiAnnouncementStatus(status) }),
      });
      router.push("/admin/announcements"); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to save announcement."); }
    finally { setSaving(false); }
  }

  const inputClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10";
  const labelClass = "mb-2 block text-sm font-medium text-gray-700";
  return <div className="space-y-5">
    <Link href="/admin/announcements" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"><ArrowLeft size={17}/>Back to Announcements</Link>
    <div><h1 className="text-2xl font-bold text-gray-900">{mode === "edit" ? "Edit Announcement" : "Add Announcement"}</h1></div>
    <form onSubmit={handleSubmit} className="max-w-5xl rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      {error && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2"><label htmlFor="announcement-title" className={labelClass}>Title</label><input id="announcement-title" type="text" maxLength={160} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter announcement title" required className={inputClass}/></div>
        <div className="md:col-span-2"><label htmlFor="announcement-description" className={labelClass}>Description</label><textarea id="announcement-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Enter announcement description" rows={4} required className={`${inputClass} resize-none`}/></div>
        <div><label htmlFor="announcement-audience" className={labelClass}>Audience</label><select id="announcement-audience" value={audience} onChange={(event) => setAudience(event.target.value as AnnouncementAudience)} required className={inputClass}><option value="">Select audience</option>{audiences.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
        <div><label htmlFor="announcement-date" className={labelClass}>Date</label><input id="announcement-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} required className={inputClass}/></div>
        <div><label htmlFor="announcement-status" className={labelClass}>Status</label><select id="announcement-status" value={status} onChange={(event) => setStatus(event.target.value as AnnouncementStatus)} className={inputClass}>{statuses.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Link href="/admin/announcements" className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50">Cancel</Link><button type="submit" disabled={saving} className="rounded-full bg-[#01796f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Saving..." : mode === "edit" ? "Update Announcement" : "Add Announcement"}</button></div>
    </form>
  </div>;
}
