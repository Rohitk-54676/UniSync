import {
  useMemo,
  useState,
} from "react";

import {
  BookOpen,
  CalendarDays,
  Clock3,
  GraduationCap,
  Plus,
} from "lucide-react";

import TimetableClassCard from "../../components/student/timetable/TimetableClassCard";

import TimetableClassForm from "../../components/student/timetable/TimetableClassForm";

import TimetableDayTabs from "../../components/student/timetable/TimetableDayTabs";

import useTimetable from "../../hooks/useTimetable";

import type {
  TimetableClassFormData,
  TimetableClassRecord,
  TimetableDay,
} from "../../types/timetable.types";

import {
  getClassesForDay,
  getCurrentClass,
  getCurrentTimetableDay,
  getNextClassToday,
  getTimetableDayLabel,
} from "../../utils/timetable.util";

function Timetable() {
  const {
    classes,
    summary,
    addClass,
    updateClass,
    deleteClass,
  } = useTimetable();

  const currentDay =
    getCurrentTimetableDay();

  const [activeDay, setActiveDay] =
    useState<TimetableDay>(
      currentDay ?? "monday"
    );

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [editingClass, setEditingClass] =
    useState<TimetableClassRecord | null>(
      null
    );

  const activeDayClasses = useMemo(
    () =>
      getClassesForDay(
        classes,
        activeDay
      ),
    [classes, activeDay]
  );

  const currentClass = useMemo(
    () => getCurrentClass(classes),
    [classes]
  );

  const nextClass = useMemo(
    () => getNextClassToday(classes),
    [classes]
  );

  function openAddClassForm() {
    setEditingClass(null);
    setIsFormOpen(true);
  }

  function openEditClassForm(
    timetableClass: TimetableClassRecord
  ) {
    setEditingClass(timetableClass);
    setIsFormOpen(true);
  }

  function closeClassForm() {
    setIsFormOpen(false);
    setEditingClass(null);
  }

  function handleClassSubmit(
    formData: TimetableClassFormData
  ) {
    if (editingClass) {
      updateClass(
        editingClass.id,
        formData
      );
    } else {
      addClass(formData);
    }

    setActiveDay(formData.day);

    closeClassForm();
  }

  function handleDeleteClass(id: string) {
    const timetableClass = classes.find(
      (item) => item.id === id
    );

    if (!timetableClass) {
      return;
    }

    const shouldDelete = window.confirm(
      `Delete ${timetableClass.subject} from your timetable?`
    );

    if (!shouldDelete) {
      return;
    }

    deleteClass(id);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      {/* Header */}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <CalendarDays size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Timetable
            </h1>

            <p className="mt-1 text-gray-600 dark:text-slate-400">
              Organize your weekly classes and
              schedule.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openAddClassForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <Plus size={20} />

          Add Class
        </button>
      </div>

      {/* Summary */}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <CalendarDays className="text-blue-600 dark:text-blue-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Weekly Classes
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.totalClasses}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <BookOpen className="text-indigo-600 dark:text-indigo-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Subjects
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.totalSubjects}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <GraduationCap className="text-green-600 dark:text-green-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Active Days
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.activeDays}
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-600 p-5 text-white shadow-lg shadow-indigo-600/20 dark:bg-indigo-500">
          <Clock3 />

          <p className="mt-4 text-sm text-indigo-100">
            Weekly Hours
          </p>

          <p className="mt-1 text-3xl font-bold">
            {summary.weeklyHours}
          </p>
        </div>
      </div>

      {/* Current Class */}

      {(currentClass || nextClass) && (
        <div className="mt-8 rounded-3xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/30">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            {currentClass
              ? "Happening Now"
              : "Next Class Today"}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {(currentClass ?? nextClass)?.subject}
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Open today's schedule below for full
            class details.
          </p>

          {currentDay && (
            <button
              type="button"
              onClick={() =>
                setActiveDay(currentDay)
              }
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500"
            >
              View Today's Schedule
            </button>
          )}
        </div>
      )}

      {/* Day Tabs */}

      <TimetableDayTabs
        activeDay={activeDay}
        classes={classes}
        onDayChange={setActiveDay}
      />

      {/* Day Heading */}

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {getTimetableDayLabel(activeDay)}
        </h2>

        <p className="mt-1 text-gray-600 dark:text-slate-400">
          {activeDayClasses.length}{" "}
          {activeDayClasses.length === 1
            ? "class"
            : "classes"}{" "}
          scheduled
        </p>
      </div>

      {/* Classes */}

      {activeDayClasses.length === 0 ? (
        <div className="mt-8 flex min-h-[360px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <CalendarDays size={32} />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            No classes scheduled
          </h2>

          <p className="mt-3 max-w-md leading-7 text-gray-600 dark:text-slate-400">
            Add a class for{" "}
            {getTimetableDayLabel(activeDay)}{" "}
            to start building your weekly
            timetable.
          </p>

          <button
            type="button"
            onClick={openAddClassForm}
            className="mt-7 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500"
          >
            <Plus size={19} />

            Add Class
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {activeDayClasses.map(
            (timetableClass) => (
              <TimetableClassCard
                key={timetableClass.id}
                timetableClass={timetableClass}
                isCurrent={
                  currentClass?.id ===
                  timetableClass.id
                }
                isNext={
                  nextClass?.id ===
                  timetableClass.id
                }
                onEdit={openEditClassForm}
                onDelete={handleDeleteClass}
              />
            )
          )}
        </div>
      )}

      {/* Form */}

      {isFormOpen && (
        <TimetableClassForm
          timetableClass={editingClass}
          classes={classes}
          onSubmit={handleClassSubmit}
          onCancel={closeClassForm}
        />
      )}
    </main>
  );
}

export default Timetable;