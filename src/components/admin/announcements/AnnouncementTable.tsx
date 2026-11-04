"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Megaphone, Pencil, RefreshCw, Search, Trash2 } from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Announcement } from "@/types/announcement";

type Props = { announcements: Announcement[]; loading: boolean; onRefresh: () => void; onDeleted: (id: number) => void };

export default function AnnouncementTable({ announcements, loading, onRefresh, onDeleted }: Props) {
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? announcements.filter((item) => [item.title, item.description, item.audience, item.date, item.status].join(" ").toLowerCase().includes(query)) : announcements;
  }, [announcements, search]);

  async function handleDelete(item: Announcement) {
    if (deletingId !== null || !window.confirm(`Delete announcement “${item.title}”?`)) return;
    setDeletingId(item.id); setError("");
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Your session has expired. Please log in again.");
      await apiRequest(`/announcements/${item.id}`, { method: "DELETE", token });
      onDeleted(item.id);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to delete announcement."); }
    finally { setDeletingId(null); }
  }

  return <div className="space-y-5">
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search announcements" className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796f] focus:bg-white focus:ring-2 focus:ring-[#01796f]/10"/></div>
      <button type="button" onClick={onRefresh} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"><RefreshCw size={16} className={loading ? "animate-spin" : ""}/>Refresh</button>
    </div></div>
    {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
    {loading ? <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]"/><p className="mt-4 text-sm text-gray-500">Loading announcements...</p></div> : <>
    <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block"><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-gray-50 text-gray-700"><tr><th className="px-5 py-4 font-semibold">Announcement</th><th className="px-5 py-4 font-semibold">Audience</th><th className="px-5 py-4 font-semibold">Date</th><th className="px-5 py-4 font-semibold">Status</th><th className="px-5 py-4 text-center font-semibold">Actions</th></tr></thead><tbody className="divide-y divide-gray-100">{filtered.map((item) => <tr key={item.id} className="transition hover:bg-gray-50"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]"><Megaphone size={19}/></div><div><Link href={`/admin/announcements/${item.id}`} className="font-semibold text-gray-800 hover:text-[#01796f]">{item.title}</Link><p className="mt-1 max-w-md truncate text-xs text-gray-500">{item.description}</p></div></div></td><td className="px-5 py-4 text-gray-600">{item.audience}</td><td className="px-5 py-4 text-gray-600">{item.date}</td><td className="px-5 py-4"><StatusBadge status={item.status}/></td><td className="px-5 py-4"><Actions item={item} deleting={deletingId === item.id} onDelete={handleDelete}/></td></tr>)}{filtered.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-500">{search.trim() ? "No announcements match your search." : "No announcements were returned by the backend."}</td></tr>}</tbody></table></div><div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">Showing {filtered.length} of {announcements.length} announcements</div></div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">{filtered.map((item) => <article key={item.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]"><Megaphone size={20}/></div><div className="min-w-0"><h3 className="font-semibold text-gray-900">{item.title}</h3><p className="mt-1 text-sm text-gray-500">{item.date}</p></div></div><StatusBadge status={item.status}/></div><p className="mt-4 text-sm leading-6 text-gray-600">{item.description}</p><div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4"><Detail label="Audience" value={item.audience}/><Detail label="Date" value={item.date}/></div><div className="mt-4 flex justify-center border-t border-gray-100 pt-3"><Actions item={item} deleting={deletingId === item.id} onDelete={handleDelete}/></div></article>)}{filtered.length === 0 && <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">{search.trim() ? "No announcements match your search." : "No announcements were returned by the backend."}</div>}</div>
    <p className="text-sm text-gray-500 lg:hidden">Showing {filtered.length} of {announcements.length} announcements</p>
    </>}
  </div>;
}

function Detail({ label, value }: { label: string; value: string }) { return <div><p className="text-xs text-gray-400">{label}</p><p className="mt-1 text-sm font-medium text-gray-700">{value}</p></div>; }
function StatusBadge({ status }: { status: Announcement["status"] }) { return <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${status === "Published" ? "bg-[#e6f4f2] text-[#01796f]" : "bg-gray-100 text-gray-600"}`}>{status}</span>; }
function Actions({ item, deleting, onDelete }: { item: Announcement; deleting: boolean; onDelete: (item: Announcement) => void }) { return <div className="flex items-center justify-center gap-2"><Link href={`/admin/announcements/${item.id}`} title="View announcement" aria-label={`View ${item.title}`} className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"><Eye size={17}/></Link><Link href={`/admin/announcements/${item.id}/edit`} title="Edit announcement" aria-label={`Edit ${item.title}`} className="rounded-full p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"><Pencil size={17}/></Link><button type="button" onClick={() => onDelete(item)} disabled={deleting} title={`Delete ${item.title}`} aria-label={`Delete ${item.title}`} className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50">{deleting ? <span className="text-xs">...</span> : <Trash2 size={17}/>}</button></div>; }
