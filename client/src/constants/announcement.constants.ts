import type {
  AnnouncementCategory,
  AnnouncementRecord,
} from "../types/announcements.types";

export const ANNOUNCEMENT_CATEGORIES: {
  label: string;
  value: AnnouncementCategory;
}[] = [
  {
    label: "Academic",
    value: "academic",
  },
  {
    label: "Exams",
    value: "exam",
  },
  {
    label: "Events",
    value: "event",
  },
  {
    label: "Placements",
    value: "placement",
  },
  {
    label: "General",
    value: "general",
  },
  {
    label: "Urgent",
    value: "urgent",
  },
];

export const MOCK_ANNOUNCEMENTS: AnnouncementRecord[] = [
  {
    id: "announcement-1",
    title: "Mid Semester Examination Schedule Released",
    description:
      "The examination department has released the Mid Semester Examination schedule. Students are advised to verify their examination dates, reporting time and room details. Any discrepancy must be reported to the examination department before the deadline.",
    category: "exam",
    priority: "important",
    author: "Examination Department",
    publishedAt: "2026-07-08T09:30:00.000Z",
  },
  {
    id: "announcement-2",
    title: "Campus Placement Drive Registration Open",
    description:
      "Registration for the upcoming campus placement drive is now open. Eligible students should complete their registration and update their resume before the registration deadline. Shortlisted students will receive further instructions.",
    category: "placement",
    priority: "important",
    author: "Placement Cell",
    publishedAt: "2026-07-07T06:15:00.000Z",
  },
  {
    id: "announcement-3",
    title: "University Hackathon 2026",
    description:
      "Students are invited to participate in University Hackathon 2026. Teams can build solutions in artificial intelligence, sustainability, education and campus technology. Team registration is now available.",
    category: "event",
    priority: "normal",
    author: "Student Innovation Cell",
    publishedAt: "2026-07-06T11:00:00.000Z",
  },
  {
    id: "announcement-4",
    title: "Library Timing Extended During Examination Week",
    description:
      "The central library will remain open for extended hours during examination week. Students must carry their university identification card while accessing the library.",
    category: "academic",
    priority: "normal",
    author: "Central Library",
    publishedAt: "2026-07-05T08:00:00.000Z",
  },
  {
    id: "announcement-5",
    title: "Important: Student Portal Maintenance",
    description:
      "The university student portal will be temporarily unavailable due to scheduled maintenance. Students should complete urgent academic submissions before the maintenance window begins.",
    category: "urgent",
    priority: "urgent",
    author: "IT Services",
    publishedAt: "2026-07-09T14:30:00.000Z",
  },
  {
    id: "announcement-6",
    title: "Semester Registration Guidelines",
    description:
      "Students must review the semester registration guidelines before selecting courses. Please verify prerequisite requirements and contact your academic mentor if clarification is required.",
    category: "academic",
    priority: "normal",
    author: "Academic Department",
    publishedAt: "2026-07-04T10:20:00.000Z",
  },
  {
    id: "announcement-7",
    title: "Cultural Fest Volunteer Applications",
    description:
      "Volunteer applications for the upcoming university cultural fest are now open. Students interested in event management, hospitality, technical support and media teams may apply.",
    category: "event",
    priority: "normal",
    author: "Division of Student Welfare",
    publishedAt: "2026-07-03T07:45:00.000Z",
  },
];