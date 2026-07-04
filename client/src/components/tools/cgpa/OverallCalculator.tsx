import { useMemo, useState } from "react";

import {
  Plus,
  Trash2,
  RotateCcw,
  Layers3,
  AlertCircle,
} from "lucide-react";

import type { Semester } from "../../../types/cgpa.types";

function createSemester(index: number): Semester {
  return {
    id: crypto.randomUUID(),
    name: `Semester ${index}`,
    sgpa: 0,
    credits: 0,
  };
}

function OverallCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    createSemester(1),
    createSemester(2),
  ]);

  const totalCredits = useMemo(() => {
    return semesters.reduce(
      (total, semester) => total + semester.credits,
      0
    );
  }, [semesters]);

  const totalWeightedPoints = useMemo(() => {
    return semesters.reduce(
      (total, semester) =>
        total + semester.sgpa * semester.credits,
      0
    );
  }, [semesters]);

  const hasIncompleteSemester = semesters.some(
    (semester) =>
      !semester.name.trim() ||
      semester.sgpa <= 0 ||
      semester.sgpa > 10 ||
      semester.credits <= 0
  );

  const cgpa =
    totalCredits > 0 && !hasIncompleteSemester
      ? totalWeightedPoints / totalCredits
      : 0;

  function addSemester() {
    setSemesters((currentSemesters) => [
      ...currentSemesters,
      createSemester(currentSemesters.length + 1),
    ]);
  }

  function removeSemester(id: string) {
    setSemesters((currentSemesters) => {
      if (currentSemesters.length === 1) {
        return currentSemesters;
      }

      return currentSemesters.filter(
        (semester) => semester.id !== id
      );
    });
  }

  function updateSemester(
    id: string,
    field: keyof Omit<Semester, "id">,
    value: string | number
  ) {
    setSemesters((currentSemesters) =>
      currentSemesters.map((semester) =>
        semester.id === id
          ? {
              ...semester,
              [field]: value,
            }
          : semester
      )
    );
  }

  function resetCalculator() {
    setSemesters([
      createSemester(1),
      createSemester(2),
    ]);
  }

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Overall CGPA
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
            Add your semester SGPA and total semester credits.
          </p>
        </div>

        <button
          type="button"
          onClick={resetCalculator}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <RotateCcw size={17} />

          Reset
        </button>
      </div>

      {/* Desktop Labels */}

      <div className="mt-8 hidden grid-cols-[1fr_160px_160px_48px] gap-4 px-2 text-sm font-medium text-gray-500 md:grid dark:text-slate-400">
        <span>Semester</span>

        <span>SGPA</span>

        <span>Credits</span>

        <span />
      </div>

      {/* Semesters */}

      <div className="mt-3 space-y-4">
        {semesters.map((semester, index) => (
          <div
            key={semester.id}
            className="grid gap-4 rounded-2xl border border-gray-200 bg-slate-50 p-4 md:grid-cols-[1fr_160px_160px_48px] md:items-center dark:border-slate-700 dark:bg-slate-900"
          >
            {/* Semester Name */}

            <div>
              <label
                htmlFor={`semester-name-${semester.id}`}
                className="mb-2 block text-sm font-medium text-slate-700 md:hidden dark:text-slate-300"
              >
                Semester
              </label>

              <div className="relative">
                <Layers3
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
                />

                <input
                  id={`semester-name-${semester.id}`}
                  type="text"
                  value={semester.name}
                  onChange={(event) =>
                    updateSemester(
                      semester.id,
                      "name",
                      event.target.value
                    )
                  }
                  placeholder={`Semester ${index + 1}`}
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                />
              </div>
            </div>

            {/* SGPA */}

            <div>
              <label
                htmlFor={`semester-sgpa-${semester.id}`}
                className="mb-2 block text-sm font-medium text-slate-700 md:hidden dark:text-slate-300"
              >
                SGPA
              </label>

              <input
                id={`semester-sgpa-${semester.id}`}
                type="number"
                min="0"
                max="10"
                step="0.01"
                value={
                  semester.sgpa === 0
                    ? ""
                    : semester.sgpa
                }
                onChange={(event) =>
                  updateSemester(
                    semester.id,
                    "sgpa",
                    Number(event.target.value)
                  )
                }
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
              />
            </div>

            {/* Credits */}

            <div>
              <label
                htmlFor={`semester-credits-${semester.id}`}
                className="mb-2 block text-sm font-medium text-slate-700 md:hidden dark:text-slate-300"
              >
                Credits
              </label>

              <input
                id={`semester-credits-${semester.id}`}
                type="number"
                min="0"
                max="100"
                step="1"
                value={
                  semester.credits === 0
                    ? ""
                    : semester.credits
                }
                onChange={(event) =>
                  updateSemester(
                    semester.id,
                    "credits",
                    Number(event.target.value)
                  )
                }
                placeholder="Credits"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
              />
            </div>

            {/* Remove */}

            <button
              type="button"
              onClick={() =>
                removeSemester(semester.id)
              }
              disabled={semesters.length === 1}
              aria-label={`Remove semester ${index + 1}`}
              title="Remove semester"
              className="flex h-12 w-full items-center justify-center rounded-xl text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30 md:w-12 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              <Trash2 size={19} />

              <span className="ml-2 md:hidden">
                Remove Semester
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Add Semester */}

      <button
        type="button"
        onClick={addSemester}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 py-4 font-medium text-gray-600 transition hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400"
      >
        <Plus size={19} />

        Add Semester
      </button>

      {/* Validation */}

      {hasIncompleteSemester && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p className="text-sm leading-6">
            Enter a valid semester name, SGPA between 0 and
            10, and semester credits for every semester.
          </p>
        </div>
      )}

      {/* Result */}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-900">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Semesters
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {semesters.length}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-900">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Total Credits
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {totalCredits}
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-600 p-5 text-white shadow-lg shadow-indigo-600/20 dark:bg-indigo-500">
          <p className="text-sm text-indigo-100">
            Your CGPA
          </p>

          <p className="mt-2 text-3xl font-bold">
            {cgpa.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OverallCalculator;