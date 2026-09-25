export type TransportStatus =
  | "Active"
  | "Maintenance"
  | "Inactive";

export type Transport = {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  driverId: string;
  driver: string;
  routeId: string;
  route: string;
  capacity: number;
  status: TransportStatus;
};