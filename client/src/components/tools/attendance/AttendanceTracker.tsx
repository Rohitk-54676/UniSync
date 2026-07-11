import { useMemo, useState } from "react";

import {
  CalendarCheck,
  RotateCcw,
  Target,
  BookOpenCheck,
  BookOpen,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  CircleCheckBig,
} from "lucide-react";

import type {
  AttendanceData,
  AttendanceResult,
  AttendanceStatus,
} from "../../../types/attendance.types";

const initialAttendanceData: AttendanceData = {
  attendedClasses: 0,
  totalClasses: 0,
  targetPercentage: 75,
};

function calculateAttendanceResult(
  data: AttendanceData
): AttendanceResult {
  const {
    attendedClasses,
    totalClasses,
    targetPercentage,
  } = data;

  const currentPercentage =
    totalClasses > 0
      ? (attendedClasses / totalClasses) * 100
      : 0;

  let classesNeeded = 0;

  if (
    totalClasses > 0 &&
    currentPercentage < targetPercentage &&
    targetPercentage < 100
  ) {
    classesNeeded = Math.ceil(
      (
        targetPercentage * totalClasses -
        100 * attendedClasses
      ) /
        (100 - targetPercentage)
    );
  }

  let classesCanSkip = 0;

  if (
    totalClasses > 0 &&
    currentPercentage >= targetPercentage &&
    targetPercentage > 0
  ) {
    classesCanSkip = Math.floor(
      (100 * attendedClasses) / targetPercentage -
        totalClasses
    );
  }

  return {
    currentPercentage,
    classesNeeded: Math.max(0, classesNeeded),
    classesCanSkip: Math.max(0, classesCanSkip),
    isTargetReached:
      totalClasses > 0 &&
      currentPercentage >= targetPercentage,
  };
}

function getAttendanceStatus(
  percentage: number,
  targetPercentage: number
): AttendanceStatus {
  if (percentage >= targetPercentage) {
    return "safe";
  }

  if (percentage >= targetPercentage - 10) {
    return "warning";
  }

  return "critical";
}

function AttendanceTracker() {
  const [attendanceData, setAttendanceData] =
    useState<AttendanceData>(initialAttendanceData);

  const [futureClasses, setFutureClasses] = useState(0);

  const [futureAttendedClasses, setFutureAttendedClasses] =
    useState(0);

  const result = useMemo(
    () => calculateAttendanceResult(attendanceData),
    [attendanceData]
  );

  const status = getAttendanceStatus(
    result.currentPercentage,
    attendanceData.targetPercentage
  );

  const isAttendanceInvalid =
    attendanceData.attendedClasses >
    attendanceData.totalClasses;

  const isTargetInvalid =
    attendanceData.targetPercentage <= 0 ||
    attendanceData.targetPercentage > 100;

  const isFutureAttendanceInvalid =
    futureAttendedClasses > futureClasses;

  const hasValidAttendance =
    attendanceData.totalClasses > 0 &&
    !isAttendanceInvalid &&
    !isTargetInvalid;

  const futurePercentage = useMemo(() => {
    if (
      !hasValidAttendance ||
      isFutureAttendanceInvalid
    ) {
      return 0;
    }

    const updatedTotalClasses =
      attendanceData.totalClasses + futureClasses;

    const updatedAttendedClasses =
      attendanceData.attendedClasses +
      futureAttendedClasses;

    if (updatedTotalClasses === 0) {
      return 0;
    }

    return (
      (updatedAttendedClasses / updatedTotalClasses) * 100
    );
  }, [
    attendanceData,
    futureClasses,
    futureAttendedClasses,
    hasValidAttendance,
    isFutureAttendanceInvalid,
  ]);

  function updateAttendanceData(
    field: keyof AttendanceData,
    value: number
  ) {
    setAttendanceData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function resetTracker() {
    setAttendanceData(initialAttendanceData);
    setFutureClasses(0);
    setFutureAttendedClasses(0);
  }

  function getStatusContent() {
    if (!hasValidAttendance) {
      return {
        title: "Enter attendance data",
        description:
          "Add your attended and total classes to view your attendance status.",
        containerClass:
          "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900",
        iconClass:
          "text-slate-500 dark:text-slate-400",
        titleClass:
          "text-slate-900 dark:text-white",
        Icon: CalendarCheck,
      };
    }

    if (status === "safe") {
      return {
        title: "Attendance is safe",
        description: `You are currently above your ${attendanceData.targetPercentage}% attendance target.`,
        containerClass:
          "border-green-200 bg-green-50 dark:border-green-900/70 dark:bg-green-950/30",
        iconClass:
          "text-green-600 dark:text-green-400",
        titleClass:
          "text-green-700 dark:text-green-400",
        Icon: CircleCheckBig,
      };
    }

    if (status === "warning") {
      return {
        title: "Attendance needs attention",
        description: `You are close to your ${attendanceData.targetPercentage}% target. Avoid unnecessary absences.`,
        containerClass:
          "border-amber-200 bg-amber-50 dark:border-amber-900/70 dark:bg-amber-950/30",
        iconClass:
          "text-amber-600 dark:text-amber-400",
        titleClass:
          "text-amber-700 dark:text-amber-400",
        Icon: AlertCircle,
      };
    }

    return {
      title: "Attendance is critical",
      description: `Your attendance is significantly below your ${attendanceData.targetPercentage}% target.`,
      containerClass:
        "border-red-200 bg-red-50 dark:border-red-900/70 dark:bg-red-950/30",
      iconClass:
        "text-red-600 dark:text-red-400",
      titleClass:
        "text-red-700 dark:text-red-400",
      Icon: TrendingDown,
    };
  }

  const statusContent = getStatusContent();
  const StatusIcon = statusContent.Icon;

  return (
    <section className="w-full">
      {/* Page Header */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            <CalendarCheck size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Attendance Tracker
            </h1>

            <p className="mt-1 text-gray-600 dark:text-slate-400">
              Calculate, predict and manage your attendance.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
        {/* Main Calculator */}

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          {/* Calculator Header */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Current Attendance
              </h2>

              <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                Enter your current class attendance details.
              </p>
            </div>

            <button
              type="button"
              onClick={resetTracker}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <RotateCcw size={17} />

              Reset
            </button>
          </div>

          {/* Inputs */}

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div>
              <label
                htmlFor="attended-classes"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Attended Classes
              </label>

              <div className="relative">
                <BookOpenCheck
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
                />

                <input
                  id="attended-classes"
                  type="number"
                  min="0"
                  step="1"
                  value={
                    attendanceData.attendedClasses === 0
                      ? ""
                      : attendanceData.attendedClasses
                  }
                  onChange={(event) =>
                    updateAttendanceData(
                      "attendedClasses",
                      Math.max(
                        0,
                        Number(event.target.value)
                      )
                    )
                  }
                  placeholder="Example: 42"
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="total-classes"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Total Classes
              </label>

              <div className="relative">
                <BookOpen
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
                />

                <input
                  id="total-classes"
                  type="number"
                  min="0"
                  step="1"
                  value={
                    attendanceData.totalClasses === 0
                      ? ""
                      : attendanceData.totalClasses
                  }
                  onChange={(event) =>
                    updateAttendanceData(
                      "totalClasses",
                      Math.max(
                        0,
                        Number(event.target.value)
                      )
                    )
                  }
                  placeholder="Example: 55"
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="target-percentage"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Target Attendance
              </label>

              <div className="relative">
                <Target
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
                />

                <input
                  id="target-percentage"
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  value={
                    attendanceData.targetPercentage
                  }
                  onChange={(event) =>
                    updateAttendanceData(
                      "targetPercentage",
                      Number(event.target.value)
                    )
                  }
                  placeholder="75"
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-10 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-slate-400">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Validation */}

          {isAttendanceInvalid && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <p className="text-sm leading-6">
                Attended classes cannot be greater than
                total classes.
              </p>
            </div>
          )}

          {isTargetInvalid && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <p className="text-sm leading-6">
                Target attendance must be between 1% and
                100%.
              </p>
            </div>
          )}

          {/* Attendance Result */}

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-900">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Attended
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {attendanceData.attendedClasses}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-900">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Total Classes
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {attendanceData.totalClasses}
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-600 p-5 text-white shadow-lg shadow-indigo-600/20 dark:bg-indigo-500">
              <p className="text-sm text-indigo-100">
                Attendance
              </p>

              <p className="mt-2 text-3xl font-bold">
                {hasValidAttendance
                  ? result.currentPercentage.toFixed(2)
                  : "0.00"}
                %
              </p>
            </div>
          </div>

          {/* Status */}

          <div
            className={`mt-6 flex items-start gap-4 rounded-2xl border p-5 ${statusContent.containerClass}`}
          >
            <StatusIcon
              size={24}
              className={`mt-0.5 shrink-0 ${statusContent.iconClass}`}
            />

            <div>
              <h3
                className={`font-semibold ${statusContent.titleClass}`}
              >
                {statusContent.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {statusContent.description}
              </p>
            </div>
          </div>

          {/* Future Prediction */}

          <div className="mt-10 border-t border-gray-200 pt-8 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-indigo-600 dark:text-indigo-400" />

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Future Attendance Prediction
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                  See how upcoming classes may affect your
                  attendance.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="future-classes"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Upcoming Classes
                </label>

                <input
                  id="future-classes"
                  type="number"
                  min="0"
                  step="1"
                  value={
                    futureClasses === 0
                      ? ""
                      : futureClasses
                  }
                  onChange={(event) =>
                    setFutureClasses(
                      Math.max(
                        0,
                        Number(event.target.value)
                      )
                    )
                  }
                  placeholder="Example: 10"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                />
              </div>

              <div>
                <label
                  htmlFor="future-attended"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Classes You Will Attend
                </label>

                <input
                  id="future-attended"
                  type="number"
                  min="0"
                  step="1"
                  value={
                    futureAttendedClasses === 0
                      ? ""
                      : futureAttendedClasses
                  }
                  onChange={(event) =>
                    setFutureAttendedClasses(
                      Math.max(
                        0,
                        Number(event.target.value)
                      )
                    )
                  }
                  placeholder="Example: 8"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                />
              </div>
            </div>

            {isFutureAttendanceInvalid && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300">
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-sm leading-6">
                  Classes you will attend cannot be greater
                  than upcoming classes.
                </p>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900 dark:bg-indigo-950/30">
              <p className="text-sm text-indigo-600 dark:text-indigo-400">
                Predicted Attendance
              </p>

              <p className="mt-2 text-3xl font-bold text-indigo-700 dark:text-indigo-300">
                {hasValidAttendance &&
                !isFutureAttendanceInvalid
                  ? futurePercentage.toFixed(2)
                  : "0.00"}
                %
              </p>

              {hasValidAttendance &&
                futureClasses > 0 &&
                !isFutureAttendanceInvalid && (
                  <p className="mt-2 text-sm text-indigo-700/80 dark:text-indigo-300/80">
                    After {futureClasses} upcoming{" "}
                    {futureClasses === 1
                      ? "class"
                      : "classes"}{" "}
                    with {futureAttendedClasses} attended.
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Attendance Insights */}

        <aside className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Attendance Insights
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
              Based on your current attendance and target.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-900">
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Target
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {attendanceData.targetPercentage || 0}%
                </p>
              </div>

              {hasValidAttendance &&
              result.isTargetReached ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900/70 dark:bg-green-950/30">
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Classes You Can Skip
                  </p>

                  <p className="mt-2 text-3xl font-bold text-green-700 dark:text-green-300">
                    {result.classesCanSkip}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-green-700/80 dark:text-green-400/80">
                    You can skip this many consecutive
                    classes and remain at or above your
                    target.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/70 dark:bg-amber-950/30">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Classes Needed
                  </p>

                  <p className="mt-2 text-3xl font-bold text-amber-700 dark:text-amber-300">
                    {hasValidAttendance
                      ? result.classesNeeded
                      : 0}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-amber-700/80 dark:text-amber-400/80">
                    Attend this many consecutive classes to
                    reach your target.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/30">
            <Target className="text-indigo-600 dark:text-indigo-400" />

            <h3 className="mt-4 font-semibold text-indigo-900 dark:text-indigo-200">
              How calculation works
            </h3>

            <p className="mt-2 text-sm leading-6 text-indigo-700 dark:text-indigo-300">
              Attendance percentage is calculated as attended
              classes divided by total classes, multiplied by
              100.
            </p>

            <div className="mt-4 rounded-xl bg-white/70 p-4 font-mono text-sm text-indigo-700 dark:bg-slate-900/60 dark:text-indigo-300">
              (Attended ÷ Total) × 100
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default AttendanceTracker;