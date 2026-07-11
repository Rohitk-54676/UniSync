import {
  Search,
} from "lucide-react";

import type {
  NoteSortOption,
} from "../../../types/note.types";

interface NoteFiltersProps {
  searchQuery: string;
  activeSubject: string;
  sortOption: NoteSortOption;
  subjects: string[];
  onSearchChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onSortChange: (
    value: NoteSortOption
  ) => void;
}

function NoteFilters({
  searchQuery,
  activeSubject,
  sortOption,
  subjects,
  onSearchChange,
  onSubjectChange,
  onSortChange,
}: NoteFiltersProps) {
  return (
    <div className="mt-10 grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:grid-cols-[1fr_auto_auto]">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="search"
          value={searchQuery}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search title, content, subject or tags..."
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
        />
      </div>

      <select
        value={activeSubject}
        onChange={(event) =>
          onSubjectChange(event.target.value)
        }
        aria-label="Filter notes by subject"
        className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
      >
        <option value="all">
          All Subjects
        </option>

        {subjects.map((subject) => (
          <option
            key={subject}
            value={subject}
          >
            {subject}
          </option>
        ))}
      </select>

      <select
        value={sortOption}
        onChange={(event) =>
          onSortChange(
            event.target.value as NoteSortOption
          )
        }
        aria-label="Sort notes"
        className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
      >
        <option value="updated">
          Recently Updated
        </option>

        <option value="newest">
          Newest Created
        </option>

        <option value="oldest">
          Oldest Created
        </option>

        <option value="title">
          Title A-Z
        </option>
      </select>
    </div>
  );
}

export default NoteFilters;