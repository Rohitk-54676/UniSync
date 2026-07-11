import { useNavigate } from "react-router-dom";

import {
  GraduationCap,
  CalendarCheck,
  CalendarDays,
  MapPinned,
  Bell,
  Bot,
} from "lucide-react";

import ToolCard from "../../ui/ToolCard/ToolCard";

const tools = [
  {
    title: "CGPA Calculator",
    description:
      "Calculate your semester and overall CGPA instantly.",
    icon: GraduationCap,
    path: "/tools/cgpa",
  },
  {
    title: "Attendance Tracker",
    description:
      "Track your attendance and predict future percentage.",
    icon: CalendarCheck,
    path: "/tools/attendance",
  },
  {
    title: "Campus Events",
    description:
      "Explore upcoming university events and workshops.",
    icon: CalendarDays,
    path: "",
  },
  {
    title: "Campus Map",
    description:
      "Navigate your campus easily with an interactive map.",
    icon: MapPinned,
    path: "",
  },
  {
    title: "Announcements",
    description:
      "Stay updated with university notices and news.",
    icon: Bell,
    path: "",
  },
  {
    title: "AI Study Assistant",
    description:
      "Ask questions and get AI-powered study help.",
    icon: Bot,
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
    <section
      id="quick-tools"
      className="scroll-mt-16 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Quick Tools
          </h2>

          <p className="mt-4 text-gray-600 dark:text-slate-400">
            Try these tools without creating an account.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              onClick={() =>
                handleToolClick(tool.path)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickTools;