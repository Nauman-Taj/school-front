import { RegistrationData } from "@/types/registration";
import { addUser } from "@/lib/users";

export const registerUser = (form: RegistrationData) => {
  const users = JSON.parse(
    localStorage.getItem("school-users") || "[]"
  );

  const emailExists = users.some(
    (user: { email: string }) =>
      user.email.toLowerCase() === form.email.toLowerCase()
  );

  if (emailExists) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const username = form.username
  .trim()
  .toLowerCase();
  
  const usernameExists = users.some(
    (user: { username: string }) =>
      user.username.toLowerCase() === username
  );

  if (usernameExists) {
    return {
      success: false,
      message: "This username is already in use.",
    };
  }

  const userId = Date.now();

  addUser({
    id: userId,
    name: form.fullName,
    email: form.email,
    username,
    password: form.password,
    role: form.role,
    status: "Active",
  });

  if (form.role === "Student") {
    const students = JSON.parse(
      localStorage.getItem("registered-students") || "[]"
    );

    students.push({
      id: userId,
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      cnicOrBForm: form.cnicOrBForm,
      address: form.address,
      guardianName: form.guardianName,
      guardianPhone: form.guardianPhone,
      guardianEmail: form.guardianEmail,
      previousSchool: form.previousSchool,
      applyingClass: form.applyingClass,
      previousQualification: form.previousQualification,
      emergencyContact: form.emergencyContact,
      medicalInformation: form.medicalInformation,
      status: "Active",
    });

    localStorage.setItem(
      "registered-students",
      JSON.stringify(students)
    );
  }

  if (form.role === "Teacher") {
    const teachers = JSON.parse(
      localStorage.getItem("registered-teachers") || "[]"
    );

    teachers.push({
      id: userId,
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      cnic: form.cnic,
      address: form.address,
      fatherName: form.fatherName,
      qualification: form.qualification,
      experience: form.experience,
      department: form.department,
      designation: form.designation,
      subjects: form.subjects,
      joiningDate: form.joiningDate,
      status: "Active",
    });

    localStorage.setItem(
      "registered-teachers",
      JSON.stringify(teachers)
    );
  }

  return {
    success: true,
    message: `${form.role} account created successfully.`,
  };
};
