"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, Users } from "lucide-react";

import ParentTable from "./ParentTable";
import { parents } from "@/data/parents";

export default function ParentsPage() {
  const [parentList, setParentList] = useState(parents);

  const activeParents = parentList.filter(
    (parent) => parent.status === "Active"
  ).length;

  const inactiveParents = parentList.filter(
    (parent) => parent.status === "Inactive"
  ).length;

  const totalChildren = parentList.reduce(
    (total, parent) => total + parent.children.length,
    0
  );

  const stats = [
    {
      title: "Total Parents",
      value: parentList.length,
      icon: Users,
    },
    {
      title: "Active Parents",
      value: activeParents,
      icon: Users,
    },
    {
      title: "Inactive Parents",
      value: inactiveParents,
      icon: Users,
    },
    {
      title: "Total Children",
      value: totalChildren,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Parents
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage parents and their children
          </p>
        </div>

        <Link
          href="/dashboard/parents/add"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
        >
          <UserPlus size={17} />
          Add Parent
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <ParentTable
        parentList={parentList}
        setParentList={setParentList}
      />
    </div>
  );
}