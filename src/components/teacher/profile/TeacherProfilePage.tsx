"use client";

import { useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import { updateAuthSession } from "@/lib/auth";
import {
  changeTeacherPassword,
  updateTeacherProfile,
} from "@/lib/teacher-api";
import { useTeacherProfile } from "@/lib/useTeacherProfile";

type ProfileForm = {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  joiningDate: string;
};

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Feedback = {
  type: "success" | "error";
  message: string;
};

const emptyPasswordForm: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

/**
 * The message shown above a section, so a success or an error is always next
 * to the form it belongs to.
 */
function FeedbackBanner({ type, message }: Feedback) {
  return (
    <div
      role="status"
      className={`flex items-start gap-2 rounded-xl border p-4 text-sm ${type === "success"
        ? "border-[#b8e4dd] bg-[#e6f4f2] text-[#015f58]"
        : "border-red-200 bg-red-50 text-red-700"
        }`}
    >
      {type === "success" ? (
        <Check size={18} className="mt-0.5 shrink-0" />
      ) : (
        <AlertCircle size={18} className="mt-0.5 shrink-0" />
      )}

      {message}
    </div>
  );
}

export default function TeacherProfilePage() {
  const {
    profile: loadedProfile,
    loading,
    error: profileError,
  } = useTeacherProfile();

  // After a save the server response is the freshest copy of the profile, so
  // it takes over from the value the hook loaded.
  const [savedProfile, setSavedProfile] = useState<
    typeof loadedProfile
  >(null);

  const profile = savedProfile ?? loadedProfile;

  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    joiningDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordForm, setPasswordForm] =
    useState<PasswordForm>(emptyPasswordForm);

  // Each section keeps its own message, so a password error stays visible
  // next to the password form instead of scrolling away to the top.
  const [profileFeedback, setProfileFeedback] = useState<Feedback | null>(
    null
  );

  const [passwordFeedback, setPasswordFeedback] = useState<Feedback | null>(
    null
  );

  const toForm = (source: {
    name: string;
    email: string;
    phone: string;
    qualification: string;
    joiningDate: string | null;
  }): ProfileForm => ({
    name: source.name ?? "",
    email: source.email ?? "",
    phone: source.phone ?? "",
    qualification: source.qualification ?? "",
    joiningDate: source.joiningDate ?? "",
  });

  const handleCancelEdit = () => {
    if (!profile) return;

    setForm(toForm(profile));
    setIsEditing(false);
    setProfileFeedback(null);
  };

  const handleStartEdit = () => {
    if (!profile) return;

    setForm(toForm(profile));
    setProfileFeedback(null);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!profile) return;

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email) {
      setProfileFeedback({
        type: "error",
        message: "Name and email are required.",
      });
      return;
    }

    setSavingProfile(true);

    try {
      const updated = await updateTeacherProfile({
        name,
        email,
        phone: form.phone.trim(),
        qualification: form.qualification.trim(),
        ...(form.joiningDate ? { joiningDate: form.joiningDate } : {}),
      });

      setSavedProfile(updated);
      setForm(toForm(updated));
      setIsEditing(false);

      // Keep the stored session in step with the edited profile.
      updateAuthSession({ name: updated.name, email: updated.email });

      setProfileFeedback({
        type: "success",
        message: "Profile updated successfully.",
      });
    } catch (err: unknown) {
      setProfileFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Could not save your profile. Please try again.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const togglePassword = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handlePasswordUpdate = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordFeedback({
        type: "error",
        message: "Please complete all password fields.",
      });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordFeedback({
        type: "error",
        message: "Your new password must contain at least 8 characters.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({
        type: "error",
        message: "The new passwords do not match.",
      });
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordFeedback({
        type: "error",
        message: "Your new password must be different from your current password.",
      });
      return;
    }

    setSavingPassword(true);

    try {
      await changeTeacherPassword(currentPassword, newPassword);

      setPasswordForm(emptyPasswordForm);
      setPasswordVisibility({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });

      setPasswordFeedback({
        type: "success",
        message: "Password updated successfully.",
      });
    } catch (err: unknown) {
      setPasswordFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Could not update your password. Please try again.",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
        <p className="mt-4 text-sm text-gray-500">Loading your profile...</p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-400" />

        <h2 className="text-lg font-semibold text-gray-900">
          Profile unavailable
        </h2>

        <p className="mt-2 text-sm text-gray-500">{profileError}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <User className="mx-auto mb-3 h-10 w-10 text-gray-400" />

        <h2 className="text-lg font-semibold text-gray-900">
          Teacher profile not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          We couldn&apos;t find a teacher profile matching your account. Please
          contact the school administration.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View and manage your account information.
        </p>
      </div>

      {/* Profile header */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-row items-center gap-3 sm:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F] sm:h-20 sm:w-20">
            <User size={28} className="sm:hidden" />
            <User size={36} className="hidden sm:block" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-gray-900 sm:text-2xl">
              {profile.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {profile.subject || "Teacher"}
              {profile.subject ? " Teacher" : ""}
            </p>
          </div>

          <div className="ml-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  handleCancelEdit();
                } else {
                  handleStartEdit();
                }
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#01796F] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#015f58] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {/* {isEditing ? <User size={14} /> : <Pencil size={14} />} */}
              {isEditing ? "Cancel" : <><Pencil size={14} /> Edit Profile</>}
            </button>
          </div>
        </div>
      </section>

      {/* Profile feedback */}
      {profileFeedback && <FeedbackBanner {...profileFeedback} />}

      {/* Personal information */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your contact details and qualification.
          </p>
        </div>

        {isEditing ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <FormInput
              label="Full Name"
              value={form.name}
              onChange={(value) =>
                setForm((current) => ({ ...current, name: value }))
              }
            />

            <FormInput
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) =>
                setForm((current) => ({ ...current, email: value }))
              }
            />

            <FormInput
              label="Phone"
              value={form.phone}
              onChange={(value) =>
                setForm((current) => ({ ...current, phone: value }))
              }
            />

            <FormInput
              label="Qualification"
              value={form.qualification}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  qualification: value,
                }))
              }
            />

            <div className="sm:col-span-2">
              <FormInput
                label="Joining Date"
                type="date"
                value={form.joiningDate}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    joiningDate: value,
                  }))
                }
              />
            </div>

            <div className="flex justify-end sm:col-span-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={savingProfile}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <Check size={17} />
                {savingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <ProfileItem
              icon={User}
              label="Full Name"
              value={profile.name}
            />

            <ProfileItem
              icon={Mail}
              label="Email"
              value={profile.email}
            />

            <ProfileItem
              icon={Phone}
              label="Phone"
              value={profile.phone}
            />

            <ProfileItem
              icon={GraduationCap}
              label="Qualification"
              value={profile.qualification}
            />

            <ProfileItem
              icon={BookOpen}
              label="Primary Subject"
              value={profile.subject}
            />

            <ProfileItem
              icon={CalendarDays}
              label="Joining Date"
              value={profile.joiningDate ?? ""}
            />

            <ProfileItem
              icon={ShieldCheck}
              label="Status"
              value={profile.status}
            />
          </div>
        )}
      </section>

      {/* Assigned subjects */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Assigned Subjects
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            The subjects you teach and the classes they belong to.
          </p>
        </div>

        {profile.subjects.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profile.subjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <BookOpen size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {subject.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {subject.className} - {subject.section} · {subject.code}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-[#f6f8f8] px-4 py-6 text-center">
            <p className="text-sm text-gray-500">
              No subjects have been assigned to this teacher yet.
            </p>
          </div>
        )}
      </section>

      {/* Assigned classes */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Assigned Classes
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            The classes you are responsible for.
          </p>
        </div>

        {profile.classes.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Class</th>
                    <th className="px-5 py-4 font-semibold">Section</th>
                    <th className="px-5 py-4 font-semibold">Room</th>
                    <th className="px-5 py-4 font-semibold">Students</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {profile.classes.map((schoolClass) => (
                    <tr
                      key={schoolClass.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {schoolClass.name}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {schoolClass.section}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {schoolClass.room}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {schoolClass.studentCount}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {schoolClass.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
              Showing {profile.classes.length} of {profile.classes.length} classes
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-[#f6f8f8] px-4 py-6 text-center">
            <p className="text-sm text-gray-500">
              No class assignments are available for this account.
            </p>
          </div>
        )}
      </section>

      {/* Password feedback */}
      {passwordFeedback && <FeedbackBanner {...passwordFeedback} />}

      {/* Change password */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Change Password
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter your current password before choosing a new one.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <PasswordInput
            label="Current Password"
            value={passwordForm.currentPassword}
            onChange={(value) =>
              setPasswordForm((current) => ({
                ...current,
                currentPassword: value,
              }))
            }
            showPassword={passwordVisibility.currentPassword}
            onToggle={() => togglePassword("currentPassword")}
          />

          <PasswordInput
            label="New Password"
            value={passwordForm.newPassword}
            onChange={(value) =>
              setPasswordForm((current) => ({
                ...current,
                newPassword: value,
              }))
            }
            showPassword={passwordVisibility.newPassword}
            onToggle={() => togglePassword("newPassword")}
          />

          <PasswordInput
            label="Confirm New Password"
            value={passwordForm.confirmPassword}
            onChange={(value) =>
              setPasswordForm((current) => ({
                ...current,
                confirmPassword: value,
              }))
            }
            showPassword={passwordVisibility.confirmPassword}
            onToggle={() => togglePassword("confirmPassword")}
          />
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handlePasswordUpdate}
            disabled={savingPassword}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Lock size={17} />
            {savingPassword ? "Updating..." : "Update Password"}
          </button>
        </div>
      </section>
    </div>
  );
}

type FormInputProps = {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
};

function FormInput({
  label,
  value,
  type = "text",
  onChange,
}: FormInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
      />
    </div>
  );
}

type ProfileItemProps = {
  icon: typeof User;
  label: string;
  value: string;
};

function ProfileItem({ icon: Icon, label, value }: ProfileItemProps) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500">{label}</p>

        <p className="mt-1 break-words text-sm font-medium text-gray-900">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

type PasswordInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggle: () => void;
};

function PasswordInput({
  label,
  value,
  onChange,
  showPassword,
  onToggle,
}: PasswordInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="current-password"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:text-[#01796F]"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
