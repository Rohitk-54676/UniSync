export type AssignmentPriority =
  | "low"
  | "medium"
  | "high";

export type AssignmentStatus =
  | "pending"
  | "in-progress"
  | "completed";

export type AssignmentFilter =
  | "all"
  | "pending"
  | "in-progress"
  | "completed"
  | "overdue";

export interface AssignmentRecord {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: AssignmentPriority;
  status: AssignmentStatus;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface AssignmentFormData {
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: AssignmentPriority;
  status: AssignmentStatus;
}

export interface AssignmentSummary {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}