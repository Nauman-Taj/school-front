export type TransportAssignment = {
  id: string;
  studentId: number;
  student: string;
  transportId: number;
  vehicleNumber: string;
  route: string;
  pickupPoint: string;
  status: "Active" | "Inactive";
};