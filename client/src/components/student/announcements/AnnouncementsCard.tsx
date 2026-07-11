import {
  Bookmark,
  BookmarkCheck,
  CalendarClock,
  ChevronRight,
  Circle,
} from "lucide-react";

import type {
  AnnouncementRecord,
} from "../../../types/announcements.types";

import {
  formatAnnouncementDate,
  getAnnouncementPreview,
} from "../../../utils/announcement.utils";

interface AnnouncementCardProps {
  announcement: AnnouncementRecord;
  isRead: boolean;
  isBookmarked: boolean;
  onOpen: (
    announcement: AnnouncementRecord
  ) => void;
  onToggleBookmark: (id: string) => void;
}

function AnnouncementCard({
  announcement,
  isRead,
  isBookmarked,
  onOpen,
  onToggleBookmark,
}: AnnouncementCardProps) {
  const categoryStyles = {
    academic:
      "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400",

    exam:
      "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400",

    event:
      "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400",

    placement:
      "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400",

    general:
      "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",

    urgent:
      "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400",
  };

  return (
    <article
      className={`
        group
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        dark:bg-slate-800
        ${
          !isRead
            ? "border-indigo-300 dark:border-indigo-700"
            : "border-gray-200 dark:border-slate-700"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${categoryStyles[announcement.category]}`}
          >
            {announcement.category}
          </span>

          {announcement.priority !==
            "normal" && (
            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                capitalize
                ${
                  announcement.priority ===
                  "urgent"
                    ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                }
              `}
            >
              {announcement.priority}
            </span>
          )}

          {!isRead && (
            <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <Circle
                size={8}
                fill="currentColor"
              />

              New
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() =>
            onToggleBookmark(announcement.id)
          }
          aria-label={
            isBookmarked
              ? `Remove ${announcement.title} from bookmarks`
              : `Bookmark ${announcement.title}`
          }
          className="shrink-0 rounded-xl p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
        >
          {isBookmarked ? (
            <BookmarkCheck size={20} />
          ) : (
            <Bookmark size={20} />
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={() => onOpen(announcement)}
        className="mt-5 block w-full text-left"
      >
        <h3
          className={`text-xl text-slate-900 dark:text-white ${
            isRead
              ? "font-semibold"
              : "font-bold"
          }`}
        >
          {announcement.title}
        </h3>

        <p className="mt-3 leading-7 text-gray-600 dark:text-slate-400">
          {getAnnouncementPreview(
            announcement.description
          )}
        </p>

        <div className="mt-6 border-t border-gray-100 pt-4 dark:border-slate-700">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {announcement.author}
              </p>

              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <CalendarClock size={14} />

                {formatAnnouncementDate(
                  announcement.publishedAt
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Read Announcement

              <ChevronRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}

export default AnnouncementCard;