import {
  useEffect,
  useState,
} from "react";

import {
  BookOpen,
  Clock3,
  MapPin,
  UserRound,
  X,
} from "lucide-react";

import {
  TIMETABLE_CLASS_TYPES,
  TIMETABLE_DAYS,
} from "../../../constants/timetable.constants";

import type {
  TimetableClassFormData,
  TimetableClassRecord,
} from "../../../types/timetable.types";

import {
  checkTimetableConflict,
  formatTimetableTime,
} from "../../../utils/timetable.util";

interface TimetableClassFormProps {
  timetableClass?: TimetableClassRecord | null;
  classes: TimetableClassRecord[];
  onSubmit: (
    formData: TimetableClassFormData
  ) => void;
  onCancel: () => void;
}

const initialFormData: TimetableClassFormData = {
  subject: "",
  subjectCode: "",
  faculty: "",
  room: "",
  day: "monday",
  startTime: "",
  endTime: "",
  classType: "lecture",
};

function TimetableClassForm({
  timetableClass,
  classes,
  onSubmit,
  onCancel,
}: TimetableClassFormProps) {
  const [formData, setFormData] =
    useState<TimetableClassFormData>(
      initialFormData
    );

  const [error, setError] = useState("");

  useEffect(() => {
    if (timetableClass) {
      setFormData({
        subject: timetableClass.subject,
        subjectCode:
          timetableClass.subjectCode,
        faculty: timetableClass.faculty,
        room: timetableClass.room,
        day: timetableClass.day,
        startTime:
          timetableClass.startTime,
        endTime: timetableClass.endTime,
        classType:
          timetableClass.classType,
      });

      return;
    }

    setFormData(initialFormData);
  }, [timetableClass]);

  function updateField<
    T extends keyof TimetableClassFormData
  >(
    field: T,
    value: TimetableClassFormData[T]
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

    if (!formData.subject.trim()) {
      setError("Subject name is required.");
      return;
    }

    if (!formData.startTime) {
      setError("Start time is required.");
      return;
    }

    if (!formData.endTime) {
      setError("End time is required.");
      return;
    }

    if (
      formData.startTime >= formData.endTime
    ) {
      setError(
        "End time must be after start time."
      );

      return;
    }

    const conflict = checkTimetableConflict(
      classes,
      formData,
      timetableClass?.id
    );

    if (
      conflict.hasConflict &&
      conflict.conflictingClass
    ) {
      setError(
        `Time conflict with ${conflict.conflictingClass.subject} (${formatTimetableTime(
          conflict.conflictingClass.startTime
        )} - ${formatTimetableTime(
          conflict.conflictingClass.endTime
        )}).`
      );

      return;
    }

    onSubmit({
      ...formData,
      subject: formData.subject.trim(),
      subjectCode:
        formData.subjectCode.trim(),
      faculty: formData.faculty.trim(),
      room: formData.room.trim(),
    });
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onCancel();
        }
      }}
    >
      <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {timetableClass
                ? "Edit Class"
                : "Add Class"}
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
              Add class details to your weekly
              timetable.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close class form"
            className="rounded-xl p-2 text-slate-500 transition hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <X size={21} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="timetable-subject"
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
                  id="timetable-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(event) =>
                    updateField(
                      "subject",
                      event.target.value
                    )
                  }
                  placeholder="Java Programming"
                  autoFocus
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="timetable-subject-code"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Subject Code
              </label>

              <input
                id="timetable-subject-code"
                type="text"
                value={formData.subjectCode}
                onChange={(event) =>
                  updateField(
                    "subjectCode",
                    event.target.value
                  )
                }
                placeholder="CSE211"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="timetable-faculty"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Faculty
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="timetable-faculty"
                  type="text"
                  value={formData.faculty}
                  onChange={(event) =>
                    updateField(
                      "faculty",
                      event.target.value
                    )
                  }
                  placeholder="Faculty name"
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="timetable-room"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Room
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="timetable-room"
                  type="text"
                  value={formData.room}
                  onChange={(event) =>
                    updateField(
                      "room",
                      event.target.value
                    )
                  }
                  placeholder="34-405"
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="timetable-day"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Day
              </label>

              <select
                id="timetable-day"
                value={formData.day}
                onChange={(event) =>
                  updateField(
                    "day",
                    event.target
                      .value as TimetableClassFormData["day"]
                  )
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
              >
                {TIMETABLE_DAYS.map((day) => (
                  <option
                    key={day.value}
                    value={day.value}
                  >
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="timetable-class-type"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Class Type
              </label>

              <select
                id="timetable-class-type"
                value={formData.classType}
                onChange={(event) =>
                  updateField(
                    "classType",
                    event.target
                      .value as TimetableClassFormData["classType"]
                  )
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
              >
                {TIMETABLE_CLASS_TYPES.map(
                  (classType) => (
                    <option
                      key={classType.value}
                      value={classType.value}
                    >
                      {classType.label}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="timetable-start-time"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Start Time
              </label>

              <div className="relative">
                <Clock3
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="timetable-start-time"
                  type="time"
                  value={formData.startTime}
                  onChange={(event) =>
                    updateField(
                      "startTime",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="timetable-end-time"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                End Time
              </label>

              <div className="relative">
                <Clock3
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="timetable-end-time"
                  type="time"
                  value={formData.endTime}
                  onChange={(event) =>
                    updateField(
                      "endTime",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
                />
              </div>
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
              {timetableClass
                ? "Save Changes"
                : "Add Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TimetableClassForm;