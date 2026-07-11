export type TimetableDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type TimetableClassType =
  | "lecture"
  | "lab"
  | "tutorial"
  | "seminar"
  | "other";

export interface TimetableClassRecord {
  id: string;
  subject: string;
  subjectCode: string;
  faculty: string;
  room: string;
  day: TimetableDay;
  startTime: string;
  endTime: string;
  classType: TimetableClassType;
  createdAt: string;
  updatedAt: string;
}

export interface TimetableClassFormData {
  subject: string;
  subjectCode: string;
  faculty: string;
  room: string;
  day: TimetableDay;
  startTime: string;
  endTime: string;
  classType: TimetableClassType;
}

export interface TimetableSummary {
  totalClasses: number;
  totalSubjects: number;
  activeDays: number;
  weeklyHours: number;
}

export interface TimetableConflict {
  hasConflict: boolean;
  conflictingClass: TimetableClassRecord | null;
}