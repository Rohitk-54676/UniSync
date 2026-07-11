import type {
  NoteRecord,
  NoteSortOption,
  NoteSummary,
} from "../types/note.types";

export function getNoteSummary(
  notes: NoteRecord[]
): NoteSummary {
  const subjects = new Set(
    notes
      .map((note) =>
        note.subject.trim().toLowerCase()
      )
      .filter(Boolean)
  );

  const tags = new Set(
    notes.flatMap((note) =>
      note.tags.map((tag) =>
        tag.trim().toLowerCase()
      )
    )
  );

  return {
    totalNotes: notes.length,
    totalSubjects: subjects.size,
    pinnedNotes: notes.filter(
      (note) => note.isPinned
    ).length,
    totalTags: tags.size,
  };
}

export function getUniqueNoteSubjects(
  notes: NoteRecord[]
) {
  return Array.from(
    new Set(
      notes
        .map((note) => note.subject.trim())
        .filter(Boolean)
    )
  ).sort((firstSubject, secondSubject) =>
    firstSubject.localeCompare(secondSubject)
  );
}

export function sortNotes(
  notes: NoteRecord[],
  sortOption: NoteSortOption
) {
  return [...notes].sort(
    (firstNote, secondNote) => {
      if (
        firstNote.isPinned !== secondNote.isPinned
      ) {
        return firstNote.isPinned ? -1 : 1;
      }

      switch (sortOption) {
        case "newest":
          return (
            new Date(
              secondNote.createdAt
            ).getTime() -
            new Date(
              firstNote.createdAt
            ).getTime()
          );

        case "oldest":
          return (
            new Date(
              firstNote.createdAt
            ).getTime() -
            new Date(
              secondNote.createdAt
            ).getTime()
          );

        case "title":
          return firstNote.title.localeCompare(
            secondNote.title
          );

        case "updated":
        default:
          return (
            new Date(
              secondNote.updatedAt
            ).getTime() -
            new Date(
              firstNote.updatedAt
            ).getTime()
          );
      }
    }
  );
}

export function formatNoteDate(date: string) {
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

export function getNotePreview(
  content: string,
  maximumLength = 180
) {
  const normalizedContent = content
    .replace(/\s+/g, " ")
    .trim();

  if (
    normalizedContent.length <= maximumLength
  ) {
    return normalizedContent;
  }

  return `${normalizedContent.slice(
    0,
    maximumLength
  )}...`;
}