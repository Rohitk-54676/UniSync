import {
  CalendarCheck,
  GraduationCap,
  ClipboardList,
  Bell,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Attendance",
      value: "84%",
      icon: CalendarCheck,
    },
    {
      title: "CGPA",
      value: "8.42",
      icon: GraduationCap,
    },
    {
      title: "Assignments",
      value: "3",
      icon: ClipboardList,
    },
    {
      title: "Notifications",
      value: "5",
      icon: Bell,
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome */}

      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-gray-600">
          Here's what's happening today.
        </p>
      </div>

      {/* Stats */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h2>

                </div>

                <div className="rounded-xl bg-indigo-100 p-3">

                  <Icon
                    className="text-indigo-600"
                    size={24}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Bottom Grid */}

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Upcoming Assignments */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold">
            Upcoming Assignments
          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between">
              <span>Java Project</span>
              <span className="text-red-500">
                Tomorrow
              </span>
            </div>

            <div className="flex justify-between">
              <span>DBMS Lab</span>
              <span className="text-orange-500">
                Friday
              </span>
            </div>

            <div className="flex justify-between">
              <span>OS Report</span>
              <span className="text-green-600">
                Monday
              </span>
            </div>

          </div>

        </div>

        {/* Announcements */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold">
            Latest Announcements
          </h2>

          <div className="mt-6 space-y-5">

            <div>
              <h3 className="font-medium">
                Mid Semester Exams
              </h3>

              <p className="text-gray-600">
                Exam schedule will be released next week.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                Coding Competition
              </h3>

              <p className="text-gray-600">
                Registration is now open.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                Holiday Notice
              </h3>

              <p className="text-gray-600">
                University will remain closed on Monday.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;