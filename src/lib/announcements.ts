import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Announcement, AnnouncementAudience, AnnouncementStatus } from "@/types/announcement";

export type ApiAnnouncement = Omit<Announcement, "audience" | "status"> & {
  audience: string;
  status: string;
};

const audiences: Record<string, AnnouncementAudience> = {
  ALL: "All",
  All: "All",
  STUDENTS: "Students",
  Students: "Students",
  TEACHERS: "Teachers",
  Teachers: "Teachers",
  PARENTS: "Parents",
  Parents: "Parents",
  STAFF: "Staff",
  Staff: "Staff",
};

export function mapAnnouncement(item: ApiAnnouncement): Announcement {
  return {
    ...item,
    date: item.date.slice(0, 10),
    audience: audiences[item.audience] ?? "All",
    status:
      item.status === "PUBLISHED" || item.status === "Published"
        ? "Published"
        : "Draft",
  };
}

export function toApiAnnouncementAudience(audience: AnnouncementAudience) {
  return audience.toUpperCase();
}

export function toApiAnnouncementStatus(status: AnnouncementStatus) {
  return status.toUpperCase();
}

export async function fetchAnnouncements() {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const data = await apiRequest<ApiAnnouncement[]>("/announcements", { token });
  return data.map(mapAnnouncement);
}
