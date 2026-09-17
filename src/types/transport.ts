export type TransportStatus =
  | "Active"
  | "Maintenance"
  | "Inactive";

export type Transport = {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  driver: string;
  route: string;
  capacity: number;
  status: TransportStatus;
};