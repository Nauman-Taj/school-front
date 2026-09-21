export type UserRole =
  | "Admin"
  | "Teacher"
  | "Student"
  | "Parent";

export type UserStatus = "Active" | "Inactive";

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  status: UserStatus;
};