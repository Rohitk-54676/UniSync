import type {
  AssignmentRecord,
  AssignmentSummary,
} from "../types/assignment.types";

export function getAssignmentDueDate(
  assignment: Pick<
    AssignmentRecord,
    "dueDate" | "dueTime"
  >
) {
  if (!assignment.dueDate) {
    return null;
  }

  const time = assignment.dueTime || "23:59";

  const dueDate = new Date(
    `${assignment.dueDate}T${time}`
  );

  if (Number.isNaN(dueDate.getTime())) {
    return null;
  }

  return dueDate;
}

export function isAssignmentOverdue(
  assignment: AssignmentRecord
) {
  if (assignment.status === "completed") {
    return false;
  }

  const dueDate = getAssignmentDueDate(assignment);

  if (!dueDate) {
    return false;
  }

  return dueDate.getTime() < Date.now();
}

export function getAssignmentSummary(
  assignments: AssignmentRecord[]
): AssignmentSummary {
  return {
    total: assignments.length,

    pending: assignments.filter(
      (assignment) =>
        assignment.status === "pending"
    ).length,

    inProgress: assignments.filter(
      (assignment) =>
        assignment.status === "in-progress"
    ).length,

    completed: assignments.filter(
      (assignment) =>
        assignment.status === "completed"
    ).length,

    overdue: assignments.filter(
      isAssignmentOverdue
    ).length,
  };
}

export function sortAssignmentsByDueDate(
  assignments: AssignmentRecord[]
) {
  return [...assignments].sort(
    (firstAssignment, secondAssignment) => {
      if (
        firstAssignment.status === "completed" &&
        secondAssignment.status !== "completed"
      ) {
        return 1;
      }

      if (
        firstAssignment.status !== "completed" &&
        secondAssignment.status === "completed"
      ) {
        return -1;
      }

      const firstDate = getAssignmentDueDate(
        firstAssignment
      );

      const secondDate = getAssignmentDueDate(
        secondAssignment
      );

      if (!firstDate && !secondDate) {
        return 0;
      }

      if (!firstDate) {
        return 1;
      }

      if (!secondDate) {
        return -1;
      }

      return firstDate.getTime() - secondDate.getTime();
    }
  );
}

export function formatAssignmentDueDate(
  assignment: Pick<
    AssignmentRecord,
    "dueDate" | "dueTime"
  >
) {
  const dueDate = getAssignmentDueDate(assignment);

  if (!dueDate) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: assignment.dueTime
      ? "numeric"
      : undefined,
    minute: assignment.dueTime
      ? "2-digit"
      : undefined,
  }).format(dueDate);
}

export function getAssignmentDueText(
  assignment: AssignmentRecord
) {
  if (assignment.status === "completed") {
    return "Completed";
  }

  const dueDate = getAssignmentDueDate(assignment);

  if (!dueDate) {
    return "No deadline";
  }

  const difference =
    dueDate.getTime() - Date.now();

  const absoluteDifference = Math.abs(difference);

  const minutes = Math.floor(
    absoluteDifference / (1000 * 60)
  );

  const hours = Math.floor(
    absoluteDifference / (1000 * 60 * 60)
  );

  const days = Math.floor(
    absoluteDifference / (1000 * 60 * 60 * 24)
  );

  if (difference < 0) {
    if (days > 0) {
      return `${days} ${
        days === 1 ? "day" : "days"
      } overdue`;
    }

    if (hours > 0) {
      return `${hours} ${
        hours === 1 ? "hour" : "hours"
      } overdue`;
    }

    return `${Math.max(1, minutes)} min overdue`;
  }

  if (days > 0) {
    return `${days} ${
      days === 1 ? "day" : "days"
    } left`;
  }

  if (hours > 0) {
    return `${hours} ${
      hours === 1 ? "hour" : "hours"
    } left`;
  }

  return `${Math.max(1, minutes)} min left`;
}