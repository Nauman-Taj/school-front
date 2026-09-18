export type SchoolSettings = {
  schoolName: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  academicYear: string;
  principalName: string;
};

export type UserSettings = {
  role: string;
  permission: string;
  passwordPolicy: string;
  accountStatus: string;
};

export type AcademicSettings = {
  classes: string;
  sections: string;
  subjects: string;
  gradingSystem: string;
  academicYear: string;
  term: string;
};