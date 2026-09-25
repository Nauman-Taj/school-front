"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Transport } from "@/types/transport";

type TransportFormProps = {
  mode?: "add" | "edit";
  vehicle?: Transport;
};

export default function TransportForm({
  mode = "add",
  vehicle,
}: TransportFormProps) {
  const [formData, setFormData] = useState({
    vehicleNumber: vehicle?.vehicleNumber ?? "",
    vehicleType: vehicle?.vehicleType ?? "",
    driverId: vehicle?.driverId ?? "",
    driver: vehicle?.driver ?? "",
    routeId: vehicle?.routeId ?? "",
    route: vehicle?.route ?? "",
    capacity: vehicle?.capacity.toString() ?? "",
    status: vehicle?.status ?? "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    window.location.href = "/admin/transport";
  };

  return (
    <div className="space-y-5">
      <Link
        href="/admin/transport"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
      >
        <ArrowLeft size={17} />
        Back to Transport
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === "edit" ? "Edit Vehicle" : "Add Vehicle"}
        </h1>

        {/* <p className="mt-1 text-sm text-gray-500">
          {mode === "edit"
            ? "Update the vehicle information."
            : "Add a new vehicle to the school transport system."}
        </p> */}
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl max-w-5xl border border-gray-200 bg-white p-5 sm:p-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Vehicle Number
            </label>

            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="e.g. GGS-101"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Vehicle Type
            </label>

            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            >
              <option value="">Select vehicle type</option>
              <option value="School Bus">School Bus</option>
              <option value="Coaster">Coaster</option>
              <option value="School Van">School Van</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Driver
            </label>

            <select
              name="driverId"
              value={formData.driverId}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            >
              <option value="">Select driver</option>
              <option value="D001">Muhammad Ali</option>
              <option value="D002">Ahmad Raza</option>
              <option value="D003">Usman Khan</option>
              <option value="D004">Bilal Ahmad</option>
              <option value="D005">Hassan Raza</option>
              <option value="D006">Sajid Hussain</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Route
            </label>

            <select
              name="routeId"
              value={formData.routeId}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            >
              <option value="">Select route</option>
              <option value="RT001">Cantt - School</option>
              <option value="RT002">Bosan Road - School</option>
              <option value="RT003">Gulgasht - School</option>
              <option value="RT004">Shah Rukn-e-Alam - School</option>
              <option value="RT005">Mumtazabad - School</option>
              <option value="RT006">Vehari Road - School</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Route
            </label>

            <input
              type="text"
              name="route"
              value={formData.route}
              onChange={handleChange}
              placeholder="Enter route"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Capacity
            </label>

            <input
              type="number"
              name="capacity"
              min="1"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Enter seat capacity"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-1 focus:ring-[#01796F]"
              required
            >
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin/transport"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            {mode === "edit" ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}