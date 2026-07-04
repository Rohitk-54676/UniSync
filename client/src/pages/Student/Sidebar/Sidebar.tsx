import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  CalendarDays,
  NotebookPen,
  Bell,
  BrainCircuit,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Attendance",
    path: "/student/attendance",
    icon: CalendarCheck,
  },
  {
    title: "Assignments",
    path: "/student/assignments",
    icon: ClipboardList,
  },
  {
    title: "Timetable",
    path: "/student/timetable",
    icon: CalendarDays,
  },
  {
    title: "Notes",
    path: "/student/notes",
    icon: NotebookPen,
  },
  {
    title: "Notifications",
    path: "/student/notifications",
    icon: Bell,
  },
  {
    title: "AI Assistant",
    path: "/student/ai",
    icon: BrainCircuit,
  },
  {
    title: "Settings",
    path: "/student/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">

      <div className="border-b p-6">

        <h1 className="text-3xl font-bold text-indigo-600">
          UniSync
        </h1>

      </div>

      <nav className="flex-1 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}

      </nav>

      <div className="border-t p-4">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-red-50 hover:text-red-600">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;