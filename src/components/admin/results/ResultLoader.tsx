"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ResultForm from '@/components/admin/results/ResultForm';
import ResultProfile from '@/components/admin/results/ResultProfile';
import { apiRequest } from '@/lib/api';
import { getAuthToken } from '@/lib/auth';
import type { Result } from '@/types/result';

export default function ResultLoader({ id, mode }: { id: string; mode: 'profile' | 'edit' }) {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const token = getAuthToken();
      if (!token) { setError('Your session has expired. Please log in again.'); setLoading(false); return; }
      try {
        const data = await apiRequest<Result>(`/results/${encodeURIComponent(id)}`, { token });
        if (!cancelled) { setResult(data); setError(''); }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load result.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => { cancelled = true; };
  }, [id, retryCount]);

  if (loading) return <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">Loading result...</div>;
  if (error || !result) return <div className="space-y-4"><div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error || 'Result not found.'}</div><div className="flex gap-3"><button onClick={() => { setLoading(true); setRetryCount((count) => count + 1); }} className="rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white">Try again</button><Link href="/admin/results" className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700">Back to Results</Link></div></div>;
  return mode === 'edit' ? <ResultForm result={result} /> : <ResultProfile result={result} />;
}
