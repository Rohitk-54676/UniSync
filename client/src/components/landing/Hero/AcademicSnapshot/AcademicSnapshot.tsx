import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function AcademicSnapshot() {
  return (
    <section>
      {/* Heading */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Academic Snapshot
          </h2>

          <p className="mt-2 text-gray-600">
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

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-xl font-bold">
              Today's Overview
            </h3>

            <p className="text-sm text-gray-500">
              Live academic summary
            </p>

          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
            R
          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-indigo-50 p-5">

            <p className="text-sm text-gray-500">
              Attendance
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              84%
            </h3>

          </div>

          <div className="rounded-2xl bg-green-50 p-5">

            <p className="text-sm text-gray-500">
              CGPA
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              8.42
            </h3>

          </div>

          <div className="rounded-2xl bg-orange-50 p-5">

            <p className="text-sm text-gray-500">
              Assignments
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              3 Pending
            </h3>

          </div>

          <div className="rounded-2xl bg-red-50 p-5">

            <p className="text-sm text-gray-500">
              Notifications
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              5
            </h3>

          </div>

        </div>

        {/* Deadlines */}

        <div className="mt-8 rounded-2xl bg-gray-50 p-5">

          <h4 className="font-semibold">
            Upcoming Deadlines
          </h4>

          <div className="mt-4 space-y-3">

            <div className="flex items-center justify-between">

              <span>Java Assignment</span>

              <span className="text-red-500">
                Tomorrow
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span>DBMS Quiz</span>

              <span className="text-orange-500">
                Friday
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span>OS Lab</span>

              <span className="text-green-600">
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