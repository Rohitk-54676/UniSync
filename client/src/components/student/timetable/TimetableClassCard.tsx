import {
  BookOpen,
  Clock3,
  MapPin,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";

import type {
  TimetableClassRecord,
} from "../../../types/timetable.types";

import {
  formatTimetableTime,
  getClassDurationText,
} from "../../../utils/timetable.util";

interface TimetableClassCardProps {
  timetableClass: TimetableClassRecord;
  isCurrent?: boolean;
  isNext?: boolean;
  onEdit: (
    timetableClass: TimetableClassRecord
  ) => void;
  onDelete: (id: string) => void;
}

function TimetableClassCard({
  timetableClass,
  isCurrent = false,
  isNext = false,
  onEdit,
  onDelete,
}: TimetableClassCardProps) {
  const classTypeStyles = {
    lecture:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400",
    lab:
      "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400",
    tutorial:
      "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400",
    seminar:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400",
    other:
      "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  };

  return (
    <article
      className={`
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        dark:bg-slate-800
        ${
          isCurrent
            ? "border-green-400 ring-2 ring-green-500/10 dark:border-green-500"
            : isNext
              ? "border-indigo-300 dark:border-indigo-700"
              : "border-gray-200 dark:border-slate-700"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${classTypeStyles[timetableClass.classType]}`}
            >
              {timetableClass.classType}
            </span>

            {isCurrent && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/60 dark:text-green-400">
                Happening Now
              </span>
            )}

            {!isCurrent && isNext && (
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                Next Class
              </span>
            )}
          </div>

          <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
            {timetableClass.subject}
          </h3>

          {timetableClass.subjectCode && (
            <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              {timetableClass.subjectCode}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() =>
              onEdit(timetableClass)
            }
            aria-label={`Edit ${timetableClass.subject}`}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(timetableClass.id)
            }
            aria-label={`Delete ${timetableClass.subject}`}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
          <Clock3
            size={18}
            className="text-indigo-600 dark:text-indigo-400"
          />

          <span>
            {formatTimetableTime(
              timetableClass.startTime
            )}{" "}
            -{" "}
            {formatTimetableTime(
              timetableClass.endTime
            )}
          </span>

          <span className="text-slate-400">
            •
          </span>

          <span>
            {getClassDurationText(
              timetableClass
            )}
          </span>
        </div>

        {timetableClass.faculty && (
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <UserRound
              size={18}
              className="text-indigo-600 dark:text-indigo-400"
            />

            {timetableClass.faculty}
          </div>
        )}

        {timetableClass.room && (
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <MapPin
              size={18}
              className="text-indigo-600 dark:text-indigo-400"
            />

            {timetableClass.room}
          </div>
        )}

        {!timetableClass.faculty &&
          !timetableClass.room && (
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-500">
              <BookOpen size={18} />

              No additional class details
            </div>
          )}
      </div>
    </article>
  );
}

export default TimetableClassCard;