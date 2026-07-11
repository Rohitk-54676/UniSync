export type AnnouncementCategory =
  | "academic"
  | "exam"
  | "event"
  | "placement"
  | "general"
  | "urgent";

export type AnnouncementPriority =
  | "normal"
  | "important"
  | "urgent";

export type AnnouncementSortOption =
  | "latest"
  | "oldest"
  | "priority";

export interface AnnouncementRecord {
  id: string;
  title: string;
  description: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  author: string;
  publishedAt: string;
  expiresAt?: string;
}

export interface AnnouncementUserState {
  readAnnouncementIds: string[];
  bookmarkedAnnouncementIds: string[];
}

export interface AnnouncementSummary {
  totalAnnouncements: number;
  unreadAnnouncements: number;
  bookmarkedAnnouncements: number;
  urgentAnnouncements: number;
}