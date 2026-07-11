import {
  BookOpen,
  CalendarClock,
  Pencil,
  Pin,
  PinOff,
  X,
} from "lucide-react";

import type {
  NoteRecord,
} from "../../../types/note.types";

import {
  formatNoteDate,
} from "../../../utils/note.utils";

interface NoteViewerProps {
  note: NoteRecord;
  onClose: () => void;
  onEdit: (note: NoteRecord) => void;
  onTogglePin: (id: string) => void;
}

function NoteViewer({
  note,
  onClose,
  onEdit,
  onTogglePin,
}: NoteViewerProps) {
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
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                  {note.subject}
                </span>

                {note.isPinned && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                    <Pin size={12} />

                    Pinned
                  </span>
                )}
              </div>

              <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                {note.title}
              </h2>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <CalendarClock size={17} />

                Updated {formatNoteDate(note.updatedAt)}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close note"
              className="rounded-xl p-2 text-slate-500 transition hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onTogglePin(note.id)}
              className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {note.isPinned ? (
                <>
                  <PinOff size={18} />
                  Unpin
                </>
              ) : (
                <>
                  <Pin size={18} />
                  Pin Note
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onEdit(note)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500"
            >
              <Pencil size={18} />

              Edit Note
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            <BookOpen size={18} />

            Note Content
          </div>

          <p className="mt-5 whitespace-pre-wrap break-words leading-8 text-slate-700 dark:text-slate-300">
            {note.content}
          </p>

          {note.tags.length > 0 && (
            <div className="mt-10 border-t border-gray-200 pt-6 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Tags
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default NoteViewer;