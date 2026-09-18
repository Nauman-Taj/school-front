import {
  SchoolSettings,
  UserSettings,
  AcademicSettings,
} from "@/types/settings";

export const schoolSettings: SchoolSettings = {
  schoolName: "Garrison Grammar School",
  logo: "/images/school.jpg",
  address: "Multan, Punjab, Pakistan",
  phone: "+92 300 5454544",
  email: "info@garrisongrammarschool.edu.pk",
  website: "https://garrisongrammarschool.edu.pk",
  academicYear: "2026-2027",
  principalName: "Mr. Shafiq Ur Rehman",
};

export const userSettings: UserSettings = {
  role: "Administrator",
  permission: "Full Access",
  passwordPolicy: "Strong Password",
  accountStatus: "Active",
};

export const academicSettings: AcademicSettings = {
  classes: "Primary",
  sections: "A",
  subjects: "English, Mathematics, Science, Computer",
  gradingSystem: "Percentage",
  academicYear: "2026-2027",
  term: "Term 1",
};