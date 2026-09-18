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
  email: "info@garrisonschool.edu.pk",
  website: "https://garrisonschool.edu.pk",
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
  classes: "Primary, Middle, Senior",
  sections: "A, B, C",
  subjects: "English, Mathematics, Science, Computer",
  gradingSystem: "Percentage, Grade A-F, GPA",
  academicYear: "2026-2027",
  term: "Term 1",
};