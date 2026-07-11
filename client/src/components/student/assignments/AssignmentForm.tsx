import { useEffect, useState } from "react";

import {
  BookOpen,
  CalendarDays,
  Clock3,
  FileText,
  X,
} from "lucide-react";

import type {
  AssignmentFormData,
  AssignmentRecord,
} from "../../../types/assignment.types";

interface AssignmentFormProps {
  assignment?: AssignmentRecord | null;
  onSubmit: (
    formData: AssignmentFormData
  ) => void;
  onCancel: () => void;
}

const initialFormData: AssignmentFormData = {
  title: "",
  subject: "",
  description: "",
  dueDate: "",
  dueTime: "",
  priority: "medium",
  status: "pending",
};

function AssignmentForm({
  assignment,
  onSubmit,
  onCancel,
}: AssignmentFormProps) {
  const [formData, setFormData] =
    useState<AssignmentFormData>(
      initialFormData
    );

  const [error, setError] = useState("");

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title,
        subject: assignment.subject,
        description: assignment.description,
        dueDate: assignment.dueDate,
        dueTime: assignment.dueTime,
        priority: assignment.priority,
        status: assignment.status,
      });

      return;
    }

    setFormData(initialFormData);
  }, [assignment]);

  function updateField<
    T extends keyof AssignmentFormData
  >(
    field: T,
    value: AssignmentFormData[T]
  ) {
    setError("");

    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Assignment title is required.");
      return;
    }

    if (!formData.subject.trim()) {
      setError("Subject name is required.");
      return;
    }

    if (!formData.dueDate) {
      setError("Due date is required.");
      return;
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      subject: formData.subject.trim(),
      description: formData.description.trim(),
    });
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {assignment
                ? "Edit Assignment"
                : "Add Assignment"}
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
              Add assignment details and set its deadline.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close assignment form"
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
              htmlFor="assignment-title"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Assignment Title
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="assignment-title"
                type="text"
                value={formData.title}
                onChange={(event) =>
                  updateField(
                    "title",
                    event.target.value
                  )
                }
                placeholder="Example: Java Collections Assignment"
                autoFocus
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="assignment-subject"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Subject
            </label>

            <div className="relative">
              <BookOpen
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="assignment-subject"
                type="text"
                value={formData.subject}
                onChange={(event) =>
                  updateField(
                    "subject",
                    event.target.value
                  )
                }
                placeholder="Example: Java Programming"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="assignment-description"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Description
            </label>

            <textarea
              id="assignment-description"
              rows={4}
              value={formData.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              placeholder="Add assignment instructions or notes..."
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="assignment-due-date"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Due Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="assignment-due-date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(event) =>
                    updateField(
                      "dueDate",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="assignment-due-time"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Due Time
              </label>

              <div className="relative">
                <Clock3
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="assignment-due-time"
                  type="time"
                  value={formData.dueTime}
                  onChange={(event) =>
                    updateField(
                      "dueTime",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="assignment-priority"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Priority
              </label>

              <select
                id="assignment-priority"
                value={formData.priority}
                onChange={(event) =>
                  updateField(
                    "priority",
                    event.target
                      .value as AssignmentFormData["priority"]
                  )
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="assignment-status"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Status
              </label>

              <select
                id="assignment-status"
                value={formData.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target
                      .value as AssignmentFormData["status"]
                  )
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
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
              {assignment
                ? "Save Changes"
                : "Add Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignmentForm;