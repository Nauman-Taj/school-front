"use client";

import { useCallback, useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { NotificationType } from "@/types/notification";
import type { UserRole } from "@/types/user";

export type HeaderNotification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  date: string;
  time: string;
  href: string;
  read: boolean;
  sortAt: number;
};

type ApiAnnouncement = {
  id: number;
  title: string;
  description: string;
  audience: string;
  date: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

type ApiCalendarEvent = { id: number; title: string; date: string; type: string; description: string };
type ApiExam = { id: string; name: string; examDate: string; status: string };
type FeeSummary = { overdue: number };

const MAX_NOTIFICATIONS = 20;
const DAY_MS = 24 * 60 * 60 * 1000;

export function useHeaderNotifications(role?: UserRole, userId?: number) {
  const [notifications, setNotifications] = useState<HeaderNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(async () => {
    if (!role || userId === undefined) return;
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();
      if (!token) throw new Error("Your session has expired. Please log in again.");

      const admin = role === "Admin";
      const results = await Promise.allSettled([
        apiRequest<ApiAnnouncement[]>("/announcements", { token }),
        ...(admin
          ? [
              apiRequest<ApiCalendarEvent[]>("/calendar-events", { token }),
              apiRequest<ApiExam[]>("/exams", { token }),
              apiRequest<FeeSummary>("/fees/summary", { token }),
            ]
          : []),
      ]);

      const failures = results.filter((result) => result.status === "rejected").length;
      const generated: Omit<HeaderNotification, "read">[] = [];
      const announcementResult = results[0];
      if (announcementResult.status === "fulfilled") {
        for (const item of announcementResult.value) {
          const status = item.status.toUpperCase();
          const activityAt = item.updatedAt ?? item.createdAt ?? item.date;
          const activityMs = new Date(activityAt).getTime();
          const daysUntilScheduled = daysFromToday(item.date);
          const isRecent = Number.isFinite(activityMs) && Date.now() - activityMs <= 30 * DAY_MS;
          const isUpcoming = daysUntilScheduled >= 0 && daysUntilScheduled <= 30;
          if (!isRecent && !isUpcoming) continue;

          const isDraft = status === "DRAFT";
          const relevantStatus = admin || status === "PUBLISHED";
          if (!relevantStatus) continue;
          generated.push({
            id: `announcement-${item.id}`,
            title: isDraft ? "Announcement draft" : "New announcement",
            message: `${item.title} · ${item.audience}${item.description ? ` — ${item.description}` : ""}`,
            type: isDraft ? "Warning" : "Info",
            date: formatShortDate(activityAt),
            time: formatShortTime(activityAt),
            href: isDraft && admin ? `/admin/announcements/${item.id}/edit` : announcementRoute(role),
            sortAt: Number.isFinite(activityMs) ? activityMs : Date.parse(`${item.date.slice(0, 10)}T00:00:00Z`),
          });
        }
      }

      if (admin) {
        const calendarResult = results[1] as PromiseSettledResult<ApiCalendarEvent[]>;
        if (calendarResult.status === "fulfilled") {
          for (const item of calendarResult.value) {
            const daysUntil = daysFromToday(item.date);
            if (daysUntil < 0 || daysUntil > 30) continue;
            generated.push({
              id: `calendar-${item.id}`,
              title: daysUntil === 0 ? "Calendar event today" : "Upcoming calendar event",
              message: `${item.title}${item.type ? ` · ${item.type}` : ""}`,
              type: "Info",
              date: formatShortDate(item.date),
              time: daysUntil === 0 ? "Today" : `${daysUntil} days away`,
              href: "/admin/calendar",
              sortAt: -daysUntil,
            });
          }
        }

        const examResult = results[2] as PromiseSettledResult<ApiExam[]>;
        if (examResult.status === "fulfilled") {
          for (const item of examResult.value) {
            const daysUntil = daysFromToday(item.examDate);
            if (item.status.toUpperCase() === "COMPLETED" || daysUntil < 0 || daysUntil > 30) continue;
            generated.push({
              id: `exam-${item.id}`,
              title: daysUntil === 0 ? "Exam scheduled today" : "Upcoming exam",
              message: item.name,
              type: "Warning",
              date: formatShortDate(item.examDate),
              time: daysUntil === 0 ? "Today" : `${daysUntil} days away`,
              href: "/admin/exams",
              sortAt: -daysUntil,
            });
          }
        }

        const feeResult = results[3] as PromiseSettledResult<FeeSummary>;
        if (feeResult.status === "fulfilled" && Number(feeResult.value.overdue) > 0) {
          const amount = Number(feeResult.value.overdue).toLocaleString("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 });
          generated.push({
            id: `overdue-fees-${Number(feeResult.value.overdue).toFixed(2)}`,
            title: "Overdue fees",
            message: `${amount} in fee balances are overdue.`,
            type: "Alert",
            date: formatShortDate(schoolDate()),
            time: "Action needed",
            href: "/admin/fees",
            sortAt: Date.now(),
          });
        }
      }

      generated.sort((a, b) => b.sortAt - a.sortAt);
      const readIds = readNotificationIds(role, userId);
      setNotifications(generated.slice(0, MAX_NOTIFICATIONS).map((item) => ({ ...item, read: readIds.has(item.id) })));
      if (failures > 0) setError("Some notification sources could not be loaded. Try again to refresh.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load notifications.");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, [role, userId]);

  useEffect(() => {
    void loadNotifications();
    const intervalId = window.setInterval(() => void loadNotifications(), 5 * 60 * 1000);
    const handleFocus = () => void loadNotifications();
    window.addEventListener("focus", handleFocus);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
    };
  }, [loadNotifications]);

  const persistReadIds = useCallback((ids: Set<string>) => {
    if (!role || userId === undefined) return;
    try {
      localStorage.setItem(storageKey(role, userId), JSON.stringify([...ids]));
    } catch {
      setError("Read status could not be saved in this browser.");
    }
  }, [role, userId]);

  const markAsRead = useCallback((id: string) => {
    const ids = readNotificationIds(role, userId);
    ids.add(id);
    persistReadIds(ids);
    setNotifications((current) => current.map((item) => item.id === id ? { ...item, read: true } : item));
  }, [persistReadIds, role, userId]);

  const markAllAsRead = useCallback(() => {
    const ids = readNotificationIds(role, userId);
    notifications.forEach((item) => ids.add(item.id));
    persistReadIds(ids);
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }, [notifications, persistReadIds, role, userId]);

  return {
    notifications,
    unreadCount: notifications.filter((item) => !item.read).length,
    loading,
    error,
    refresh: loadNotifications,
    markAsRead,
    markAllAsRead,
  };
}

function announcementRoute(role: UserRole) {
  return role === "Admin" ? "/admin/announcements" : `/${role.toLowerCase()}/announcements`;
}

function storageKey(role?: UserRole, userId?: number) {
  return `garrison-notification-read:${role ?? "unknown"}:${userId ?? "unknown"}`;
}

function readNotificationIds(role?: UserRole, userId?: number) {
  try {
    const value = localStorage.getItem(storageKey(role, userId));
    const ids = value ? JSON.parse(value) : [];
    return new Set<string>(Array.isArray(ids) ? ids.filter((id): id is string => typeof id === "string") : []);
  } catch {
    return new Set<string>();
  }
}

function daysFromToday(value: string) {
  const date = value.slice(0, 10);
  const target = Date.parse(`${date}T00:00:00Z`);
  const today = Date.parse(`${schoolDate()}T00:00:00Z`);
  return Number.isFinite(target) ? Math.floor((target - today) / DAY_MS) : Number.POSITIVE_INFINITY;
}

function schoolDate() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Karachi", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function formatShortDate(value: string) {
  const date = value.slice(0, 10);
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? "—" : new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", timeZone: "Asia/Karachi" }).format(parsed);
}

function formatShortTime(value: string) {
  if (!value || value.length <= 10) return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : new Intl.DateTimeFormat("en-PK", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" }).format(parsed);
}
