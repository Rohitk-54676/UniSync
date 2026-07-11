import {
  CalendarDays,
  Check,
  Circle,
  Clock3,
  Pencil,
  RotateCcw,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import type {
  AssignmentRecord,
  AssignmentStatus,
} from "../../../types/assignment.types";

import {
  formatAssignmentDueDate,
  getAssignmentDueText,
  isAssignmentOverdue,
} from "../../../utils/assignment.utils";

interface AssignmentCardProps {
  assignment: AssignmentRecord;
  onEdit: (assignment: AssignmentRecord) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: AssignmentStatus
  ) => void;
}

function AssignmentCard({
  assignment,
  onEdit,
  onDelete,
  onToggleComplete,
  onStatusChange,
}: AssignmentCardProps) {
  const isOverdue =
    isAssignmentOverdue(assignment);

  const isCompleted =
    assignment.status === "completed";

  const priorityConfig = {
    low: {
      text: "Low",
      className:
        "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    },

    medium: {
      text: "Medium",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    },

    high: {
      text: "High",
      className:
        "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    },
  };

  const statusConfig = {
    pending: {
      text: "Pending",
      className:
        "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    },

    "in-progress": {
      text: "In Progress",
      className:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400",
    },

    completed: {
      text: "Completed",
      className:
        "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
    },
  };

  const priority =
    priorityConfig[assignment.priority];

  const status =
    statusConfig[assignment.status];

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
          isOverdue
            ? "border-red-300 dark:border-red-900"
            : "border-gray-200 dark:border-slate-700"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${priority.className}`}
            >
              {priority.text} Priority
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
            >
              {status.text}
            </span>

            {isOverdue && (
              <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/50 dark:text-red-400">
                <TriangleAlert size={13} />

                Overdue
              </span>
            )}
          </div>

          <h3
            className={`mt-4 text-xl font-semibold ${
              isCompleted
                ? "text-slate-500 line-through dark:text-slate-500"
                : "text-slate-900 dark:text-white"
            }`}
          >
            {assignment.title}
          </h3>

          <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {assignment.subject}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(assignment)}
            aria-label={`Edit ${assignment.title}`}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(assignment.id)
            }
            aria-label={`Delete ${assignment.title}`}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {assignment.description && (
        <p className="mt-5 line-clamp-3 leading-7 text-gray-600 dark:text-slate-400">
          {assignment.description}
        </p>
      )}

      <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
          <CalendarDays
            size={18}
            className="text-indigo-600 dark:text-indigo-400"
          />

          <span>
            {formatAssignmentDueDate(assignment)}
          </span>
        </div>

        <div
          className={`mt-3 flex items-center gap-3 text-sm font-medium ${
            isOverdue
              ? "text-red-600 dark:text-red-400"
              : isCompleted
                ? "text-green-600 dark:text-green-400"
                : "text-slate-600 dark:text-slate-400"
          }`}
        >
          <Clock3 size={18} />

          {getAssignmentDueText(assignment)}
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor={`status-${assignment.id}`}
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
        >
          Change Status
        </label>

        <select
          id={`status-${assignment.id}`}
          value={assignment.status}
          onChange={(event) =>
            onStatusChange(
              assignment.id,
              event.target.value as AssignmentStatus
            )
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
        >
          <option value="pending">
            Pending
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>
        </select>
      </div>

      <button
        type="button"
        onClick={() =>
          onToggleComplete(assignment.id)
        }
        className={`
          mt-5
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          px-4
          py-3
          font-medium
          transition
          ${
            isCompleted
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              : "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400 dark:hover:bg-green-950/50"
          }
        `}
      >
        {isCompleted ? (
          <>
            <RotateCcw size={19} />

            Reopen Assignment
          </>
        ) : (
          <>
            <Check size={19} />

            Mark Complete
          </>
        )}
      </button>

      {!isCompleted &&
        assignment.status === "pending" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-500">
            <Circle size={12} />

            Not started yet
          </div>
        )}
    </article>
  );
}

export default AssignmentCard;