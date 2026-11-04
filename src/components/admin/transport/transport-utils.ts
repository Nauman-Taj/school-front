import type { Transport, TransportStatus } from "@/types/transport";

export type ApiTransport = Omit<Transport, "status"> & { status: string };

export function mapTransport(vehicle: ApiTransport): Transport {
  const normalizedStatus = vehicle.status.toUpperCase();
  const status: TransportStatus =
    normalizedStatus === "ACTIVE"
      ? "Active"
      : normalizedStatus === "MAINTENANCE"
        ? "Maintenance"
        : "Inactive";

  return { ...vehicle, status };
}

export function toApiTransportStatus(status: TransportStatus) {
  return status.toUpperCase();
}
