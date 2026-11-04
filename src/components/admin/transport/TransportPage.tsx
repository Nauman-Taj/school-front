"use client";

import { Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Transport } from "@/types/transport";
import TransportTable from "./TransportTable";
import { mapTransport, type ApiTransport } from "./transport-utils";

export default function TransportPage() {
  const [vehicles, setVehicles] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadVehicles = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }
      const data = await apiRequest<ApiTransport[]>("/transport", { token });
      setVehicles(data.map(mapTransport));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load transport vehicles.",
      );
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    void loadVehicles();
  }, [loadVehicles]);

  const stats = [
    { title: "Total Vehicles", value: vehicles.length },
    { title: "Active", value: vehicles.filter((vehicle) => vehicle.status === "Active").length },
    { title: "Maintenance", value: vehicles.filter((vehicle) => vehicle.status === "Maintenance").length },
    { title: "Inactive", value: vehicles.filter((vehicle) => vehicle.status === "Inactive").length },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Transport
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage school vehicles, drivers, and routes.
          </p>
        </div>

        <Link
          href="/admin/transport/add"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
        >
          <Plus size={18} />
          Add Vehicle
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="mt-2 text-2xl font-bold text-gray-800">
                {loading ? "0" : stat.value}
              </p>
            </div>
        ))}
      </div>

      {error && (
        <div role="alert" className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
          <p>{error}</p>
          <button type="button" onClick={() => void loadVehicles()} className="inline-flex w-fit items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 font-medium transition hover:bg-red-100">
            <RefreshCw size={15} /> Try again
          </button>
        </div>
      )}

      {loading && !hasLoaded && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading transport vehicles...</p>
        </div>
      )}

      {hasLoaded && (
        <TransportTable
          vehicles={vehicles}
          loading={loading}
          onRefresh={loadVehicles}
          onDeleted={(id) => setVehicles((current) => current.filter((vehicle) => vehicle.id !== id))}
        />
      )}
    </div>
  );
}
