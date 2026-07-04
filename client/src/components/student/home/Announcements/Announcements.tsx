function Announcements() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
        Latest Announcements
      </h2>

      <div className="space-y-5">
        <div className="rounded-xl p-3 transition hover:bg-gray-50 dark:hover:bg-slate-700/60">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Mid Semester Exams
          </h3>

          <p className="mt-1 text-gray-500 dark:text-slate-400">
            Schedule will be released next week.
          </p>
        </div>

        <div className="rounded-xl p-3 transition hover:bg-gray-50 dark:hover:bg-slate-700/60">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Coding Competition
          </h3>

          <p className="mt-1 text-gray-500 dark:text-slate-400">
            Registration is now open.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Announcements;