import {
  Bookmark,
  BookmarkCheck,
  CalendarClock,
  UserRound,
  X,
} from "lucide-react";

import type {
  AnnouncementRecord,
} from "../../../types/announcements.types";

import {
  formatAnnouncementDate,
} from "../../../utils/announcement.utils";

interface AnnouncementViewerProps {
  announcement: AnnouncementRecord;
  isBookmarked: boolean;
  onClose: () => void;
  onToggleBookmark: (id: string) => void;
}

function AnnouncementViewer({
  announcement,
  isBookmarked,
  onClose,
  onToggleBookmark,
}: AnnouncementViewerProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <article className="w-full max-w-4xl rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800">
        <div className="border-b border-gray-200 p-6 dark:border-slate-700 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold capitalize text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
                  {announcement.category}
                </span>

                {announcement.priority !==
                  "normal" && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      announcement.priority ===
                      "urgent"
                        ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                    }`}
                  >
                    {announcement.priority}
                  </span>
                )}
              </div>

              <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 dark:text-white">
                {announcement.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close announcement"
              className="shrink-0 rounded-xl p-2 text-slate-500 transition hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <UserRound size={17} />

                {announcement.author}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CalendarClock size={17} />

                {formatAnnouncementDate(
                  announcement.publishedAt
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onToggleBookmark(announcement.id)
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck size={18} />

                  Remove Bookmark
                </>
              ) : (
                <>
                  <Bookmark size={18} />

                  Bookmark
                </>
              )}
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
          <p className="whitespace-pre-wrap break-words text-lg leading-9 text-slate-700 dark:text-slate-300">
            {announcement.description}
          </p>
        </div>
      </article>
    </div>
  );
}

export default AnnouncementViewer;