
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import {
    RegistrationData,
    RegistrationRole,
} from "@/types/registration";

const initialForm: RegistrationData = {
    role: "Student",

    // Common
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    address: "",

    // Student
    cnicOrBForm: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    previousSchool: "",
    applyingClass: "",
    previousQualification: "",
    emergencyContact: "",
    medicalInformation: "",

    // Teacher
    fatherName: "",
    cnic: "",
    qualification: "",
    experience: "",
    department: "",
    designation: "",
    subjects: "",
    joiningDate: "",

    // Parent
    occupation: "",
    relationship: "",
    childName: "",
    childRollNo: "",
};

type RegisterResponse = {
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        username: string;
        role: "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";
        status: "ACTIVE" | "INACTIVE";
    };
};

export default function RegistrationForm() {
    const [form, setForm] = useState<RegistrationData>(initialForm);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const updateField = (
        field: keyof RegistrationData,
        value: string
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleRoleChange = (value: RegistrationRole) => {
        setForm((current) => ({
            ...current,
            role: value,
        }));
        setError("");
    };

    const validateStep = () => {
        const requiredFields: Record<number, (keyof RegistrationData)[]> = {
            1: [
                "email",
                "username",
                "phone",
                "password",
                "confirmPassword",
            ],
            2: [
                "fullName",
                "dateOfBirth",
                "gender",
                "address",
                ...(form.role === "Student"
                    ? ["cnicOrBForm" as const]
                    : ["cnic" as const]),
            ],
            3:
                form.role === "Student"
                    ? [
                          "applyingClass",
                          "previousSchool",
                          "previousQualification",
                          "guardianName",
                          "guardianPhone",
                          "emergencyContact",
                      ]
                    : form.role === "Teacher"
                      ? [
                            "fatherName",
                            "qualification",
                            "experience",
                            "department",
                            "designation",
                            "subjects",
                        ]
                      : [
                            "occupation",
                            "relationship",
                            "childName",
                            "childRollNo",
                        ],
        };

        const missingField = requiredFields[step]?.find(
            (field) => !String(form[field] ?? "").trim()
        );

        if (missingField) {
            setError("Please complete all required fields before continuing.");
            return false;
        }

        if (step === 1) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
                setError("Please enter a valid email address.");
                return false;
            }

            if (form.password.length < 8) {
                setError("Password must contain at least 8 characters.");
                return false;
            }

            if (form.password !== form.confirmPassword) {
                setError("Passwords do not match.");
                return false;
            }
        }

        setError("");
        return true;
    };

    const handleNext = () => {
        if (!validateStep()) return;

        if (step < 4) {
            setStep((current) => current + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep((current) => current - 1);
            setError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (step !== 4) return;

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            setStep(1);
            return;
        }

        if (form.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            setStep(1);
            return;
        }

        setIsSubmitting(true);

        try {
            const roleMap = {
                Student: "STUDENT",
                Teacher: "TEACHER",
                Parent: "PARENT",
            } as const;

            const result = await apiRequest<RegisterResponse>(
                "/auth/register",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: form.fullName.trim(),
                        email: form.email.trim(),
                        username: form.username.trim(),
                        password: form.password,
                        role: roleMap[form.role],
                    }),
                }
            );

            window.alert(
                `${result.user.name}, your account has been created successfully. You can now log in.`
            );

            window.location.href = "/login";
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Registration failed. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f8f8] px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <Image
                            src="/images/school.jpg"
                            alt="School Logo"
                            width={80}
                            height={80}
                            className="mx-auto mr-1 object-contain"
                        />
                        <h1 className="text-4xl font-bold text-gray-800">
                            Garrison Grammar School
                        </h1>
                    </Link>

                    <h2 className="mt-8 text-2xl font-bold text-gray-800">
                        Create Your Account
                    </h2>
                </div>

                {/* Progress */}
                <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="flex flex-1 items-center last:flex-none"
                            >
                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                                        step >= item
                                            ? "bg-[#01796F] text-white"
                                            : "bg-gray-100 text-gray-400"
                                    }`}
                                >
                                    {step > item ? <Check size={17} /> : item}
                                </div>

                                {item < 4 && (
                                    <div
                                        className={`mx-2 h-1 flex-1 rounded-full ${
                                            step > item
                                                ? "bg-[#01796F]"
                                                : "bg-gray-100"
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 grid grid-cols-4 text-center text-xs text-gray-500">
                        <span>Account</span>
                        <span>Personal</span>
                        <span>
                            {form.role === "Student"
                                ? "Academic"
                                : form.role === "Teacher"
                                  ? "Professional"
                                  : "Parent"}
                        </span>
                        <span>Review</span>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
                >
                    {error && (
                        <div
                            role="alert"
                            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                        >
                            {error}
                        </div>
                    )}

                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Account Information
                            </h3>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        I want to register as
                                    </label>
                                    <select
                                        value={form.role}
                                        onChange={(e) =>
                                            handleRoleChange(
                                                e.target.value as RegistrationRole
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                                    >
                                        <option value="Student">Student</option>
                                        <option value="Teacher">Teacher</option>
                                        <option value="Parent">Parent</option>
                                    </select>
                                </div>

                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={form.email}
                                    onChange={(v) => updateField("email", v)}
                                    placeholder="Enter your email"
                                    required
                                />
                                <Input
                                    label="Username"
                                    value={form.username}
                                    onChange={(v) => updateField("username", v)}
                                    placeholder="Choose a username"
                                    required
                                />
                                <Input
                                    label="Phone Number"
                                    value={form.phone}
                                    onChange={(v) => updateField("phone", v)}
                                    placeholder="0312-3456789"
                                    required
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    value={form.password}
                                    onChange={(v) => updateField("password", v)}
                                    placeholder="Create a password"
                                    required
                                />
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={(v) =>
                                        updateField("confirmPassword", v)
                                    }
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Personal Information
                            </h3>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Input
                                    label="Full Name"
                                    value={form.fullName}
                                    onChange={(v) => updateField("fullName", v)}
                                    placeholder="Enter your full name"
                                    required
                                />
                                <Input
                                    label="Date of Birth"
                                    type="date"
                                    value={form.dateOfBirth}
                                    onChange={(v) =>
                                        updateField("dateOfBirth", v)
                                    }
                                    required
                                />
                                <Select
                                    label="Gender"
                                    value={form.gender}
                                    onChange={(v) => updateField("gender", v)}
                                    options={["Male", "Female", "Other"]}
                                    placeholder="Select gender"
                                    required
                                />
                                <Input
                                    label={
                                        form.role === "Student"
                                            ? "CNIC / B-Form"
                                            : "CNIC"
                                    }
                                    value={
                                        form.role === "Student"
                                            ? form.cnicOrBForm
                                            : form.cnic
                                    }
                                    onChange={(v) =>
                                        updateField(
                                            form.role === "Student"
                                                ? "cnicOrBForm"
                                                : "cnic",
                                            v
                                        )
                                    }
                                    placeholder="XXXXX-XXXXXXX-X"
                                    required
                                />

                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <textarea
                                        value={form.address}
                                        onChange={(e) =>
                                            updateField("address", e.target.value)
                                        }
                                        rows={3}
                                        placeholder="Enter your complete address"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 — STUDENT */}
                    {step === 3 && form.role === "Student" && (
                        <div className="space-y-5">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Student Information
                            </h3>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Select
                                    label="Applying Class"
                                    value={form.applyingClass}
                                    onChange={(v) =>
                                        updateField("applyingClass", v)
                                    }
                                    options={[
                                        "Nursery", "KG", "Grade 1", "Grade 2",
                                        "Grade 3", "Grade 4", "Grade 5",
                                        "Grade 6", "Grade 7", "Grade 8",
                                        "Grade 9", "Grade 10", "Grade 11",
                                        "Grade 12",
                                    ]}
                                    placeholder="Select class"
                                    required
                                />
                                <Input
                                    label="Previous School"
                                    value={form.previousSchool}
                                    onChange={(v) =>
                                        updateField("previousSchool", v)
                                    }
                                    placeholder="Previous school name"
                                    required
                                />
                                <Input
                                    label="Previous Qualification / Grade"
                                    value={form.previousQualification}
                                    onChange={(v) =>
                                        updateField("previousQualification", v)
                                    }
                                    placeholder="e.g. Grade 7"
                                    required
                                />
                                <Input
                                    label="Guardian Name"
                                    value={form.guardianName}
                                    onChange={(v) =>
                                        updateField("guardianName", v)
                                    }
                                    placeholder="Parent / guardian name"
                                    required
                                />
                                <Input
                                    label="Guardian Phone"
                                    value={form.guardianPhone}
                                    onChange={(v) =>
                                        updateField("guardianPhone", v)
                                    }
                                    placeholder="0312-3456789"
                                    required
                                />
                                <Input
                                    label="Guardian Email"
                                    type="email"
                                    value={form.guardianEmail}
                                    onChange={(v) =>
                                        updateField("guardianEmail", v)
                                    }
                                    placeholder="Guardian email"
                                />
                                <Input
                                    label="Emergency Contact"
                                    value={form.emergencyContact}
                                    onChange={(v) =>
                                        updateField("emergencyContact", v)
                                    }
                                    placeholder="Emergency contact number"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 3 — TEACHER */}
                    {step === 3 && form.role === "Teacher" && (
                        <div className="space-y-5">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Professional Information
                            </h3>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Input
                                    label="Father Name"
                                    value={form.fatherName}
                                    onChange={(v) => updateField("fatherName", v)}
                                    placeholder="Father name"
                                    required
                                />
                                <Input
                                    label="Qualification"
                                    value={form.qualification}
                                    onChange={(v) =>
                                        updateField("qualification", v)
                                    }
                                    placeholder="e.g. M.Sc. Mathematics"
                                    required
                                />
                                <Input
                                    label="Experience"
                                    value={form.experience}
                                    onChange={(v) => updateField("experience", v)}
                                    placeholder="e.g. 5 years"
                                    required
                                />
                                <Select
                                    label="Department"
                                    value={form.department}
                                    onChange={(v) => updateField("department", v)}
                                    options={[
                                        "Primary", "Middle", "Senior",
                                        "Administration",
                                    ]}
                                    placeholder="Select department"
                                    required
                                />
                                <Select
                                    label="Designation"
                                    value={form.designation}
                                    onChange={(v) =>
                                        updateField("designation", v)
                                    }
                                    options={[
                                        "Teacher", "Senior Teacher",
                                        "Subject Teacher", "Coordinator",
                                    ]}
                                    placeholder="Select designation"
                                    required
                                />
                                <Input
                                    label="Subjects"
                                    value={form.subjects}
                                    onChange={(v) => updateField("subjects", v)}
                                    placeholder="e.g. Mathematics, Physics"
                                    required
                                />
                                <Input
                                    label="Joining Date"
                                    type="date"
                                    value={form.joiningDate}
                                    onChange={(v) =>
                                        updateField("joiningDate", v)
                                    }
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 3 — PARENT */}
                    {step === 3 && form.role === "Parent" && (
                        <div className="space-y-5">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Parent Information
                            </h3>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Input
                                    label="Occupation"
                                    value={form.occupation}
                                    onChange={(v) => updateField("occupation", v)}
                                    placeholder="e.g. Businessman"
                                    required
                                />
                                <Select
                                    label="Relationship with Student"
                                    value={form.relationship}
                                    onChange={(v) =>
                                        updateField("relationship", v)
                                    }
                                    options={["Father", "Mother", "Guardian"]}
                                    placeholder="Select relationship"
                                    required
                                />
                                <Input
                                    label="Child Name"
                                    value={form.childName}
                                    onChange={(v) => updateField("childName", v)}
                                    placeholder="Enter child name"
                                    required
                                />
                                <Input
                                    label="Child Roll Number"
                                    value={form.childRollNo}
                                    onChange={(v) =>
                                        updateField("childRollNo", v)
                                    }
                                    placeholder="e.g. 101"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <div className="space-y-5">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Review & Create Account
                            </h3>
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <ReviewItem label="Registration Type" value={form.role} />
                                    <ReviewItem label="Full Name" value={form.fullName} />
                                    <ReviewItem label="Email" value={form.email} />
                                    <ReviewItem label="Username" value={form.username} />
                                    <ReviewItem label="Phone" value={form.phone} />
                                    <ReviewItem label="Gender" value={form.gender} />
                                    <ReviewItem label="Date of Birth" value={form.dateOfBirth} />

                                    {form.role === "Student" ? (
                                        <>
                                            <ReviewItem label="Applying Class" value={form.applyingClass} />
                                            <ReviewItem label="Guardian" value={form.guardianName} />
                                            <ReviewItem label="Previous School" value={form.previousSchool} />
                                        </>
                                    ) : form.role === "Teacher" ? (
                                        <>
                                            <ReviewItem label="Qualification" value={form.qualification} />
                                            <ReviewItem label="Department" value={form.department} />
                                            <ReviewItem label="Designation" value={form.designation} />
                                            <ReviewItem label="Subjects" value={form.subjects} />
                                        </>
                                    ) : (
                                        <>
                                            <ReviewItem label="Occupation" value={form.occupation} />
                                            <ReviewItem label="Relationship" value={form.relationship} />
                                            <ReviewItem label="Child Name" value={form.childName} />
                                            <ReviewItem label="Child Roll Number" value={form.childRollNo} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                        {step === 1 ? (
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                            >
                                <ArrowLeft size={17} />
                                Back
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                            >
                                <ArrowLeft size={17} />
                                Previous
                            </button>
                        )}

                        {step < 4 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="inline-flex items-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
                            >
                                Continue
                                <ArrowRight size={17} />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Check size={17} />
                                {isSubmitting ? "Creating Account..." : "Create Account"}
                            </button>
                        )}
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-[#01796F] hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

/* Helpers */

type InputProps = {
    label: string;
    type?: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange: (value: string) => void;
};

function Input({
    label,
    type = "text",
    value,
    placeholder,
    required,
    onChange,
}: InputProps) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
        </div>
    );
}

type SelectProps = {
    label: string;
    value: string;
    options: string[];
    placeholder?: string;
    required?: boolean;
    onChange: (value: string) => void;
};

function Select({
    label,
    value,
    options,
    placeholder,
    required,
    onChange,
}: SelectProps) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                value={value}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
                <option value="">{placeholder || "Select"}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

type ReviewItemProps = {
    label: string;
    value: string;
};

function ReviewItem({ label, value }: ReviewItemProps) {
    return (
        <div>
            <p className="text-xs font-medium uppercase text-gray-400">
                {label}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800">
                {value || "Not provided"}
            </p>
        </div>
    );
}
