import { User } from "@/types/user";

export const users: User[] = [
  {
    id: 1,
    name: "Nauman Taj",
    email: "admin@garrisonschool.edu.pk",
    username: "admin",
    password: "nauman360",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Anees Baloch",
    email: "aneesbaloch@garrisonschool.edu.pk",
    username: "anees",
    password: "teacher1122",
    role: "Teacher",
    status: "Active",
  },
  {
    id: 3,
    name: "Ali Asif",
    email: "aliasif@garrisonschool.edu.pk",
    username: "ali",
    password: "student1122",
    role: "Student",
    status: "Active",
  },
  {
    id: 4,
    name: "Muhammad Asif",
    email: "muhammadasif@gmail.com",
    username: "asif",
    password: "parent1122",
    role: "Parent",
    status: "Active",
  },
];