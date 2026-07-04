import { useMemo, useState } from "react";

import {
  Plus,
  Trash2,
  RotateCcw,
  BookOpen,
  AlertCircle,
} from "lucide-react";

import type { Subject } from "../../../types/cgpa.types";

const gradePoints: Record<string, number> = {
  "O": 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  D: 4,
  F: 0,
};

const gradeOptions = Object.keys(gradePoints);

function createSubject(): Subject {
  return {
    id: crypto.randomUUID(),
    name: "",
    credits: 0,
    grade: "",
  };
}

function SemesterCalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([
    createSubject(),
    createSubject(),
  ]);

  const totalCredits = useMemo(() => {
    return subjects.reduce((total, subject) => {
      return total + subject.credits;
    }, 0);
  }, [subjects]);

  const totalGradePoints = useMemo(() => {
    return subjects.reduce((total, subject) => {
      const gradePoint = gradePoints[subject.grade] ?? 0;

      return total + subject.credits * gradePoint;
    }, 0);
  }, [subjects]);

  const hasIncompleteSubject = subjects.some(
    (subject) =>
      !subject.name.trim() ||
      subject.credits <= 0 ||
      !subject.grade
  );

  const sgpa =
    totalCredits > 0 && !hasIncompleteSubject
      ? totalGradePoints / totalCredits
      : 0;

  function addSubject() {
    setSubjects((currentSubjects) => [
      ...currentSubjects,
      createSubject(),
    ]);
  }

  function removeSubject(id: string) {
    setSubjects((currentSubjects) => {
      if (currentSubjects.length === 1) {
        return currentSubjects;
      }

      return currentSubjects.filter(
        (subject) => subject.id !== id
      );
    });
  }

  function updateSubject(
    id: string,
    field: keyof Omit<Subject, "id">,
    value: string | number
  ) {
    setSubjects((currentSubjects) =>
      currentSubjects.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]: value,
            }
          : subject
      )
    );
  }

  function resetCalculator() {
    setSubjects([
      createSubject(),
      createSubject(),
    ]);
  }

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Semester GPA
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
            Add your subjects, credits and grades.
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

      <div className="mt-8 hidden grid-cols-[1fr_140px_160px_48px] gap-4 px-2 text-sm font-medium text-gray-500 md:grid dark:text-slate-400">
        <span>Subject</span>

        <span>Credits</span>

        <span>Grade</span>

        <span />
      </div>

      {/* Subjects */}

      <div className="mt-3 space-y-4">
        {subjects.map((subject, index) => (
          <div
            key={subject.id}
            className="grid gap-4 rounded-2xl border border-gray-200 bg-slate-50 p-4 md:grid-cols-[1fr_140px_160px_48px] md:items-center dark:border-slate-700 dark:bg-slate-900"
          >
            {/* Subject */}

            <div>
              <label
                htmlFor={`subject-${subject.id}`}
                className="mb-2 block text-sm font-medium text-slate-700 md:hidden dark:text-slate-300"
              >
                Subject
              </label>

              <div className="relative">
                <BookOpen
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
                />

                <input
                  id={`subject-${subject.id}`}
                  type="text"
                  value={subject.name}
                  onChange={(event) =>
                    updateSubject(
                      subject.id,
                      "name",
                      event.target.value
                    )
                  }
                  placeholder={`Subject ${index + 1}`}
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
                />
              </div>
            </div>

            {/* Credits */}

            <div>
              <label
                htmlFor={`credits-${subject.id}`}
                className="mb-2 block text-sm font-medium text-slate-700 md:hidden dark:text-slate-300"
              >
                Credits
              </label>

              <input
                id={`credits-${subject.id}`}
                type="number"
                min="0"
                max="20"
                step="1"
                value={
                  subject.credits === 0
                    ? ""
                    : subject.credits
                }
                onChange={(event) =>
                  updateSubject(
                    subject.id,
                    "credits",
                    Number(event.target.value)
                  )
                }
                placeholder="Credits"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
              />
            </div>

            {/* Grade */}

            <div>
              <label
                htmlFor={`grade-${subject.id}`}
                className="mb-2 block text-sm font-medium text-slate-700 md:hidden dark:text-slate-300"
              >
                Grade
              </label>

              <select
                id={`grade-${subject.id}`}
                value={subject.grade}
                onChange={(event) =>
                  updateSubject(
                    subject.id,
                    "grade",
                    event.target.value
                  )
                }
                className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
              >
                <option value="">
                  Select grade
                </option>

                {gradeOptions.map((grade) => (
                  <option
                    key={grade}
                    value={grade}
                  >
                    {grade} ({gradePoints[grade]})
                  </option>
                ))}
              </select>
            </div>

            {/* Remove */}

            <button
              type="button"
              onClick={() => removeSubject(subject.id)}
              disabled={subjects.length === 1}
              aria-label={`Remove subject ${index + 1}`}
              title="Remove subject"
              className="flex h-12 w-full items-center justify-center rounded-xl text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30 md:w-12 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              <Trash2 size={19} />

              <span className="ml-2 md:hidden">
                Remove Subject
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Add Subject */}

      <button
        type="button"
        onClick={addSubject}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 py-4 font-medium text-gray-600 transition hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400"
      >
        <Plus size={19} />

        Add Subject
      </button>

      {/* Validation */}

      {hasIncompleteSubject && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p className="text-sm leading-6">
            Complete the subject name, credits and grade for every
            subject to calculate your SGPA.
          </p>
        </div>
      )}

      {/* Result */}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-900">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Subjects
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {subjects.length}
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
            Your SGPA
          </p>

          <p className="mt-2 text-3xl font-bold">
            {sgpa.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SemesterCalculator;