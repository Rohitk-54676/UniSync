import {
  BookOpen,
  CalendarClock,
  Pencil,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";

import type {
  NoteRecord,
} from "../../../types/note.types";

import {
  formatNoteDate,
  getNotePreview,
} from "../../../utils/note.utils";

interface NoteCardProps {
  note: NoteRecord;
  onOpen: (note: NoteRecord) => void;
  onEdit: (note: NoteRecord) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

function NoteCard({
  note,
  onOpen,
  onEdit,
  onDelete,
  onTogglePin,
}: NoteCardProps) {
  return (
    <article
      className={`
        group
        flex
        h-full
        flex-col
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
          note.isPinned
            ? "border-amber-300 dark:border-amber-700"
            : "border-gray-200 dark:border-slate-700"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
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

          <h3 className="mt-4 line-clamp-2 text-xl font-semibold text-slate-900 dark:text-white">
            {note.title}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onTogglePin(note.id)}
            aria-label={
              note.isPinned
                ? `Unpin ${note.title}`
                : `Pin ${note.title}`
            }
            className="rounded-xl p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600 dark:text-slate-400 dark:hover:bg-amber-950/30 dark:hover:text-amber-400"
          >
            {note.isPinned ? (
              <PinOff size={18} />
            ) : (
              <Pin size={18} />
            )}
          </button>

          <button
            type="button"
            onClick={() => onEdit(note)}
            aria-label={`Edit ${note.title}`}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            aria-label={`Delete ${note.title}`}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpen(note)}
        className="mt-5 flex flex-1 flex-col text-left"
      >
        <p className="line-clamp-5 leading-7 text-gray-600 dark:text-slate-400">
          {getNotePreview(note.content)}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto w-full pt-6">
          <div className="border-t border-gray-100 pt-4 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CalendarClock size={15} />

              Updated {formatNoteDate(note.updatedAt)}
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              <BookOpen size={17} />

              Open Note
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}

export default NoteCard;