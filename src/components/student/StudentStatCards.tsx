"use client";

import type { LucideIcon } from "lucide-react";

export type StudentStat = {
  title: string;
  value: string | number;
  icon: LucideIcon;
};

type Props = {
  stats: StudentStat[];
};

/**
 * The summary cards of the Student portal.
 *
 * The markup is the same as the Teacher portal cards, so every Student module
 * shows the same card: the teal icon box on the title row and the number at
 * full width below it.
 */
export default function StudentStatCards({ stats }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{stat.title}</p>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                <Icon size={20} />
              </div>
            </div>

            <p className="mt-2 text-2xl font-bold text-gray-800">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
