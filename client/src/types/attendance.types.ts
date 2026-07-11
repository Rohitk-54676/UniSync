export interface AttendanceData {
  attendedClasses: number;
  totalClasses: number;
  targetPercentage: number;
}

export interface AttendanceResult {
  currentPercentage: number;
  classesNeeded: number;
  classesCanSkip: number;
  isTargetReached: boolean;
}

export interface AttendanceSubject {
  id: string;
  name: string;
  attendedClasses: number;
  totalClasses: number;
  targetPercentage: number;
}

export type AttendanceStatus =
  | "safe"
  | "warning"
  | "critical";