"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Transport, TransportStatus } from "@/types/transport";
import { toApiTransportStatus } from "./transport-utils";

type TransportFormProps = {
  mode?: "add" | "edit";
  vehicle?: Transport;
};

const drivers = [
  { id: "D001", name: "Muhammad Ali" },
  { id: "D002", name: "Ahmad Raza" },
  { id: "D003", name: "Usman Khan" },
  { id: "D004", name: "Bilal Ahmad" },
  { id: "D005", name: "Hassan Raza" },
  { id: "D006", name: "Sajid Hussain" },
];

const routes = [
  { id: "RT001", name: "Cantt - School" },
  { id: "RT002", name: "Bosan Road - School" },
  { id: "RT003", name: "Gulgasht - School" },
  { id: "RT004", name: "Shah Rukn-e-Alam - School" },
  { id: "RT005", name: "Mumtazabad - School" },
  { id: "RT006", name: "Vehari Road - School" },
];

const vehicleTypes = ["School Bus", "Coaster", "School Van"];
const statuses: TransportStatus[] = ["Active", "Maintenance", "Inactive"];

export default function TransportForm({ mode = "add", vehicle }: TransportFormProps) {
  const router = useRouter();
  const [vehicleNumber, setVehicleNumber] = useState(vehicle?.vehicleNumber ?? "");
  const [vehicleType, setVehicleType] = useState(vehicle?.vehicleType ?? "");
  const [driverId, setDriverId] = useState(vehicle?.driverId ?? "");
  const [routeId, setRouteId] = useState(vehicle?.routeId ?? "");
  const [capacity, setCapacity] = useState(vehicle?.capacity.toString() ?? "");
  const [status, setStatus] = useState<TransportStatus>(vehicle?.status ?? "Active");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedDriver = drivers.find((driver) => driver.id === driverId);
  const selectedRoute = routes.find((route) => route.id === routeId);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const capacityValue = Number(capacity);
    if (!Number.isInteger(capacityValue) || capacityValue < 1) {
      setError("Capacity must be a whole number greater than zero.");
      return;
    }
    if (!selectedDriver || !selectedRoute) {
      setError("Select a driver and route.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const payload = {
      vehicleNumber: vehicleNumber.trim(),
      vehicleType,
      driverId: selectedDriver.id,
      driver: selectedDriver.name,
      routeId: selectedRoute.id,
      route: selectedRoute.name,
      capacity: capacityValue,
      status: toApiTransportStatus(status),
    };

    setSaving(true);
    try {
      await apiRequest<Transport>(
        mode === "edit" && vehicle
          ? `/transport/${vehicle.id}`
          : "/transport",
        {
          method: mode === "edit" ? "PATCH" : "POST",
          token,
          body: JSON.stringify(payload),
        },
      );
      router.push("/admin/transport");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save vehicle.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10";
  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <div className="space-y-5">
      <Link href="/admin/transport" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]">
        <ArrowLeft size={17} /> Back to Transport
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">{mode === "edit" ? "Edit Vehicle" : "Add Vehicle"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        {error && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="vehicleNumber" className={labelClass}>Vehicle Number</label>
            <input id="vehicleNumber" type="text" value={vehicleNumber} onChange={(event) => setVehicleNumber(event.target.value)} placeholder="e.g. GGS-101" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="vehicleType" className={labelClass}>Vehicle Type</label>
            <select id="vehicleType" value={vehicleType} onChange={(event) => setVehicleType(event.target.value)} required className={inputClass}>
              <option value="">Select vehicle type</option>
              {vehicleTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="driverId" className={labelClass}>Driver</label>
            <select id="driverId" value={driverId} onChange={(event) => setDriverId(event.target.value)} required className={inputClass}>
              <option value="">Select driver</option>
              {drivers.map((driver) => <option key={driver.id} value={driver.id}>{driver.name} ({driver.id})</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="routeId" className={labelClass}>Route</label>
            <select id="routeId" value={routeId} onChange={(event) => setRouteId(event.target.value)} required className={inputClass}>
              <option value="">Select route</option>
              {routes.map((route) => <option key={route.id} value={route.id}>{route.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="capacity" className={labelClass}>Capacity</label>
            <input id="capacity" type="number" min="1" step="1" value={capacity} onChange={(event) => setCapacity(event.target.value)} placeholder="Enter seat capacity" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="status" className={labelClass}>Status</label>
            <select id="status" value={status} onChange={(event) => setStatus(event.target.value as TransportStatus)} className={inputClass}>
              {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link href="/admin/transport" className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50">Cancel</Link>
          <button type="submit" disabled={saving} className="rounded-full bg-[#01796f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? "Saving..." : mode === "edit" ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}
