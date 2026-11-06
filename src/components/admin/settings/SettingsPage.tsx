import SchoolSettings from "@/components/admin/settings/SchoolSettings";
import UserSettings from "@/components/admin/settings/UserSettings";
import AcademicSettings from "@/components/admin/settings/AcademicSettings";

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          School details, the signed-in account, and the current academic records.
        </p>
      </div>

      {/* School Settings */}
      <SchoolSettings />

      {/* User Settings */}
      <UserSettings />

      {/* Academic Settings */}
      <AcademicSettings />
    </div>
  );
}