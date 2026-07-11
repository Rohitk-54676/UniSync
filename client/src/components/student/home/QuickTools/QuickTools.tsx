import { useNavigate } from "react-router-dom";

import {
  Calculator,
  CalendarCheck,
  CalendarDays,
  MapPinned,
} from "lucide-react";

const tools = [
  {
    title: "CGPA Calculator",
    icon: Calculator,
    path: "/student/tools/cgpa",
  },
  {
    title: "Attendance",
    icon: CalendarCheck,
    path: "/student/attendance",
  },
  {
    title: "Academic Calendar",
    icon: CalendarDays,
    path: "",
  },
  {
    title: "Campus Map",
    icon: MapPinned,
    path: "",
  },
];

function QuickTools() {
  const navigate = useNavigate();

  function handleToolClick(path: string) {
    if (!path) {
      return;
    }

    navigate(path);
  }

  return (
    <section id="quick-tools">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Quick Tools
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isAvailable = Boolean(tool.path);

          return (
            <button
              key={tool.title}
              type="button"
              onClick={() =>
                handleToolClick(tool.path)
              }
              className={`
                group
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                text-left
                shadow-sm
                transition-all
                duration-300
                dark:border-slate-700
                dark:bg-slate-800
                ${
                  isAvailable
                    ? "cursor-pointer hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg dark:hover:border-indigo-500"
                    : "cursor-default opacity-70"
                }
              `}
            >
              <Icon
                size={30}
                className="mb-5 text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400"
              />

              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {tool.title}
                </h3>

                {!isAvailable && (
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                    Soon
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuickTools;