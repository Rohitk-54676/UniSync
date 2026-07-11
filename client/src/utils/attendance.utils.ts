import type {
  AttendanceSubjectRecord,
  AttendanceSubjectStatus,
} from "../types/studentAttendence.types";

export function calculateAttendancePercentage(
  attendedClasses: number,
  totalClasses: number
) {
  if (totalClasses <= 0) {
    return 0;
  }

  return (attendedClasses / totalClasses) * 100;
}

export function getAttendanceSubjectStatus(
  percentage: number,
  targetPercentage: number
): AttendanceSubjectStatus {
  if (percentage >= targetPercentage) {
    return "safe";
  }

  if (percentage >= targetPercentage - 10) {
    return "warning";
  }

  return "critical";
}

export function calculateClassesNeeded(
  attendedClasses: number,
  totalClasses: number,
  targetPercentage: number
) {
  const currentPercentage =
    calculateAttendancePercentage(
      attendedClasses,
      totalClasses
    );

  if (
    currentPercentage >= targetPercentage ||
    targetPercentage >= 100
  ) {
    return 0;
  }

  const classesNeeded = Math.ceil(
    (
      targetPercentage * totalClasses -
      100 * attendedClasses
    ) /
      (100 - targetPercentage)
  );

  return Math.max(0, classesNeeded);
}

export function calculateClassesCanSkip(
  attendedClasses: number,
  totalClasses: number,
  targetPercentage: number
) {
  const currentPercentage =
    calculateAttendancePercentage(
      attendedClasses,
      totalClasses
    );

  if (
    currentPercentage < targetPercentage ||
    targetPercentage <= 0
  ) {
    return 0;
  }

  const classesCanSkip = Math.floor(
    (100 * attendedClasses) / targetPercentage -
      totalClasses
  );

  return Math.max(0, classesCanSkip);
}

export function calculateOverallAttendance(
  subjects: AttendanceSubjectRecord[]
) {
  const totalAttended = subjects.reduce(
    (total, subject) =>
      total + subject.attendedClasses,
    0
  );

  const totalClasses = subjects.reduce(
    (total, subject) =>
      total + subject.totalClasses,
    0
  );

  return {
    totalAttended,
    totalClasses,
    percentage: calculateAttendancePercentage(
      totalAttended,
      totalClasses
    ),
  };
}