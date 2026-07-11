import { useEffect, useMemo, useState } from "react";

import type {
  AttendanceSubjectFormData,
  AttendanceSubjectRecord,
} from "../types/studentAttendence.types";

import {
  calculateOverallAttendance,
} from "../utils/attendance.utils";

const STORAGE_KEY = "unisync-student-attendance";

function getStoredSubjects(): AttendanceSubjectRecord[] {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return [];
    }

    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData;
  } catch {
    return [];
  }
}

function useStudentAttendance() {
  const [subjects, setSubjects] = useState<
    AttendanceSubjectRecord[]
  >(getStoredSubjects);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(subjects)
    );
  }, [subjects]);

  const overallAttendance = useMemo(
    () => calculateOverallAttendance(subjects),
    [subjects]
  );

  function addSubject(
    formData: AttendanceSubjectFormData
  ) {
    const currentTime = new Date().toISOString();

    const newSubject: AttendanceSubjectRecord = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    setSubjects((currentSubjects) => [
      ...currentSubjects,
      newSubject,
    ]);
  }

  function updateSubject(
    id: string,
    formData: AttendanceSubjectFormData
  ) {
    setSubjects((currentSubjects) =>
      currentSubjects.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              ...formData,
              updatedAt: new Date().toISOString(),
            }
          : subject
      )
    );
  }

  function deleteSubject(id: string) {
    setSubjects((currentSubjects) =>
      currentSubjects.filter(
        (subject) => subject.id !== id
      )
    );
  }

  function markPresent(id: string) {
    setSubjects((currentSubjects) =>
      currentSubjects.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              attendedClasses:
                subject.attendedClasses + 1,
              totalClasses:
                subject.totalClasses + 1,
              updatedAt: new Date().toISOString(),
            }
          : subject
      )
    );
  }

  function markAbsent(id: string) {
    setSubjects((currentSubjects) =>
      currentSubjects.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              totalClasses:
                subject.totalClasses + 1,
              updatedAt: new Date().toISOString(),
            }
          : subject
      )
    );
  }

  return {
    subjects,
    overallAttendance,
    addSubject,
    updateSubject,
    deleteSubject,
    markPresent,
    markAbsent,
  };
}

export default useStudentAttendance;