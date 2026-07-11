import {
  Check,
  X,
  Pencil,
  Trash2,
  TrendingUp,
  TriangleAlert,
  CircleCheckBig,
} from "lucide-react";

import type {
  AttendanceSubjectRecord,
} from "../../../types/studentAttendence.types";

import {
  calculateAttendancePercentage,
  calculateClassesCanSkip,
  calculateClassesNeeded,
  getAttendanceSubjectStatus,
} from "../../../utils/attendance.utils";

interface AttendanceSubjectCardProps {
  subject: AttendanceSubjectRecord;
  onPresent: (id: string) => void;
  onAbsent: (id: string) => void;
  onEdit: (
    subject: AttendanceSubjectRecord
  ) => void;
  onDelete: (id: string) => void;
}

function AttendanceSubjectCard({
  subject,
  onPresent,
  onAbsent,
  onEdit,
  onDelete,
}: AttendanceSubjectCardProps) {
  const percentage =
    calculateAttendancePercentage(
      subject.attendedClasses,
      subject.totalClasses
    );

  const status = getAttendanceSubjectStatus(
    percentage,
    subject.targetPercentage
  );

  const classesNeeded = calculateClassesNeeded(
    subject.attendedClasses,
    subject.totalClasses,
    subject.targetPercentage
  );

  const classesCanSkip = calculateClassesCanSkip(
    subject.attendedClasses,
    subject.totalClasses,
    subject.targetPercentage
  );

  const statusConfig = {
    safe: {
      text: "Safe",
      Icon: CircleCheckBig,
      className:
        "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
      progressClass: "bg-green-500",
    },
    warning: {
      text: "Warning",
      Icon: TriangleAlert,
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
      progressClass: "bg-amber-500",
    },
    critical: {
      text: "Critical",
      Icon: TrendingUp,
      className:
        "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
      progressClass: "bg-red-500",
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.Icon;

  return (
    <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold text-slate-900 dark:text-white">
            {subject.subjectName}
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            Target {subject.targetPercentage}%
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(subject)}
            aria-label={`Edit ${subject.subjectName}`}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(subject.id)}
            aria-label={`Delete ${subject.subjectName}`}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-4xl font-bold text-slate-900 dark:text-white">
            {percentage.toFixed(1)}%
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            {subject.attendedClasses} of{" "}
            {subject.totalClasses} classes attended
          </p>
        </div>

        <div
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${config.className}`}
        >
          <StatusIcon size={16} />

          {config.text}
        </div>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
        <div
          className={`h-full rounded-full transition-all duration-500 ${config.progressClass}`}
          style={{
            width: `${Math.min(100, percentage)}%`,
          }}
        />
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
        {status === "safe" ? (
          <p className="text-sm text-green-700 dark:text-green-400">
            You can skip{" "}
            <strong>{classesCanSkip}</strong>{" "}
            consecutive{" "}
            {classesCanSkip === 1
              ? "class"
              : "classes"}{" "}
            and stay above your target.
          </p>
        ) : (
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Attend the next{" "}
            <strong>{classesNeeded}</strong>{" "}
            consecutive{" "}
            {classesNeeded === 1
              ? "class"
              : "classes"}{" "}
            to reach your target.
          </p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onPresent(subject.id)}
          className="flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 font-medium text-green-700 transition hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400 dark:hover:bg-green-950/50"
        >
          <Check size={19} />

          Present
        </button>

        <button
          type="button"
          onClick={() => onAbsent(subject.id)}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-medium text-red-700 transition hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
        >
          <X size={19} />

          Absent
        </button>
      </div>
    </article>
  );
}

export default AttendanceSubjectCard;