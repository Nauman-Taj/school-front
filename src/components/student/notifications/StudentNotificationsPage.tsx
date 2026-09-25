"use client";

import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";

import { notifications as initialNotifications } from "@/data/notifications";
import { students } from "@/data/students";

import StudentNotificationTable from "./StudentNotificationTable";

export default function StudentNotificationsPage() {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  const studentNotifications = currentStudent
    ? initialNotifications.filter(
        (notification) =>
          notification.role === "Student" &&
          notification.userId === String(currentStudent.id)
      )
    : [];

  const [notifications, setNotifications] = useState(
    studentNotifications
  );

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleMarkAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <main className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Stay updated with your latest school notifications.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#01796f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
          >
            <CheckCheck size={17} />
            Mark All as Read
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Notifications
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {notifications.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <Bell size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Unread
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {unreadCount}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Read
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {notifications.length - unreadCount}
            </p>
          </div>
        </div>
      </div>

      <StudentNotificationTable
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </main>
  );
}