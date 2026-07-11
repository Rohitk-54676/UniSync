export interface AttendanceSubjectRecord {
  id: string;
  subjectName: string;
  attendedClasses: number;
  totalClasses: number;
  targetPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceSubjectFormData {
  subjectName: string;
  attendedClasses: number;
  totalClasses: number;
  targetPercentage: number;
}

export type AttendanceSubjectStatus =
  | "safe"
  | "warning"
  | "critical";