export type Parent = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  children: string[];
  status: "Active" | "Inactive";
};