import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function AcademicSnapshot() {
  return (
    <section>
      {/* Heading */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Academic Snapshot
          </h2>

          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Your academic overview at a glance.
          </p>
        </div>

        <Link
          to="/student/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          View Full Dashboard

          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Dashboard Card */}

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl transition-colors dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Today's Overview
            </h3>

            <p className="text-sm text-gray-500 dark:text-slate-400">
              Live academic summary
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
            R
          </div>
        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-indigo-50 p-5 transition-colors dark:bg-indigo-950/50">
            <p className="text-sm text-gray-500 dark:text-indigo-300">
              Attendance
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              84%
            </h3>
          </div>

          <div className="rounded-2xl bg-green-50 p-5 transition-colors dark:bg-green-950/50">
            <p className="text-sm text-gray-500 dark:text-green-300">
              CGPA
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              8.42
            </h3>
          </div>

          <div className="rounded-2xl bg-orange-50 p-5 transition-colors dark:bg-orange-950/50">
            <p className="text-sm text-gray-500 dark:text-orange-300">
              Assignments
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              3 Pending
            </h3>
          </div>

          <div className="rounded-2xl bg-red-50 p-5 transition-colors dark:bg-red-950/50">
            <p className="text-sm text-gray-500 dark:text-red-300">
              Notifications
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              5
            </h3>
          </div>
        </div>

        {/* Deadlines */}

        <div className="mt-8 rounded-2xl bg-gray-50 p-5 transition-colors dark:bg-slate-900">
          <h4 className="font-semibold text-slate-900 dark:text-white">
            Upcoming Deadlines
          </h4>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">
                Java Assignment
              </span>

              <span className="text-red-500 dark:text-red-400">
                Tomorrow
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">
                DBMS Quiz
              </span>

              <span className="text-orange-500 dark:text-orange-400">
                Friday
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">
                OS Lab
              </span>

              <span className="text-green-600 dark:text-green-400">
                Monday
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcademicSnapshot;