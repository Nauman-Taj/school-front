"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import FeeProfile from "@/components/admin/fees/FeeProfile";
import { Fee } from "@/types/fee";

type ApiPayment = {
    id: string;
    feeId: string;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
    transactionId: string | null;
    receiptNumber: string;
};

type ApiFee = Fee & {
    payments: ApiPayment[];
};

type FeeDetailsLoaderProps = {
    id: string;
};

export default function FeeDetailsLoader({
    id,
}: FeeDetailsLoaderProps) {
    const router = useRouter();

    const [fee, setFee] = useState<ApiFee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let active = true;

        async function loadFee() {
            setLoading(true);
            setError("");

            try {
                const token = getAuthToken();

                if (!token) {
                    throw new Error(
                        "Your session has expired. Please log in again.",
                    );
                }

                const data = await apiRequest<ApiFee>(`/fees/${id}`, {
                    token,
                });

                if (active) {
                    setFee(data);
                }
            } catch (err) {
                if (active) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Failed to load fee details.",
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadFee();

        return () => {
            active = false;
        };
    }, [id, refreshKey]);
    if (loading) {
        return (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white">
                <RefreshCw
                    size={24}
                    className="animate-spin text-[#01796f]"
                />
                <p className="mt-3 text-sm text-gray-500">
                    Loading fee details...
                </p>
            </div>
        );
    }

    if (error || !fee) {
        return (
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 text-center">
                <p className="text-sm text-red-600">
                    {error || "Fee invoice not found."}
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.refresh()}
                        className="rounded-full bg-[#01796f] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#015f58]"
                    >
                        Refresh page
                    </button>

                    <Link
                        href="/admin/fees"
                        className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                        Back to fees
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <FeeProfile
            fee={fee}
            onPaymentRecorded={() => setRefreshKey((key) => key + 1)}
        />
    );
}