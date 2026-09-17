import Link from "next/link";
import {
    ArrowLeft,
    Bus,
    Pencil,
    UserRound,
    Route,
    Users,
} from "lucide-react";

import { Transport } from "@/types/transport";

type TransportProfileProps = {
    vehicle: Transport;
};

export default function TransportProfile({
    vehicle,
}: TransportProfileProps) {
    return (
        <div className="space-y-5">
            <Link
                href="/dashboard/transport"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"
            >
                <ArrowLeft size={17} />
                Back to Transport
            </Link>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Vehicle Details
                    </h1>

                    {/* <p className="mt-1 text-sm text-gray-500">
                        View transport vehicle information.
                    </p> */}
                </div>
                <Link
                    href={`/dashboard/transport/${vehicle.id}/edit`}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
                >
                    <Pencil size={17} />
                    Edit Vehicle
                </Link>
            </div>


            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f4f2] text-[#01796F]">
                        <Bus size={27} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {vehicle.vehicleNumber}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {vehicle.vehicleType}
                        </p>
                    </div>

                    <StatusBadge
                        status={vehicle.status}
                    />
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <DetailItem
                        icon={UserRound}
                        label="Driver"
                        value={vehicle.driver}
                    />

                    <DetailItem
                        icon={Route}
                        label="Route"
                        value={vehicle.route}
                    />

                    <DetailItem
                        icon={Users}
                        label="Capacity"
                        value={`${vehicle.capacity} seats`}
                    />
                </div>
            </div>
        </div>
    );
}

function DetailItem({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-gray-400">
                <Icon size={17} />
                <p className="text-xs font-medium">
                    {label}
                </p>
            </div>

            <p className="mt-2 text-sm font-semibold text-gray-800">
                {value}
            </p>
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
            className={`mt-2 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium sm:ml-auto ${status === "Active"
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