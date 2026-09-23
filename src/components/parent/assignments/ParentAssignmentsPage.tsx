"use client";

import { useMemo, useState } from "react";

import { parentAssignments } from "@/data/parentAssignments";
import { getCurrentParentChildren } from "@/lib/parent";
import ParentAssignmentTable from "./ParentAssignmentTable";

export default function ParentAssignmentsPage() {
  const children = getCurrentParentChildren();

  const [selectedChild, setSelectedChild] = useState(
    children[0]?.id ?? 0
  );

  const selectedChildData = children.find(
    (child) => child.id === selectedChild
  );

  const childAssignments = useMemo(() => {
    return parentAssignments.filter(
      (assignment) => assignment.childId === selectedChild
    );
  }, [selectedChild]);

  if (!children.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">
          No children are associated with this parent account.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Assignments
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your children's assignments and submission status.
        </p>
      </div>

      {/* Children */}
      <div className="flex flex-wrap gap-3">
        {children.map((child) => (
          <button
            key={child.id}
            type="button"
            onClick={() => setSelectedChild(child.id)}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
              selectedChild === child.id
                ? "border-[#01796F] bg-[#01796F] text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-[#01796F] hover:text-[#01796F]"
            }`}
          >
            {child.name}
          </button>
        ))}
      </div>

      {/* Selected Child */}
      {selectedChildData && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedChildData.name}
          </h2>

          <p className="text-sm text-gray-500">
            {selectedChildData.className}
          </p>
        </div>
      )}

      {/* Assignments */}
      <ParentAssignmentTable assignments={childAssignments} />
    </div>
  );
}
