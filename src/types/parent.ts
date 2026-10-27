
export type ParentChild = {
  id: number;
  name: string;
  className: string;
  section: string;
  rollNo: string;
  status: string;
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
