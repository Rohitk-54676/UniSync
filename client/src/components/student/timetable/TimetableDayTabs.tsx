import { TIMETABLE_DAYS } from "../../../constants/timetable.constants";

import type {
  TimetableClassRecord,
  TimetableDay,
} from "../../../types/timetable.types";

interface TimetableDayTabsProps {
  activeDay: TimetableDay;
  classes: TimetableClassRecord[];
  onDayChange: (day: TimetableDay) => void;
}

function TimetableDayTabs({
  activeDay,
  classes,
  onDayChange,
}: TimetableDayTabsProps) {
  return (
    <div className="mt-10 overflow-x-auto pb-2">
      <div className="flex min-w-max gap-3">
        {TIMETABLE_DAYS.map((day) => {
          const classCount = classes.filter(
            (timetableClass) =>
              timetableClass.day === day.value
          ).length;

          const isActive =
            activeDay === day.value;

          return (
            <button
              key={day.value}
              type="button"
              onClick={() =>
                onDayChange(day.value)
              }
              className={`
                min-w-24
                rounded-2xl
                border
                px-5
                py-4
                text-center
                transition
                ${
                  isActive
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 dark:border-indigo-500 dark:bg-indigo-500"
                    : "border-gray-200 bg-white text-slate-700 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-600"
                }
              `}
            >
              <p className="font-semibold">
                {day.shortLabel}
              </p>

              <p
                className={`mt-1 text-xs ${
                  isActive
                    ? "text-indigo-100"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {classCount}{" "}
                {classCount === 1
                  ? "class"
                  : "classes"}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TimetableDayTabs;