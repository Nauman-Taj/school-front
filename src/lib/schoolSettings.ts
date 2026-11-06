"use client";

import { useEffect, useState } from "react";

import { schoolSettings as fallbackSchoolSettings } from "@/data/settings";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

export type SchoolSetting = {
  id?: number;
  schoolName: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  academicYear: string;
  principalName: string;
  permission?: string;
  selectedClass?: string;
  selectedSection?: string;
  selectedSubject?: string;
  gradingSystem?: string;
  term?: string;
};

export const SCHOOL_SETTINGS_UPDATED = "school-settings-updated";

export const fallbackSchoolSetting: SchoolSetting = fallbackSchoolSettings;

export function notifySchoolSettingsUpdated() {
  window.dispatchEvent(new Event(SCHOOL_SETTINGS_UPDATED));
}

export function useSchoolSetting() {
  const [setting, setSetting] = useState<SchoolSetting | null>(null);

  useEffect(() => {
    let active = true;

    const loadSchoolSetting = async () => {
      const token = getAuthToken();
      if (!token) return;

      try {
        const data = await apiRequest<SchoolSetting>("/school-settings", { token });
        if (active) setSetting(data);
      } catch {
        if (active) setSetting(fallbackSchoolSetting);
      }
    };

    void loadSchoolSetting();
    window.addEventListener(SCHOOL_SETTINGS_UPDATED, loadSchoolSetting);
    return () => {
      active = false;
      window.removeEventListener(SCHOOL_SETTINGS_UPDATED, loadSchoolSetting);
    };
  }, []);

  useEffect(() => {
    if (setting?.schoolName) {
      document.title = setting.schoolName;
    }
  }, [setting]);

  // Keep the saved name off the screen until the request finishes.
  // The hardcoded fallback is only used when the request fails.
  if (!setting) {
    return { ...fallbackSchoolSetting, schoolName: "" };
  }

  return setting;
}
