"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bus, Eye, Pencil, RefreshCw, Search, Trash2 } from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Transport } from "@/types/transport";

type TransportTableProps = {
  vehicles: Transport[];
  loading: boolean;
  onRefresh: () => void;
  onDeleted: (id: number) => void;
};

export default function TransportTable({
  vehicles,
  loading,
  onRefresh,
  onDeleted,
}: TransportTableProps) {
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return vehicles;

    return vehicles.filter((vehicle) =>
      [vehicle.vehicleNumber, vehicle.vehicleType, vehicle.driverId, vehicle.driver, vehicle.routeId, vehicle.route, vehicle.capacity, vehicle.status]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [vehicles, search]);

  async function handleDelete(vehicle: Transport) {
    if (deletingId !== null) return;
    if (!window.confirm(`Delete vehicle ${vehicle.vehicleNumber}?`)) return;

    setDeletingId(vehicle.id);
    setError("");

    try {
      const token = getAuthToken();
      if (!token) throw new Error("Your session has expired. Please log in again.");
      await apiRequest(`/transport/${vehicle.id}`, { method: "DELETE", token });
      onDeleted(vehicle.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete this vehicle.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by vehicle, driver or route"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796f] focus:bg-white focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading transport vehicles...</p>
        </div>
      ) : (
        <>
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Vehicle</th>
                <th className="px-5 py-4 font-semibold">Driver</th>
                <th className="px-5 py-4 font-semibold">Route</th>
                <th className="px-5 py-4 font-semibold">Capacity</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="transition hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]"><Bus size={19} /></div>
                      <div>
                        <Link href={`/admin/transport/${vehicle.id}`} className="font-semibold text-gray-800 hover:text-[#01796f]">{vehicle.vehicleNumber}</Link>
                        <p className="mt-1 text-xs text-gray-500">{vehicle.vehicleType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600"><p>{vehicle.driver}</p><p className="mt-1 text-xs text-gray-400">{vehicle.driverId}</p></td>
                  <td className="px-5 py-4 text-gray-600"><p>{vehicle.route}</p><p className="mt-1 text-xs text-gray-400">{vehicle.routeId}</p></td>
                  <td className="px-5 py-4 text-gray-600">{vehicle.capacity} seats</td>
                  <td className="px-5 py-4"><StatusBadge status={vehicle.status} /></td>
                  <td className="px-5 py-4"><VehicleActions vehicle={vehicle} deleting={deletingId === vehicle.id} onDelete={handleDelete} /></td>
                </tr>
              ))}
              {filteredVehicles.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-500">{search.trim() ? "No vehicles match your search." : "No vehicles were returned by the backend."}</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {filteredVehicles.map((vehicle) => (
          <article key={vehicle.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]"><Bus size={20} /></div>
                <div className="min-w-0"><h3 className="font-semibold text-gray-900">{vehicle.vehicleNumber}</h3><p className="mt-1 text-sm text-gray-500">{vehicle.vehicleType}</p></div>
              </div>
              <StatusBadge status={vehicle.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
              <Detail label="Driver" value={vehicle.driver} />
              <Detail label="Capacity" value={`${vehicle.capacity} seats`} />
              <div className="col-span-2"><Detail label="Route" value={vehicle.route} /></div>
            </div>
            <div className="mt-4 flex justify-center border-t border-gray-100 pt-3"><VehicleActions vehicle={vehicle} deleting={deletingId === vehicle.id} onDelete={handleDelete} /></div>
          </article>
        ))}
        {filteredVehicles.length === 0 && <div className="col-span-full rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">{search.trim() ? "No vehicles match your search." : "No vehicles were returned by the backend."}</div>}
      </div>
      <p className="text-sm text-gray-500 lg:hidden">Showing {filteredVehicles.length} of {vehicles.length} vehicles</p>
        </>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-gray-400">{label}</p><p className="mt-1 text-sm font-medium text-gray-700">{value}</p></div>;
}

function StatusBadge({ status }: { status: Transport["status"] }) {
  const styles = { Active: "bg-[#e6f4f2] text-[#01796f]", Maintenance: "bg-yellow-50 text-yellow-700", Inactive: "bg-gray-100 text-gray-600" };
  return <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}

function VehicleActions({ vehicle, deleting, onDelete }: { vehicle: Transport; deleting: boolean; onDelete: (vehicle: Transport) => void }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Link href={`/admin/transport/${vehicle.id}`} title="View vehicle" aria-label={`View ${vehicle.vehicleNumber}`} className="rounded-full p-2 text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"><Eye size={17} /></Link>
      <Link href={`/admin/transport/${vehicle.id}/edit`} title="Edit vehicle" aria-label={`Edit ${vehicle.vehicleNumber}`} className="rounded-full p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500"><Pencil size={17} /></Link>
      <button type="button" onClick={() => onDelete(vehicle)} disabled={deleting} title={`Delete ${vehicle.vehicleNumber}`} aria-label={`Delete ${vehicle.vehicleNumber}`} className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50">
        {deleting ? <span className="text-xs">...</span> : <Trash2 size={17} />}
      </button>
    </div>
  );
}
