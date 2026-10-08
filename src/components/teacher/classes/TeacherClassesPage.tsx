"use client";

import { useMemo, useState } from "react";

import { getSession } from "@/lib/auth";

import TeacherClassStats from "./TeacherClassStats";
import { teachers } from "@/data/teachers";
import { classes } from "@/data/classes";
import { subjects } from "@/data/subjects";
import { students } from "@/data/students";
import { timetable } from "@/data/timetable";

import TeacherClassTable from "./TeacherClassTable";
import TeacherClassCard from "./TeacherClassCard";

export default function TeacherClassesPage() {
  const [search, setSearch] = useState("");

  const session = getSession();

  const currentTeacher =
    teachers.find(
      (teacher) =>
        teacher.email === session?.email ||
        teacher.name === session?.name
    ) ?? teachers[0];

  const currentTeacherId = currentTeacher.id;

  const teacherClasses = useMemo(() => {
    const teacherSubjects = subjects.filter(
      (subject) => subject.teacherId === currentTeacherId
    );

    const teacherClassKeys = Array.from(
      new Set(
        teacherSubjects.map(
          (subject) =>
            `${subject.className}-${subject.section}`
        )
      )
    );

    return teacherClassKeys
      .map((classKey) => {
        const [className, section] = classKey.split("-");

        const schoolClass = classes.find(
          (item) =>
            item.name === className &&
            item.section === section
        );

        if (!schoolClass) {
          return null;
        }

        const classSubjects = teacherSubjects.filter(
          (subject) =>
            subject.className === className &&
            subject.section === section
        );

        const classTimetable = timetable.find(
          (item) =>
            item.teacherId === currentTeacherId &&
            item.className === className &&
            item.section === section
        );

        const studentCount = students.filter(
          (student) =>
            student.className === className &&
            student.section === section
        ).length;

        return {
          id: schoolClass.id,
          className,
          section,
          subject: classSubjects
            .map((subject) => subject.name)
            .join(", "),
          room:
            schoolClass.room ??
            classTimetable?.room ??
            "-",
          schedule: classTimetable
            ? `${classTimetable.day} · ${classTimetable.startTime} - ${classTimetable.endTime}`
            : "-",
          students: studentCount,
          classTeacher:
            schoolClass.teacherId === currentTeacherId,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [currentTeacherId]);

  const filteredClasses = teacherClasses.filter((item) => {
    const value = search.toLowerCase().trim();

    return (
      item.className.toLowerCase().includes(value) ||
      item.section.toLowerCase().includes(value) ||
      item.subject.toLowerCase().includes(value) ||
      item.room.toLowerCase().includes(value)
    );
  });

  return (
    <main className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          My Classes
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View the classes assigned to you and manage your
          students.
        </p>
      </div>

      <TeacherClassStats
        totalClasses={teacherClasses.length}
        totalStudents={teacherClasses.reduce(
          (total, item) => total + item.students,
          0
        )}
        totalSubjects={
          new Set(
            subjects
              .filter(
                (subject) =>
                  subject.teacherId === currentTeacherId
              )
              .map((subject) => subject.id)
          ).size
        }
        classTeacherCount={
          teacherClasses.filter(
            (item) => item.classTeacher
          ).length
        }
      />


      {/* Classes */}
      <TeacherClassTable
        classes={filteredClasses}
        search={search}
        setSearch={setSearch}
      />

      <TeacherClassCard classes={filteredClasses} />
    </main>
  );
}