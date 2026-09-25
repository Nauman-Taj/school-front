export type TeacherProfile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  subject: string;
  qualification: string;
  joiningDate: string;
  status: "Active" | "Inactive";
};