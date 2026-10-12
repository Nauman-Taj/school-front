
"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Lock,
  Pencil,
  Check,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

import { getSession } from "@/lib/auth";
import { getUsers, saveUsers } from "@/lib/users";
import {
  getRegisteredParent,
  saveRegisteredParent,
  type RegisteredParent,
} from "@/lib/registeredProfiles";
import { parents } from "@/data/parents";

type ParentProfile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  occupation: string;
  address: string;
  status: "Active" | "Inactive";
};

type ProfileForm = {
  name: string;
  email: string;
  phone: string;
  occupation: string;
  address: string;
};

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const emptyForm: ProfileForm = {
  name: "",
  email: "",
  phone: "",
  occupation: "",
  address: "",
};

const emptyPasswordForm: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ParentProfilePage() {
  const [profile, setProfile] = useState<ParentProfile | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordForm, setPasswordForm] =
    useState<PasswordForm>(emptyPasswordForm);

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const session = getSession();

    if (!session || session.role !== "Parent") {
      setLoading(false);
      return;
    }

    const registeredParent = getRegisteredParent(session);

    // Match the signed-in parent, never use parents[0] as a fallback.
    const sharedParent =
      parents.find(
        (item) =>
          item.email.trim().toLowerCase() ===
          session.email.trim().toLowerCase()
      ) ??
      parents.find(
        (item) =>
          item.name.trim().toLowerCase() ===
          session.name.trim().toLowerCase()
      ) ??
      null;

    const matchedParent = registeredParent ?? sharedParent;

    if (!matchedParent) {
      setLoading(false);
      return;
    }

    const nextProfile: ParentProfile = {
      id: matchedParent.id,
      name: matchedParent.name,
      email: matchedParent.email,
      phone: matchedParent.phone ?? "",
      occupation: matchedParent.occupation ?? "",
      address: matchedParent.address ?? "",
      status:
        matchedParent.status === "Inactive" ? "Inactive" : "Active",
    };

    setProfile(nextProfile);
    setForm({
      name: nextProfile.name,
      email: nextProfile.email,
      phone: nextProfile.phone,
      occupation: nextProfile.occupation,
      address: nextProfile.address,
    });

    setLoading(false);
  }, []);

  const showFeedback = (
    type: "success" | "error",
    message: string
  ) => {
    setFeedback({ type, message });
  };

  const handleCancelEdit = () => {
    if (!profile) return;

    setForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      occupation: profile.occupation,
      address: profile.address,
    });

    setIsEditing(false);
    setFeedback(null);
  };

  const handleSave = () => {
    if (!profile) return;

    const session = getSession();

    if (!session || session.role !== "Parent") {
      showFeedback("error", "Your session has expired. Please sign in again.");
      return;
    }

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email) {
      showFeedback("error", "Name and email are required.");
      return;
    }

    const users = getUsers();

    const duplicateEmail = users.some(
      (user) =>
        user.id !== session.id &&
        user.email.trim().toLowerCase() === email
    );

    if (duplicateEmail) {
      showFeedback("error", "That email address is already in use.");
      return;
    }

    const updatedProfile: ParentProfile = {
      ...profile,
      name,
      email,
      phone: form.phone.trim(),
      occupation: form.occupation.trim(),
      address: form.address.trim(),
    };

    try {
      const registeredParent = getRegisteredParent(session);

      if (registeredParent) {
        const updatedRegisteredParent: RegisteredParent = {
          ...registeredParent,
          name: updatedProfile.name,
          email: updatedProfile.email,
          phone: updatedProfile.phone,
          occupation: updatedProfile.occupation,
          address: updatedProfile.address,
          status: updatedProfile.status,
        };

        saveRegisteredParent(updatedRegisteredParent);
      } else {
        // Shared seed records are not modified. Store an editable
        // profile for this account in the registered-profile collection.
        saveRegisteredParent({
          id: session.id,
          name: updatedProfile.name,
          email: updatedProfile.email,
          phone: updatedProfile.phone,
          occupation: updatedProfile.occupation,
          address: updatedProfile.address,
          status: updatedProfile.status,
        });
      }

      // Keep the login account consistent with the edited profile.
      const account = users.find((user) => user.id === session.id);

      if (account) {
        saveUsers(
          users.map((user) =>
            user.id === session.id
              ? { ...user, name, email }
              : user
          )
        );
      }

      // Keep whichever storage currently holds the session.
      const updatedSession = { ...session, name, email };
      const localSession = localStorage.getItem("auth-session");
      const sessionStoredLocally = localSession !== null;

      if (sessionStoredLocally) {
        localStorage.setItem(
          "auth-session",
          JSON.stringify(updatedSession)
        );
      } else {
        sessionStorage.setItem(
          "auth-session",
          JSON.stringify(updatedSession)
        );
      }

      setProfile(updatedProfile);
      setForm({
        name: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        occupation: updatedProfile.occupation,
        address: updatedProfile.address,
      });
      setIsEditing(false);
      showFeedback("success", "Profile updated successfully.");
    } catch {
      showFeedback(
        "error",
        "Could not save your profile. Please try again."
      );
    }
  };

  const togglePassword = (
    field: keyof typeof passwordVisibility
  ) => {
    setPasswordVisibility((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handlePasswordUpdate = () => {
    const { currentPassword, newPassword, confirmPassword } =
      passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      showFeedback("error", "Please complete all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      showFeedback(
        "error",
        "Your new password must contain at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showFeedback("error", "The new passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      showFeedback(
        "error",
        "Your new password must be different from your current password."
      );
      return;
    }

    const session = getSession();

    if (!session || session.role !== "Parent") {
      showFeedback("error", "Please sign in again.");
      return;
    }

    const users = getUsers();
    const account = users.find((user) => user.id === session.id);

    if (!account || account.password !== currentPassword) {
      showFeedback("error", "Your current password is incorrect.");
      return;
    }

    try {
      saveUsers(
        users.map((user) =>
          user.id === session.id
            ? { ...user, password: newPassword }
            : user
        )
      );

      setPasswordForm(emptyPasswordForm);
      setPasswordVisibility({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });

      showFeedback("success", "Password updated successfully.");
    } catch {
      showFeedback(
        "error",
        "Could not update your password. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-sm text-gray-500">Loading your profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <User className="mx-auto mb-3 h-10 w-10 text-gray-400" />

        <h2 className="text-lg font-semibold text-gray-900">
          Parent profile not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          We couldn't find a parent profile matching your account. Please
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

      {/* Feedback */}
      {feedback && (
        <div
          role="status"
          className={`flex items-start gap-2 rounded-xl border p-4 text-sm ${feedback.type === "success"
            ? "border-[#b8e4dd] bg-[#e6f4f2] text-[#015f58]"
            : "border-red-200 bg-red-50 text-red-700"
            }`}
        >
          {feedback.type === "success" ? (
            <Check size={18} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
          )}

          {feedback.message}
        </div>
      )}

      {/* Profile Header */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-row items-center gap-3 sm:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F] sm:h-20 sm:w-20">
            <User size={28} className="sm:hidden" />
            <User size={36} className="hidden sm:block" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-gray-900 sm:text-2xl">
              {profile.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">Parent</p>
          </div>

          <div className="ml-auto shrink-0">

            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  handleCancelEdit();
                } else {
                  setFeedback(null);
                  setIsEditing(true);
                }
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#01796f] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#015f58] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {isEditing ? <User size={14} /> : <Pencil size={14} />}
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
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
              label="Occupation"
              value={form.occupation}
              onChange={(value) =>
                setForm((current) => ({ ...current, occupation: value }))
              }
            />

            <div className="sm:col-span-2">
              <FormInput
                label="Address"
                value={form.address}
                onChange={(value) =>
                  setForm((current) => ({ ...current, address: value }))
                }
              />
            </div>

            <div className="flex justify-end sm:col-span-2">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58] sm:w-auto"
              >
                <Check size={17} />
                Save Changes
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
              icon={Briefcase}
              label="Occupation"
              value={profile.occupation}
            />

            <ProfileItem
              icon={MapPin}
              label="Address"
              value={profile.address}
            />

            <ProfileItem
              icon={User}
              label="Status"
              value={profile.status}
            />
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58] sm:w-auto"
          >
            <Lock size={17} />
            Update Password
          </button>
        </div>
      </div>
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
        className="w-full rounded-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
      />
    </div>
  );
}

type ProfileItemProps = {
  icon: typeof User;
  label: string;
  value: string;
};

function ProfileItem({
  icon: Icon,
  label,
  value,
}: ProfileItemProps) {
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
          className="w-full rounded-full border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
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
