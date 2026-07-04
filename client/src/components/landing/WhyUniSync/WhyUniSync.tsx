import {
  XCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

function WhyUniSync() {
  return (
    <section
      id="why-unisync"
      className="scroll-mt-16 bg-slate-50 py-24 transition-colors dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            Why UniSync?
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            Stop Managing University Life
            <br />
            Across Multiple Apps
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-slate-400">
            Students waste time switching between different apps for
            attendance, assignments, notes, reminders and announcements.
          </p>
        </div>

        {/* Comparison */}

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          {/* Before */}

          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 transition-colors dark:border-red-900/70 dark:bg-red-950/30">
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Before UniSync
            </h3>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <XCircle
                  size={22}
                  className="shrink-0 text-red-500 dark:text-red-400"
                />

                <span className="text-slate-700 dark:text-slate-300">
                  Separate Attendance App
                </span>
              </div>

              <div className="flex items-center gap-4">
                <XCircle
                  size={22}
                  className="shrink-0 text-red-500 dark:text-red-400"
                />

                <span className="text-slate-700 dark:text-slate-300">
                  Different Assignment Tracker
                </span>
              </div>

              <div className="flex items-center gap-4">
                <XCircle
                  size={22}
                  className="shrink-0 text-red-500 dark:text-red-400"
                />

                <span className="text-slate-700 dark:text-slate-300">
                  Reminder App
                </span>
              </div>

              <div className="flex items-center gap-4">
                <XCircle
                  size={22}
                  className="shrink-0 text-red-500 dark:text-red-400"
                />

                <span className="text-slate-700 dark:text-slate-300">
                  Notes Stored Everywhere
                </span>
              </div>

              <div className="flex items-center gap-4">
                <XCircle
                  size={22}
                  className="shrink-0 text-red-500 dark:text-red-400"
                />

                <span className="text-slate-700 dark:text-slate-300">
                  Missed Announcements
                </span>
              </div>
            </div>
          </div>

          {/* After */}

          <div className="rounded-3xl border border-green-200 bg-green-50 p-8 transition-colors dark:border-green-900/70 dark:bg-green-950/30">
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              With UniSync
            </h3>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <CheckCircle2
                  size={22}
                  className="shrink-0 text-green-600 dark:text-green-400"
                />

                <span className="text-slate-700 dark:text-slate-300">
                  Everything Inside One Dashboard
                </span>
              </div>

              <div className="flex items-center gap-4">
                <CheckCircle2
                  size={22}
                  className="shrink-0 text-green-600 dark:text-green-400"
                />

                <span className="text-slate-700 dark:text-slate-300">
                  Smart Assignment Management
                </span>
              </div>

              <div className="flex items-center gap-4">
                <CheckCircle2
                  size={22}
                  className="shrink-0 text-green-600 dark:text-green-400"
                />

                <span className="text-slate-700 dark:text-slate-300">
                  AI Study Assistant
                </span>
              </div>

              <div className="flex items-center gap-4">
                <CheckCircle2
                  size={22}
                  className="shrink-0 text-green-600 dark:text-green-400"
                />

                <span className="text-slate-700 dark:text-slate-300">
                  Automatic Reminders
                </span>
              </div>

              <div className="flex items-center gap-4">
                <CheckCircle2
                  size={22}
                  className="shrink-0 text-green-600 dark:text-green-400"
                />

                <span className="text-slate-700 dark:text-slate-300">
                  One Login. Everything Synced.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-20 flex flex-col items-center">
          <ArrowRight
            size={40}
            className="text-indigo-600 dark:text-indigo-400"
          />

          <h3 className="mt-6 text-center text-3xl font-bold text-slate-900 dark:text-white">
            Focus More on Learning.
            <br />
            Less on Managing.
          </h3>

          <p className="mt-5 max-w-xl text-center text-gray-600 dark:text-slate-400">
            UniSync combines every essential student tool into one modern
            platform so you can stay productive without switching between apps.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyUniSync;