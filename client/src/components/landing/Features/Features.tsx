import {
  LayoutDashboard,
  ClipboardList,
  BrainCircuit,
  CalendarDays,
  Bell,
  Cloud,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";

const features = [
  {
    title: "Personal Dashboard",
    description:
      "Track attendance, CGPA, assignments and important academic updates in one place.",
    icon: LayoutDashboard,
  },
  {
    title: "Assignment Manager",
    description:
      "Manage assignments, set priorities and receive deadline reminders.",
    icon: ClipboardList,
  },
  {
    title: "AI Study Assistant",
    description:
      "Summarize notes, explain concepts and generate personalized study plans.",
    icon: BrainCircuit,
  },
  {
    title: "Smart Timetable",
    description:
      "Organize your weekly classes with automatic reminders.",
    icon: CalendarDays,
  },
  {
    title: "Smart Notifications",
    description:
      "Receive reminders for assignments, exams and university announcements.",
    icon: Bell,
  },
  {
    title: "Cloud Sync",
    description:
      "Access your data securely from any device after signing in.",
    icon: Cloud,
  },
];

function Features() {
  const navigate = useNavigate();

  return (
    <section
      id="features"
      className="bg-slate-50 py-24 transition-colors dark:bg-slate-900"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            Student Exclusive Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            Unlock More After Login
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-slate-400">
            Create your free account and access powerful tools designed
            to make your university life easier and more organized.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-indigo-500
                  hover:shadow-xl
                  dark:border-slate-700
                  dark:bg-slate-800
                "
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-950">

                  <Icon
                    size={28}
                    className="text-indigo-600 dark:text-indigo-400"
                  />

                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600 dark:text-slate-400">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* CTA */}

        <div className="mt-20 text-center">

          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Ready to unlock everything?
          </h3>

          <p className="mt-3 text-gray-600 dark:text-slate-400">
            Join UniSync today and organize your entire academic journey.
          </p>

          <div className="mt-8 flex justify-center">

            <Button
              onClick={() => navigate("/register")}
            >
              Create Free Account
            </Button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Features;