interface StatCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  change,
  description,
  loading = false,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-800">
        {loading ? "0" : value}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 text-sm">
        <span className="font-semibold text-[#01796f]">
          {loading ? "0" : change}
        </span>
        <span className="text-gray-500">{description}</span>
      </div>
    </div>
  );
}
