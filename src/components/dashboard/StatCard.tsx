import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
          <Icon size={21} strokeWidth={1.8} />
        </div>

      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="font-semibold text-[#01796f]">
          {change}
        </span>

        <span className="text-gray-500">
          {description}
        </span>
      </div>
    </div>
  );
}