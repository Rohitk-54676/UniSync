import { useEffect, useState } from "react";

import {
  BookOpen,
  CalendarCheck,
  Target,
  X,
} from "lucide-react";

import type {
  AttendanceSubjectFormData,
  AttendanceSubjectRecord,
} from "../../../types/studentAttendence.types";

interface AttendanceSubjectFormProps {
  subject?: AttendanceSubjectRecord | null;
  onSubmit: (
    data: AttendanceSubjectFormData
  ) => void;
  onCancel: () => void;
}

const initialFormData: AttendanceSubjectFormData = {
  subjectName: "",
  attendedClasses: 0,
  totalClasses: 0,
  targetPercentage: 75,
};

function AttendanceSubjectForm({
  subject,
  onSubmit,
  onCancel,
}: AttendanceSubjectFormProps) {
  const [formData, setFormData] =
    useState<AttendanceSubjectFormData>(
      initialFormData
    );

  const [error, setError] = useState("");

  useEffect(() => {
    if (subject) {
      setFormData({
        subjectName: subject.subjectName,
        attendedClasses: subject.attendedClasses,
        totalClasses: subject.totalClasses,
        targetPercentage: subject.targetPercentage,
      });

      return;
    }

    setFormData(initialFormData);
  }, [subject]);

  function updateField(
    field: keyof AttendanceSubjectFormData,
    value: string | number
  ) {
    setError("");

    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!formData.subjectName.trim()) {
      setError("Subject name is required.");
      return;
    }

    if (
      formData.attendedClasses >
      formData.totalClasses
    ) {
      setError(
        "Attended classes cannot exceed total classes."
      );
      return;
    }

    if (
      formData.targetPercentage <= 0 ||
      formData.targetPercentage > 100
    ) {
      setError(
        "Target attendance must be between 1 and 100."
      );
      return;
    }

    onSubmit({
      ...formData,
      subjectName: formData.subjectName.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {subject
                ? "Edit Subject"
                : "Add Subject"}
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
              Add your current subject attendance details.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close form"
            className="rounded-xl p-2 text-slate-500 transition hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <X size={21} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="subject-name"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Subject Name
            </label>

            <div className="relative">
              <BookOpen
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="subject-name"
                type="text"
                value={formData.subjectName}
                onChange={(event) =>
                  updateField(
                    "subjectName",
                    event.target.value
                  )
                }
                placeholder="Example: Data Structures"
                autoFocus
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="attended-classes"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Attended Classes
              </label>

              <div className="relative">
                <CalendarCheck
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="attended-classes"
                  type="number"
                  min="0"
                  step="1"
                  value={
                    formData.attendedClasses === 0
                      ? ""
                      : formData.attendedClasses
                  }
                  onChange={(event) =>
                    updateField(
                      "attendedClasses",
                      Math.max(
                        0,
                        Number(event.target.value)
                      )
                    )
                  }
                  placeholder="0"
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
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

              <input
                id="total-classes"
                type="number"
                min="0"
                step="1"
                value={
                  formData.totalClasses === 0
                    ? ""
                    : formData.totalClasses
                }
                onChange={(event) =>
                  updateField(
                    "totalClasses",
                    Math.max(
                      0,
                      Number(event.target.value)
                    )
                  )
                }
                placeholder="0"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="attendance-target"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Attendance Target
            </label>

            <div className="relative">
              <Target
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="attendance-target"
                type="number"
                min="1"
                max="100"
                value={formData.targetPercentage}
                onChange={(event) =>
                  updateField(
                    "targetPercentage",
                    Number(event.target.value)
                  )
                }
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-12 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400">
                %
              </span>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {subject
                ? "Save Changes"
                : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttendanceSubjectForm;