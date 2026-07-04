import {
  Smartphone,
  Bot,
  Store,
  Briefcase,
  ShieldCheck,
  Cloud,
} from "lucide-react";

const roadmap = [
  {
    icon: Smartphone,
    title: "Android & iOS App",
    description:
      "Access UniSync anytime with our upcoming mobile application.",
  },
  {
    icon: Bot,
    title: "AI Timetable Generator",
    description:
      "Generate personalized study schedules based on your classes and goals.",
  },
  {
    icon: Store,
    title: "Campus Marketplace",
    description:
      "Buy, sell and exchange books, gadgets and study materials.",
  },
  {
    icon: Briefcase,
    title: "Placement Tracker",
    description:
      "Track placement drives, internships and application deadlines.",
  },
  {
    icon: ShieldCheck,
    title: "Smart Attendance Prediction",
    description:
      "Predict attendance shortages before they become a problem.",
  },
  {
    icon: Cloud,
    title: "Cloud Backup & Sync",
    description:
      "Synchronize your academic data across all your devices.",
  },
];

function Roadmap() {
  return (
    <section className="bg-white py-24 transition-colors dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            Coming Soon
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            The Future of UniSync
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-slate-400">
            UniSync is continuously evolving. Here's a glimpse of what's planned
            for future releases.
          </p>
        </div>

        {/* Roadmap Cards */}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
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
                  dark:hover:border-indigo-500
                "
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 transition-colors dark:bg-indigo-950">
                  <Icon
                    size={28}
                    className="text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400"
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Roadmap;