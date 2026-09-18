import SchoolSettings from "@/components/settings/SchoolSettings";
import UserSettings from "@/components/settings/UserSettings";
import AcademicSettings from "@/components/settings/AcademicSettings";

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage school, user, and academic settings.
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