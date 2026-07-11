import { TIMETABLE_DAYS } from "../constants/timetable.constants";

import type {
  TimetableClassFormData,
  TimetableClassRecord,
  TimetableConflict,
  TimetableDay,
  TimetableSummary,
} from "../types/timetable.types";

export function timeToMinutes(time: string) {
  const [hours, minutes] = time
    .split(":")
    .map(Number);

  return hours * 60 + minutes;
}

export function getCurrentMinutes() {
  const currentDate = new Date();

  return (
    currentDate.getHours() * 60 +
    currentDate.getMinutes()
  );
}

export function getCurrentTimetableDay():
  | TimetableDay
  | null {
  const dayIndex = new Date().getDay();

  const dayMap: Record<
    number,
    TimetableDay | null
  > = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  };

  return dayMap[dayIndex];
}

export function getTimetableDayLabel(
  day: TimetableDay
) {
  return (
    TIMETABLE_DAYS.find(
      (timetableDay) =>
        timetableDay.value === day
    )?.label ?? day
  );
}

export function formatTimetableTime(
  time: string
) {
  if (!time) {
    return "";
  }

  const [hours, minutes] = time
    .split(":")
    .map(Number);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function getClassDurationMinutes(
  timetableClass: Pick<
    TimetableClassRecord,
    "startTime" | "endTime"
  >
) {
  return Math.max(
    0,
    timeToMinutes(timetableClass.endTime) -
      timeToMinutes(timetableClass.startTime)
  );
}

export function getClassDurationText(
  timetableClass: Pick<
    TimetableClassRecord,
    "startTime" | "endTime"
  >
) {
  const duration =
    getClassDurationMinutes(timetableClass);

  const hours = Math.floor(duration / 60);

  const minutes = duration % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours} ${
      hours === 1 ? "hour" : "hours"
    }`;
  }

  return `${hours}h ${minutes}m`;
}

export function sortTimetableClasses(
  classes: TimetableClassRecord[]
) {
  return [...classes].sort(
    (firstClass, secondClass) =>
      timeToMinutes(firstClass.startTime) -
      timeToMinutes(secondClass.startTime)
  );
}

export function getClassesForDay(
  classes: TimetableClassRecord[],
  day: TimetableDay
) {
  return sortTimetableClasses(
    classes.filter(
      (timetableClass) =>
        timetableClass.day === day
    )
  );
}

export function checkTimetableConflict(
  classes: TimetableClassRecord[],
  formData: TimetableClassFormData,
  ignoredClassId?: string
): TimetableConflict {
  const newStart = timeToMinutes(
    formData.startTime
  );

  const newEnd = timeToMinutes(
    formData.endTime
  );

  const conflictingClass =
    classes.find((timetableClass) => {
      if (
        ignoredClassId &&
        timetableClass.id === ignoredClassId
      ) {
        return false;
      }

      if (
        timetableClass.day !== formData.day
      ) {
        return false;
      }

      const existingStart = timeToMinutes(
        timetableClass.startTime
      );

      const existingEnd = timeToMinutes(
        timetableClass.endTime
      );

      return (
        newStart < existingEnd &&
        newEnd > existingStart
      );
    }) ?? null;

  return {
    hasConflict: Boolean(conflictingClass),
    conflictingClass,
  };
}

export function getTimetableSummary(
  classes: TimetableClassRecord[]
): TimetableSummary {
  const uniqueSubjects = new Set(
    classes.map((timetableClass) =>
      timetableClass.subject
        .trim()
        .toLowerCase()
    )
  );

  const uniqueDays = new Set(
    classes.map(
      (timetableClass) =>
        timetableClass.day
    )
  );

  const totalMinutes = classes.reduce(
    (total, timetableClass) =>
      total +
      getClassDurationMinutes(timetableClass),
    0
  );

  return {
    totalClasses: classes.length,
    totalSubjects: uniqueSubjects.size,
    activeDays: uniqueDays.size,
    weeklyHours:
      Math.round((totalMinutes / 60) * 10) /
      10,
  };
}

export function getCurrentClass(
  classes: TimetableClassRecord[]
) {
  const currentDay =
    getCurrentTimetableDay();

  if (!currentDay) {
    return null;
  }

  const currentMinutes =
    getCurrentMinutes();

  return (
    getClassesForDay(
      classes,
      currentDay
    ).find((timetableClass) => {
      const start = timeToMinutes(
        timetableClass.startTime
      );

      const end = timeToMinutes(
        timetableClass.endTime
      );

      return (
        currentMinutes >= start &&
        currentMinutes < end
      );
    }) ?? null
  );
}

export function getNextClassToday(
  classes: TimetableClassRecord[]
) {
  const currentDay =
    getCurrentTimetableDay();

  if (!currentDay) {
    return null;
  }

  const currentMinutes =
    getCurrentMinutes();

  return (
    getClassesForDay(
      classes,
      currentDay
    ).find(
      (timetableClass) =>
        timeToMinutes(
          timetableClass.startTime
        ) > currentMinutes
    ) ?? null
  );
}