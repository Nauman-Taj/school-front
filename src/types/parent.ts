export type ParentChild = {
  id: number;
  name: string;
  className: string;
  section: string;
  rollNo: string;
  status: string;
  email?: string | null;
  phone?: string | null;
  parentName?: string | null;
  admissionDate?: string | null;
  withdrawalDate?: string | null;
};

export type Parent = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  status: "Active" | "Inactive";
  children?: ParentChild[];
};
