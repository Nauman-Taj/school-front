export type RegistrationRole = "Student" | "Teacher";

export type RegistrationData = {
    role: RegistrationRole;

    // Common
    fullName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    gender: string;
    address: string;

    // Student
    cnicOrBForm: string;
    guardianName: string;
    guardianPhone: string;
    guardianEmail: string;
    previousSchool: string;
    applyingClass: string;
    previousQualification: string;
    emergencyContact: string;
    medicalInformation: string;

    // Teacher
    fatherName: string;
    cnic: string;
    qualification: string;
    experience: string;
    department: string;
    designation: string;
    subjects: string;
    joiningDate: string;
};
