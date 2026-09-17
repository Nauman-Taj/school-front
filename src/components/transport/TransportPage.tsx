"use client";

import {
  Bus,
  CheckCircle2,
  Wrench,
  XCircle,
  Plus,
} from "lucide-react";

import Link from "next/link";
import { transport } from "@/data/transport";
import TransportTable from "./TransportTable";

export default function TransportPage() {
  const totalVehicles = transport.length;

  const activeVehicles = transport.filter(
    (vehicle) => vehicle.status === "Active"
  ).length;

  const maintenanceVehicles = transport.filter(
    (vehicle) => vehicle.status === "Maintenance"
  ).length;

  const inactiveVehicles = transport.filter(
    (vehicle) => vehicle.status === "Inactive"
  ).length;

  const stats = [
    {
      title: "Total Vehicles",
      value: totalVehicles,
      icon: Bus,
      description: "Registered vehicles",
    },
    {
      title: "Active",
      value: activeVehicles,
      icon: CheckCircle2,
      description: "Currently active",
    },
    {
      title: "Maintenance",
      value: maintenanceVehicles,
      icon: Wrench,
      description: "Under maintenance",
    },
    {
      title: "Inactive",
      value: inactiveVehicles,
      icon: XCircle,
      description: "Currently inactive",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Transport
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage school vehicles, drivers, and routes.
          </p>
        </div>

        <Link
          href="/dashboard/transport/add"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
        >
          <Plus size={17} />
          Add Vehicle
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      <TransportTable />
    </div>
  );
}