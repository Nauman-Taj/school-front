"use client";

import { useEffect, useSyncExternalStore } from "react";

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
const SCHOOL_SETTINGS_CHANGED = "school-settings-changed";
const STORAGE_KEY = "garrison-school-setting";

const blankSchoolSetting: SchoolSetting = {
  schoolName: "",
  logo: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  academicYear: "",
  principalName: "",
};

let currentSetting = blankSchoolSetting;
let loadError = "";
let restored = false;

function restoreCachedSetting() {
  if (restored || typeof window === "undefined") return;
  restored = true;

  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    currentSetting = JSON.parse(saved) as SchoolSetting;
  } catch {
    currentSetting = blankSchoolSetting;
  }
}

function rememberSchoolSetting(setting: SchoolSetting) {
  currentSetting = setting;
  loadError = "";
  restored = true;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(setting));
  } catch {
    // The saved record still stays in memory for this page.
  }

  window.dispatchEvent(new Event(SCHOOL_SETTINGS_CHANGED));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(SCHOOL_SETTINGS_CHANGED, onStoreChange);
  return () => window.removeEventListener(SCHOOL_SETTINGS_CHANGED, onStoreChange);
}

function getSetting() {
  restoreCachedSetting();
  return currentSetting;
}

function getLoadError() {
  return loadError;
}

async function loadSharedSchoolSetting() {
  const token = getAuthToken();
  if (!token) return;

  try {
    const data = await apiRequest<SchoolSetting>("/school-settings", { token });
    rememberSchoolSetting(data);
  } catch (error) {
    if (currentSetting.schoolName || currentSetting.email) return;
    loadError =
      error instanceof Error ? error.message : "Unable to load school settings.";
    window.dispatchEvent(new Event(SCHOOL_SETTINGS_CHANGED));
  }
}

let pendingLoad: Promise<void> | null = null;

function requestSchoolSetting() {
  if (!pendingLoad) {
    pendingLoad = loadSharedSchoolSetting().finally(() => {
      pendingLoad = null;
    });
  }

  return pendingLoad;
}

export function notifySchoolSettingsUpdated() {
  window.dispatchEvent(new Event(SCHOOL_SETTINGS_UPDATED));
}

export function useSchoolSetting() {
  const setting = useSyncExternalStore(
    subscribe,
    getSetting,
    () => blankSchoolSetting,
  );

  useEffect(() => {
    void requestSchoolSetting();
    const refresh = () => {
      void requestSchoolSetting();
    };
    window.addEventListener(SCHOOL_SETTINGS_UPDATED, refresh);
    return () => window.removeEventListener(SCHOOL_SETTINGS_UPDATED, refresh);
  }, []);

  useEffect(() => {
    if (setting.schoolName) {
      document.title = setting.schoolName;
    }
  }, [setting.schoolName]);

  return setting;
}

export function useSchoolSettingError() {
  return useSyncExternalStore(subscribe, getLoadError, () => "");
}
