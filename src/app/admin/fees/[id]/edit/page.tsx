
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

import FeeForm from "@/components/admin/fees/FeeForm";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { Fee } from "@/types/fee";

type EditFeePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditFeePage({
  params,
}: EditFeePageProps) {
  const { id } = use(params);

  const [fee, setFee] = useState<Fee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadFee() {
      const token = getAuthToken();

      if (!token) {
        setError("Please log in to edit this fee.");
        setLoading(false);
        return;
      }

      try {
        const result = await apiRequest<Fee>(
          `/fees/${encodeURIComponent(id)}`,
          { token }
        );

        if (!cancelled) {
          setFee(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load this fee."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFee();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-gray-500">
        Loading fee details...
      </div>
    );
  }

  if (error || !fee) {
    return (
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
        <h1 className="text-xl font-bold text-gray-900">
          Unable to load fee
        </h1>

        <p className="text-sm text-red-600">
          {error || "Fee invoice not found."}
        </p>

        <Link
          href="/admin/fees"
          className="inline-flex rounded-full bg-[#01796F] px-5 py-3 text-sm font-medium text-white hover:bg-[#015f58]"
        >
          Back to Fees
        </Link>
      </div>
    );
  }

  return <FeeForm fee={fee} />;
}
