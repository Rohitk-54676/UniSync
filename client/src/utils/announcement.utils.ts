import type {
  AnnouncementPriority,
  AnnouncementRecord,
  AnnouncementSortOption,
  AnnouncementSummary,
} from "../types/announcements.types";

export function formatAnnouncementDate(
  date: string
) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsedDate);
}

export function getAnnouncementPreview(
  description: string,
  maximumLength = 170
) {
  const normalizedDescription = description
    .replace(/\s+/g, " ")
    .trim();

  if (
    normalizedDescription.length <= maximumLength
  ) {
    return normalizedDescription;
  }

  return `${normalizedDescription.slice(
    0,
    maximumLength
  )}...`;
}

export function getAnnouncementSummary(
  announcements: AnnouncementRecord[],
  readAnnouncementIds: string[],
  bookmarkedAnnouncementIds: string[]
): AnnouncementSummary {
  return {
    totalAnnouncements: announcements.length,

    unreadAnnouncements: announcements.filter(
      (announcement) =>
        !readAnnouncementIds.includes(
          announcement.id
        )
    ).length,

    bookmarkedAnnouncements:
      announcements.filter((announcement) =>
        bookmarkedAnnouncementIds.includes(
          announcement.id
        )
      ).length,

    urgentAnnouncements: announcements.filter(
      (announcement) =>
        announcement.priority === "urgent"
    ).length,
  };
}

function getPriorityWeight(
  priority: AnnouncementPriority
) {
  const priorityWeight: Record<
    AnnouncementPriority,
    number
  > = {
    normal: 1,
    important: 2,
    urgent: 3,
  };

  return priorityWeight[priority];
}

export function sortAnnouncements(
  announcements: AnnouncementRecord[],
  sortOption: AnnouncementSortOption
) {
  return [...announcements].sort(
    (firstAnnouncement, secondAnnouncement) => {
      switch (sortOption) {
        case "oldest":
          return (
            new Date(
              firstAnnouncement.publishedAt
            ).getTime() -
            new Date(
              secondAnnouncement.publishedAt
            ).getTime()
          );

        case "priority":
          return (
            getPriorityWeight(
              secondAnnouncement.priority
            ) -
              getPriorityWeight(
                firstAnnouncement.priority
              ) ||
            new Date(
              secondAnnouncement.publishedAt
            ).getTime() -
              new Date(
                firstAnnouncement.publishedAt
              ).getTime()
          );

        case "latest":
        default:
          return (
            new Date(
              secondAnnouncement.publishedAt
            ).getTime() -
            new Date(
              firstAnnouncement.publishedAt
            ).getTime()
          );
      }
    }
  );
}