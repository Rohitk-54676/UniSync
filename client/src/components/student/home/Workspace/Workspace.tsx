import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  CalendarDays,
  NotebookPen,
  BrainCircuit,
  Bell,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const workspaceItems = [
  {
    title: "Dashboard",
    description:
      "View analytics, academic progress and insights.",
    icon: LayoutDashboard,
    color:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    path: "/student/dashboard",
  },
  {
    title: "Attendance",
    description:
      "Monitor attendance and eligibility.",
    icon: CalendarCheck,
    color:
      "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
    path: "/student/attendance",
  },
  {
    title: "Assignments",
    description:
      "Manage assignments, deadlines and progress.",
    icon: ClipboardList,
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
    path: "/student/assignments",
  },
  {
    title: "Timetable",
    description:
      "View today's and weekly schedule.",
    icon: CalendarDays,
    color:
      "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    path: "/student/timetable",
  },
  {
    title: "Notes",
    description:
      "Access and organize subject-wise notes.",
    icon: NotebookPen,
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    path: "/student/notes",
  },
  {
    title: "AI Assistant",
    description:
      "Ask questions and study smarter.",
    icon: BrainCircuit,
    color:
      "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
    path: "/student/ai",
  },
  {
    title: "Announcements",
    description:
      "Stay updated with the latest university notices.",
    icon: Bell,
    color:
      "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
    path: "/student/announcements",
  },
];

function Workspace() {
  return (
    <section id="workspace">
      {/* Heading */}

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Your Workspace
        </h2>

        <p className="mt-2 text-gray-600 dark:text-slate-400">
          Everything you need is just one click away.
        </p>
      </div>

      {/* Workspace Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {workspaceItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.path}
              className="
                group
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-indigo-200
                hover:shadow-xl
                dark:border-slate-700
                dark:bg-slate-800
                dark:hover:border-indigo-500
              "
            >
              {/* Card Top */}

              <div className="flex items-center justify-between">
                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    ${item.color}
                  `}
                >
                  <Icon
                    size={28}
                    className="
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />
                </div>

                <ArrowRight
                  size={20}
                  className="
                    text-gray-400
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-indigo-600
                    dark:text-slate-500
                    dark:group-hover:text-indigo-400
                  "
                />
              </div>

              {/* Card Content */}

              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-slate-400">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Workspace;