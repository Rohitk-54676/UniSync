export type NoteSortOption =
  | "updated"
  | "newest"
  | "oldest"
  | "title";

export interface NoteRecord {
  id: string;
  title: string;
  subject: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormData {
  title: string;
  subject: string;
  content: string;
  tags: string[];
}

export interface NoteSummary {
  totalNotes: number;
  totalSubjects: number;
  pinnedNotes: number;
  totalTags: number;
}