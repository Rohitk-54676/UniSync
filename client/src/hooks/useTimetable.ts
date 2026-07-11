import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  TimetableClassFormData,
  TimetableClassRecord,
} from "../types/timetable.types";

import {
  getTimetableSummary,
  sortTimetableClasses,
} from "../utils/timetable.util";

const STORAGE_KEY =
  "unisync-student-timetable";

function getStoredTimetable():
  TimetableClassRecord[] {
  try {
    const storedTimetable =
      localStorage.getItem(STORAGE_KEY);

    if (!storedTimetable) {
      return [];
    }

    const parsedTimetable = JSON.parse(
      storedTimetable
    );

    if (!Array.isArray(parsedTimetable)) {
      return [];
    }

    return parsedTimetable;
  } catch {
    return [];
  }
}

function useTimetable() {
  const [classes, setClasses] = useState<
    TimetableClassRecord[]
  >(getStoredTimetable);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(classes)
    );
  }, [classes]);

  const summary = useMemo(
    () => getTimetableSummary(classes),
    [classes]
  );

  const sortedClasses = useMemo(
    () => sortTimetableClasses(classes),
    [classes]
  );

  function addClass(
    formData: TimetableClassFormData
  ) {
    const currentTime =
      new Date().toISOString();

    const newClass: TimetableClassRecord = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    setClasses((currentClasses) => [
      ...currentClasses,
      newClass,
    ]);
  }

  function updateClass(
    id: string,
    formData: TimetableClassFormData
  ) {
    setClasses((currentClasses) =>
      currentClasses.map(
        (timetableClass) =>
          timetableClass.id === id
            ? {
                ...timetableClass,
                ...formData,
                updatedAt:
                  new Date().toISOString(),
              }
            : timetableClass
      )
    );
  }

  function deleteClass(id: string) {
    setClasses((currentClasses) =>
      currentClasses.filter(
        (timetableClass) =>
          timetableClass.id !== id
      )
    );
  }

  return {
    classes,
    sortedClasses,
    summary,
    addClass,
    updateClass,
    deleteClass,
  };
}

export default useTimetable;