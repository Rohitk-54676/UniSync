import { useEffect, useMemo, useState } from "react";

import type {
  AssignmentFormData,
  AssignmentRecord,
} from "../types/assignment.types";

import {
  getAssignmentSummary,
  sortAssignmentsByDueDate,
} from "../utils/assignment.utils";

const STORAGE_KEY = "unisync-student-assignments";

function getStoredAssignments(): AssignmentRecord[] {
  try {
    const storedAssignments =
      localStorage.getItem(STORAGE_KEY);

    if (!storedAssignments) {
      return [];
    }

    const parsedAssignments = JSON.parse(
      storedAssignments
    );

    if (!Array.isArray(parsedAssignments)) {
      return [];
    }

    return parsedAssignments;
  } catch {
    return [];
  }
}

function useAssignments() {
  const [assignments, setAssignments] = useState<
    AssignmentRecord[]
  >(getStoredAssignments);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(assignments)
    );
  }, [assignments]);

  const summary = useMemo(
    () => getAssignmentSummary(assignments),
    [assignments]
  );

  const sortedAssignments = useMemo(
    () => sortAssignmentsByDueDate(assignments),
    [assignments]
  );

  function addAssignment(
    formData: AssignmentFormData
  ) {
    const currentTime = new Date().toISOString();

    const newAssignment: AssignmentRecord = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: currentTime,
      updatedAt: currentTime,
      completedAt:
        formData.status === "completed"
          ? currentTime
          : null,
    };

    setAssignments((currentAssignments) => [
      ...currentAssignments,
      newAssignment,
    ]);
  }

  function updateAssignment(
    id: string,
    formData: AssignmentFormData
  ) {
    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment) => {
        if (assignment.id !== id) {
          return assignment;
        }

        return {
          ...assignment,
          ...formData,
          updatedAt: new Date().toISOString(),
          completedAt:
            formData.status === "completed"
              ? assignment.completedAt ??
                new Date().toISOString()
              : null,
        };
      })
    );
  }

  function deleteAssignment(id: string) {
    setAssignments((currentAssignments) =>
      currentAssignments.filter(
        (assignment) => assignment.id !== id
      )
    );
  }

  function toggleAssignmentComplete(id: string) {
    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment) => {
        if (assignment.id !== id) {
          return assignment;
        }

        const isCompleted =
          assignment.status === "completed";

        return {
          ...assignment,
          status: isCompleted
            ? "pending"
            : "completed",
          completedAt: isCompleted
            ? null
            : new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }

  function changeAssignmentStatus(
    id: string,
    status: AssignmentRecord["status"]
  ) {
    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              status,
              completedAt:
                status === "completed"
                  ? assignment.completedAt ??
                    new Date().toISOString()
                  : null,
              updatedAt: new Date().toISOString(),
            }
          : assignment
      )
    );
  }

  return {
    assignments,
    sortedAssignments,
    summary,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    toggleAssignmentComplete,
    changeAssignmentStatus,
  };
}

export default useAssignments;