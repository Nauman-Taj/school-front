"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Eye,
    Pencil,
    Trash2,
    Bus,
} from "lucide-react";

import { transport } from "@/data/transport";
import { Transport } from "@/types/transport";

export default function TransportTable() {
    const [vehicleList, setVehicleList] =
        useState<Transport[]>(transport);

    const [search, setSearch] = useState("");

    const filteredVehicles = vehicleList.filter(
        (vehicle) =>
            vehicle.vehicleNumber
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            vehicle.vehicleType
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            vehicle.driver
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            vehicle.route
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const handleDelete = (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this vehicle?"
        );

        if (!confirmed) return;

        setVehicleList((current) =>
            current.filter((vehicle) => vehicle.id !== id)
        );
    };

    return (
        <div className="space-y-5">
            {/* Search */}
            <div className="relative">
                <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search vehicles"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                />
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left">
                        <thead className="border-b border-gray-200 bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Vehicle
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Driver
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Route
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Capacity
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredVehicles.map((vehicle) => (
                                <tr
                                    key={vehicle.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                                                <Bus size={19} />
                                            </div>

                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {vehicle.vehicleNumber}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {vehicle.vehicleType}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {vehicle.driver}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {vehicle.route}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {vehicle.capacity} seats
                                    </td>

                                    <td className="px-6 py-4">
                                        <StatusBadge status={vehicle.status} />
                                    </td>

                                    <td className="px-6 py-4">
                                        <VehicleActions
                                            vehicleId={vehicle.id}
                                            onDelete={handleDelete}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
                {filteredVehicles.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        className="rounded-2xl border border-gray-200 bg-white p-4"
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                                <Bus size={20} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900">
                                    {vehicle.vehicleNumber}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {vehicle.vehicleType}
                                </p>
                            </div>

                            <StatusBadge status={vehicle.status} />
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                            <div>
                                <p className="text-xs text-gray-400">
                                    Driver
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                    {vehicle.driver}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">
                                    Capacity
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                    {vehicle.capacity} seats
                                </p>
                            </div>

                            <div className="col-span-2">
                                <p className="text-xs text-gray-400">
                                    Route
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                    {vehicle.route}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-center border-t border-gray-100 pt-3">
                            <VehicleActions
                                vehicleId={vehicle.id}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {filteredVehicles.length === 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
                    No vehicles found.
                </div>
            )}
        </div>
    );
}

function StatusBadge({
    status,
}: {
    status: Transport["status"];
}) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status === "Active"
                ? "bg-green-50 text-green-600"
                : status === "Maintenance"
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-red-50 text-red-600"
                }`}
        >
            {status}
        </span>
    );
}

function VehicleActions({
    vehicleId,
    onDelete,
}: {
    vehicleId: number;
    onDelete: (id: number) => void;
}) {
    return (
        <div className="flex items-center justify-center gap-2">
            <Link
                href={`/dashboard/transport/${vehicleId}`}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
            >
                <Eye size={17} />
            </Link>

            <Link
                href={`/dashboard/transport/${vehicleId}/edit`}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
            >
                <Pencil size={17} />
            </Link>

            <button
                onClick={() => onDelete(vehicleId)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
            >
                <Trash2 size={17} />
            </button>
        </div>
    );
}