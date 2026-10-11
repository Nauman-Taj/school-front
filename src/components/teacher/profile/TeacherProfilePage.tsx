"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
    BookOpen,
    Mail,
    Phone,
    GraduationCap,
    UserRound,
    CalendarDays,
    Users,
    MapPin,
    Briefcase,
    Pencil,
    Save,
    X,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import { getSession, type AuthSession } from "@/lib/auth";
import { getUsers, saveUsers } from "@/lib/users";
import {
    getRegisteredTeacher,
    saveRegisteredTeacher,
    type RegisteredTeacher,
} from "@/lib/registeredProfiles";

import { teachers } from "@/data/teachers";
import { subjects } from "@/data/subjects";
import { classes } from "@/data/classes";

type TeacherProfileForm = {
    name: string;
    email: string;
    phone: string;
    qualification: string;
    department: string;
    designation: string;
    address: string;
    joiningDate: string;
    subjects: string;
};

type Feedback = {
    type: "success" | "error";
    message: string;
};

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

/**
 * Normalizes subjects regardless of whether localStorage contains
 * a string array or a comma-separated string.
 */
function normalizeSubjects(
    value: unknown,
    fallback: string[] = []
): string[] {
    if (Array.isArray(value)) {
        return value
            .filter((item): item is string => typeof item === "string")
            .flatMap((item) => item.split(","))
            .map((item) => item.trim())
            .filter(Boolean);
    }

    if (typeof value === "string") {
        return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [...fallback];
}

function getSharedTeacher(session: AuthSession) {
    return (
        teachers.find(
            (teacher) =>
                teacher.email.trim().toLowerCase() ===
                session.email.trim().toLowerCase()
        ) ??
        teachers.find(
            (teacher) =>
                teacher.name.trim().toLowerCase() ===
                session.name.trim().toLowerCase()
        ) ??
        null
    );
}

function buildProfileForm(
    session: AuthSession,
    registered: RegisteredTeacher | null
): TeacherProfileForm {
    const shared = getSharedTeacher(session);

    const sharedSubjects =
        shared && !registered
            ? subjects
                .filter((subject) => subject.teacherId === shared.id)
                .map((subject) => subject.name)
            : [];

    return {
        name: registered?.name ?? shared?.name ?? session.name,
        email: registered?.email ?? shared?.email ?? session.email,
        phone: registered?.phone ?? shared?.phone ?? "",
        qualification:
            registered?.qualification ?? shared?.qualification ?? "",
        department: registered?.department ?? "",
        designation:
            registered?.designation ??
            (shared ? `${shared.subject} Teacher` : "Teacher"),
        address: registered?.address ?? "",
        joiningDate: registered?.joiningDate ?? shared?.joiningDate ?? "",
        subjects: normalizeSubjects(
            registered?.subjects,
            sharedSubjects
        ).join(", "),
    };
}

export default function TeacherProfilePage() {
    const [session, setSession] = useState<AuthSession | null>(null);
    const [registeredTeacher, setRegisteredTeacher] =
        useState<RegisteredTeacher | null>(null);
    const [profile, setProfile] = useState<TeacherProfileForm | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        const activeSession = getSession();
        setSession(activeSession);

        if (!activeSession || activeSession.role !== "Teacher") {
            setLoading(false);
            return;
        }

        const registered = getRegisteredTeacher(activeSession);
        const shared = getSharedTeacher(activeSession);

        if (!registered && !shared) {
            setLoading(false);
            return;
        }

        setRegisteredTeacher(registered);
        setProfile(buildProfileForm(activeSession, registered));
        setLoading(false);
    }, []);

    const sharedTeacher = useMemo(() => {
        if (!session || session.role !== "Teacher") return null;
        return getSharedTeacher(session);
    }, [session]);

    const teacherClasses = useMemo(() => {
        if (!sharedTeacher || registeredTeacher) return [];

        return classes.filter(
            (schoolClass) => schoolClass.teacherId === sharedTeacher.id
        );
    }, [sharedTeacher, registeredTeacher]);

    const assignedSubjects = useMemo(() => {
        return normalizeSubjects(profile?.subjects ?? "");
    }, [profile?.subjects]);

    const updateField = (
        field: keyof TeacherProfileForm,
        value: string
    ) => {
        setProfile((previous) =>
            previous ? { ...previous, [field]: value } : previous
        );
    };

    const cancelEditing = () => {
        if (!session) return;

        const registered = getRegisteredTeacher(session);
        setRegisteredTeacher(registered);
        setProfile(buildProfileForm(session, registered));
        setIsEditing(false);
        setFeedback(null);
    };

    const handleSaveProfile = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFeedback(null);

        if (!session || !profile) return;

        const name = profile.name.trim();
        const email = profile.email.trim().toLowerCase();

        if (!name || !email) {
            setFeedback({
                type: "error",
                message: "Full name and email address are required.",
            });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setFeedback({
                type: "error",
                message: "Please enter a valid email address.",
            });
            return;
        }

        setSaving(true);

        try {
            const users = getUsers();

            const duplicateEmail = users.some(
                (user) =>
                    user.email.trim().toLowerCase() === email &&
                    user.id !== session.id
            );

            if (duplicateEmail) {
                setFeedback({
                    type: "error",
                    message: "This email address is already used by another account.",
                });
                return;
            }

            const cleanedSubjects = normalizeSubjects(profile.subjects);

            const updatedProfile: RegisteredTeacher = {
                ...(registeredTeacher ?? {}),
                id: registeredTeacher?.id ?? session.id,
                name,
                email,
                phone: profile.phone.trim(),
                qualification: profile.qualification.trim(),
                department: profile.department.trim(),
                designation: profile.designation.trim(),
                address: profile.address.trim(),
                joiningDate: profile.joiningDate.trim(),
                subjects: cleanedSubjects,
                status: registeredTeacher?.status ?? "Active",
            };

            saveRegisteredTeacher(updatedProfile);

            const updatedUsers = users.map((user) =>
                user.id === session.id
                    ? { ...user, name, email }
                    : user
            );

            saveUsers(updatedUsers);

            const updatedSession: AuthSession = {
                ...session,
                name,
                email,
            };

            const storedLocalSession =
                localStorage.getItem("auth-session") !== null;
            const storedSessionSession =
                sessionStorage.getItem("auth-session") !== null;

            if (storedLocalSession) {
                localStorage.setItem(
                    "auth-session",
                    JSON.stringify(updatedSession)
                );
            } else if (storedSessionSession) {
                sessionStorage.setItem(
                    "auth-session",
                    JSON.stringify(updatedSession)
                );
            }

            setSession(updatedSession);
            setRegisteredTeacher(updatedProfile);

            setProfile({
                ...profile,
                name,
                email,
                phone: updatedProfile.phone ?? "",
                qualification: updatedProfile.qualification ?? "",
                department: updatedProfile.department ?? "",
                designation: updatedProfile.designation ?? "Teacher",
                address: updatedProfile.address ?? "",
                joiningDate: updatedProfile.joiningDate ?? "",
                subjects: cleanedSubjects.join(", "),
            });

            setIsEditing(false);

            setFeedback({
                type: "success",
                message: "Your profile has been saved successfully.",
            });
        } catch {
            setFeedback({
                type: "error",
                message: "Unable to save your profile. Please try again.",
            });
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setFeedback(null);

        if (!session) return;

        if (!currentPassword || !newPassword || !confirmPassword) {
            setFeedback({
                type: "error",
                message: "Please complete all password fields.",
            });
            return;
        }

        if (newPassword.length < 8) {
            setFeedback({
                type: "error",
                message: "Your new password must contain at least 8 characters.",
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            setFeedback({
                type: "error",
                message: "The new password and confirmation do not match.",
            });
            return;
        }

        if (newPassword === currentPassword) {
            setFeedback({
                type: "error",
                message: "Your new password must differ from the current password.",
            });
            return;
        }

        setChangingPassword(true);

        try {
            const users = getUsers();
            const account = users.find((user) => user.id === session.id);

            if (!account || account.password !== currentPassword) {
                setFeedback({
                    type: "error",
                    message: "Your current password is incorrect.",
                });
                return;
            }

            saveUsers(
                users.map((user) =>
                    user.id === session.id
                        ? { ...user, password: newPassword }
                        : user
                )
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setFeedback({
                type: "success",
                message: "Your password has been changed successfully.",
            });
        } catch {
            setFeedback({
                type: "error",
                message: "Unable to change your password. Please try again.",
            });
        } finally {
            setChangingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
                Loading your profile...
            </div>
        );
    }

    if (!session || session.role !== "Teacher") {
        return (
            <EmptyState
                title="Teacher access required"
                message="Please sign in with a teacher account to view this profile."
            />
        );
    }

    if (!profile) {
        return (
            <EmptyState
                title="Teacher profile not found"
                message="No teacher profile matches your account. Please contact the school administration."
            />
        );
    }

    return (
        <div className="space-y-5">
            {/* Profile header */}

            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Profile
                </h1>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    View and manage your account information
                </p>
            </div>


            <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="h-17" />

                <div className="px-5 pb-6 sm:px-9">
                    <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#e6f4f2] text-[#01796f] shadow-sm">
                                <UserRound size={42} />
                            </div>

                            <div className="pb-1">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {profile.name}
                                </h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    {profile.designation || "Teacher"}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                if (isEditing) {
                                    cancelEditing();
                                } else {
                                    setFeedback(null);
                                    setIsEditing(true);
                                }
                            }}
                            className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
                        >
                            {isEditing ? <X size={16} /> : <Pencil size={16} />}
                            {isEditing ? "Cancel Editing" : "Edit Profile"}
                        </button>
                    </div>
                </div>
            </section>

            {feedback && (
                <div
                    role="status"
                    className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${feedback.type === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-red-200 bg-red-50 text-red-700"
                        }`}
                >
                    {feedback.type === "success" ? (
                        <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
                    ) : (
                        <AlertCircle size={19} className="mt-0.5 shrink-0" />
                    )}
                    <p>{feedback.message}</p>
                </div>
            )}

            {/* Personal information */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                    icon={<UserRound size={20} />}
                    title="Personal Information"
                    description="View and manage your account and contact details"
                />

                {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <FormField label="Full Name" required>
                                <input
                                    className={inputClass}
                                    value={profile.name}
                                    onChange={(event) =>
                                        updateField("name", event.target.value)
                                    }
                                    required
                                    maxLength={100}
                                />
                            </FormField>

                            <FormField label="Email Address" required>
                                <input
                                    type="email"
                                    className={inputClass}
                                    value={profile.email}
                                    onChange={(event) =>
                                        updateField("email", event.target.value)
                                    }
                                    required
                                    maxLength={150}
                                />
                            </FormField>

                            <FormField label="Phone Number">
                                <input
                                    type="tel"
                                    className={inputClass}
                                    value={profile.phone}
                                    onChange={(event) =>
                                        updateField("phone", event.target.value)
                                    }
                                    maxLength={30}
                                />
                            </FormField>

                            <FormField label="Qualification">
                                <input
                                    className={inputClass}
                                    value={profile.qualification}
                                    onChange={(event) =>
                                        updateField("qualification", event.target.value)
                                    }
                                    maxLength={100}
                                />
                            </FormField>

                            <FormField label="Department">
                                <input
                                    className={inputClass}
                                    value={profile.department}
                                    onChange={(event) =>
                                        updateField("department", event.target.value)
                                    }
                                    maxLength={100}
                                />
                            </FormField>

                            <FormField label="Designation">
                                <input
                                    className={inputClass}
                                    value={profile.designation}
                                    onChange={(event) =>
                                        updateField("designation", event.target.value)
                                    }
                                    maxLength={100}
                                />
                            </FormField>

                            <FormField label="Joining Date">
                                <input
                                    type="date"
                                    className={inputClass}
                                    value={profile.joiningDate}
                                    onChange={(event) =>
                                        updateField("joiningDate", event.target.value)
                                    }
                                />
                            </FormField>

                            <FormField label="Address">
                                <input
                                    className={inputClass}
                                    value={profile.address}
                                    onChange={(event) =>
                                        updateField("address", event.target.value)
                                    }
                                    maxLength={250}
                                />
                            </FormField>

                            <div className="sm:col-span-2">
                                <FormField label="Assigned Subjects">
                                    <input
                                        className={inputClass}
                                        value={profile.subjects}
                                        onChange={(event) =>
                                            updateField("subjects", event.target.value)
                                        }
                                        placeholder="Mathematics, Science, English"
                                    />
                                    <p className="mt-2 text-xs text-gray-500">
                                        Separate subject names with commas.
                                    </p>
                                </FormField>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-5">
                            <button
                                type="button"
                                onClick={cancelEditing}
                                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Save size={16} />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <InfoItem
                            icon={<UserRound size={18} />}
                            label="Full Name"
                            value={profile.name}
                        />
                        <InfoItem
                            icon={<Mail size={18} />}
                            label="Email Address"
                            value={profile.email}
                        />
                        <InfoItem
                            icon={<Phone size={18} />}
                            label="Phone Number"
                            value={profile.phone || "Not provided"}
                        />
                        <InfoItem
                            icon={<GraduationCap size={18} />}
                            label="Qualification"
                            value={profile.qualification || "Not provided"}
                        />
                        <InfoItem
                            icon={<Briefcase size={18} />}
                            label="Department"
                            value={profile.department || "Not assigned"}
                        />
                        <InfoItem
                            icon={<Briefcase size={18} />}
                            label="Designation"
                            value={profile.designation || "Teacher"}
                        />
                        <InfoItem
                            icon={<CalendarDays size={18} />}
                            label="Joining Date"
                            value={profile.joiningDate || "Not provided"}
                        />
                        <InfoItem
                            icon={<MapPin size={18} />}
                            label="Address"
                            value={profile.address || "Not provided"}
                        />
                    </div>
                )}
            </section>

            {/* Assigned subjects */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                    icon={<BookOpen size={20} />}
                    title="Assigned Subjects"
                    description="Subjects associated with your teacher profile"
                />

                {assignedSubjects.length ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {assignedSubjects.map((subject, index) => (
                            <div
                                key={`${subject}-${index}`}
                                className="flex items-center gap-3 rounded-xl border border-gray-100 p-4"
                            >
                                <div className="rounded-full bg-[#e6f4f2] p-2 text-[#01796f]">
                                    <BookOpen size={18} />
                                </div>
                                <span className="text-sm font-medium text-gray-800">
                                    {subject}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyMessage message="No subjects have been assigned to this teacher yet." />
                )}
            </section>

            {/* Assigned classes */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                    icon={<Users size={20} />}
                    title="Assigned Classes"
                    description="Classes associated with your shared school record"
                />

                {teacherClasses.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[420px] text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-sm text-gray-500">
                                    <th className="px-4 py-3 font-medium">Class</th>
                                    <th className="px-4 py-3 font-medium">Section</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teacherClasses.map((schoolClass) => (
                                    <tr
                                        key={schoolClass.id}
                                        className="border-b border-gray-50 last:border-0"
                                    >
                                        <td className="px-4 py-4 text-sm font-medium text-gray-800">
                                            {schoolClass.name}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            {schoolClass.section}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyMessage message="No shared class assignments are available for this account." />
                )}
            </section>

            {/* Change password */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <SectionHeading
                    icon={<Lock size={20} />}
                    title="Change Password"
                    description="Verify your current password before setting a new one"
                />

                <form onSubmit={handleChangePassword} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        <PasswordField
                            label="Current Password"
                            value={currentPassword}
                            onChange={setCurrentPassword}
                            visible={showCurrentPassword}
                            onToggle={() =>
                                setShowCurrentPassword((value) => !value)
                            }
                            autoComplete="current-password"
                        />

                        <PasswordField
                            label="New Password"
                            value={newPassword}
                            onChange={setNewPassword}
                            visible={showNewPassword}
                            onToggle={() => setShowNewPassword((value) => !value)}
                            autoComplete="new-password"
                        />

                        <PasswordField
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            visible={showConfirmPassword}
                            onToggle={() =>
                                setShowConfirmPassword((value) => !value)
                            }
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="flex justify-end border-t border-gray-100 pt-5">
                        <button
                            type="submit"
                            disabled={changingPassword}
                            className="inline-flex items-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Lock size={16} />
                            {changingPassword ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

function FormField({
    label,
    required = false,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className={labelClass}>
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}

function PasswordField({
    label,
    value,
    onChange,
    visible,
    onToggle,
    autoComplete,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    visible: boolean;
    onToggle: () => void;
    autoComplete: string;
}) {
    return (
        <div>
            <label className={labelClass}>{label}</label>
            <div className="relative">
                <input
                    type={visible ? "text" : "password"}
                    className={`${inputClass} pr-12`}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    autoComplete={autoComplete}
                    required
                />
                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={visible ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
                >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
}

function SectionHeading({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="mb-5 flex items-center gap-3">
            <div className="rounded-full bg-[#e6f4f2] p-2.5 text-[#01796f]">
                {icon}
            </div>
            <div>
                <h2 className="font-semibold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
}

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex min-w-0 items-start gap-3">
            <div className="mt-0.5 rounded-full bg-[#e6f4f2] p-2 text-[#01796f]">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="mt-1 break-words text-sm font-medium text-gray-900">
                    {value}
                </p>
            </div>
        </div>
    );
}

function EmptyMessage({ message }: { message: string }) {
    return (
        <div className="rounded-xl bg-[#f6f8f8] px-4 py-6 text-center">
            <p className="text-sm text-gray-500">{message}</p>
        </div>
    );
}

function EmptyState({
    title,
    message,
}: {
    title: string;
    message: string;
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <UserRound className="mx-auto mb-3 h-10 w-10 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-500">{message}</p>
        </div>
    );
}