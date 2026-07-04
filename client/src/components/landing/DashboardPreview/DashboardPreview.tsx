import {
  CheckCircle2,
  Bell,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

function DashboardPreview() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Left */}

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
            Dashboard Preview
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Everything Organized In One Dashboard
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            UniSync keeps your attendance, assignments,
            timetable, reminders and announcements together
            so you never have to switch between multiple apps.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              <span>Track attendance & CGPA</span>
            </div>

            <div className="flex items-center gap-3">
              <ClipboardList className="text-indigo-600" />
              <span>Manage assignments with reminders</span>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="text-orange-500" />
              <span>View today's timetable instantly</span>
            </div>

            <div className="flex items-center gap-3">
              <Bell className="text-red-500" />
              <span>Receive smart notifications</span>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl transition duration-300 hover:scale-[1.02]">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-xl font-bold">
                Welcome Back 👋
              </h3>

              <p className="text-sm text-gray-500">
                Here's today's overview
              </p>
            </div>

            <div className="h-12 w-12 rounded-full bg-indigo-600"></div>

          </div>

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
                3
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

          <div className="mt-8 rounded-2xl bg-gray-50 p-5">

            <h4 className="font-semibold">
              Upcoming Tasks
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

      </div>
    </section>
  );
}

export default DashboardPreview;