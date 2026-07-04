export interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export interface Semester {
  id: string;
  name: string;
  sgpa: number;
  credits: number;
}

export type CalculatorMode = "semester" | "overall";