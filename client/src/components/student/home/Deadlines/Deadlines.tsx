function Deadlines() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
        Upcoming Deadlines
      </h2>

      <ul className="space-y-3 text-slate-700 dark:text-slate-300">
        <li className="rounded-xl p-3 transition hover:bg-gray-50 dark:hover:bg-slate-700/60">
          Java Project - Tomorrow
        </li>

        <li className="rounded-xl p-3 transition hover:bg-gray-50 dark:hover:bg-slate-700/60">
          DBMS Lab - Friday
        </li>

        <li className="rounded-xl p-3 transition hover:bg-gray-50 dark:hover:bg-slate-700/60">
          OS Report - Monday
        </li>
      </ul>
    </section>
  );
}

export default Deadlines;