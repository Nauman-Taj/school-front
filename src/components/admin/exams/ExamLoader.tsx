"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ExamForm from "@/components/admin/exams/ExamForm";
import ExamProfile from "@/components/admin/exams/ExamProfile";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Exam } from "@/types/exam";

type ApiExam = Omit<Exam, "status"> & { status: string };

export default function ExamLoader({ id, mode }: { id: string; mode: "profile" | "edit" }) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const token = getAuthToken();
      if (!token) { setError("Your session has expired. Please log in again."); setLoading(false); return; }
      try {
        const data = await apiRequest<ApiExam>(`/exams/${encodeURIComponent(id)}`, { token });
        if (!cancelled) setExam({ ...data, status: data.status === "COMPLETED" || data.status === "Completed" ? "Completed" : "Upcoming" });
      } catch (err) { if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load exam."); }
      finally { if (!cancelled) setLoading(false); }
    }
    void load();
    return () => { cancelled = true; };
  }, [id, retryCount]);

  if (loading) return <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">Loading exam...</div>;
  if (error || !exam) return <div className="space-y-4"><div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error || "Exam not found."}</div><div className="flex gap-3"><button onClick={() => { setLoading(true); setRetryCount((count) => count + 1); }} className="rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white">Try again</button><Link href="/admin/exams" className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700">Back to Exams</Link></div></div>;
  return mode === "edit" ? <ExamForm exam={exam} isEdit /> : <ExamProfile exam={exam} />;
}
