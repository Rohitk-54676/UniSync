import { useEffect, useRef, useState } from "react";

import {
  Search,
  Clock3,
  BookOpen,
  CalendarDays,
  ClipboardList,
  ArrowUpRight,
} from "lucide-react";

import useClickOutside from "../../../../hooks/useClickOutside";

const recentSearches = [
  {
    title: "Java Assignment",
    icon: ClipboardList,
  },
  {
    title: "DBMS Notes",
    icon: BookOpen,
  },
  {
    title: "Today's Timetable",
    icon: CalendarDays,
  },
];

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(searchRef, () => setIsOpen(false));

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        inputRef.current?.focus();

        setIsOpen(true);
      }
    }

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const filteredSearches = recentSearches.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      ref={searchRef}
      className="relative hidden lg:block"
    >
      <div
        className={`flex w-96 items-center rounded-2xl border bg-white px-4 transition-all duration-200 dark:bg-slate-800 ${
          isOpen
            ? "border-indigo-500 shadow-lg"
            : "border-gray-200 dark:border-slate-700"
        }`}
      >
        <Search
          size={18}
          className="text-gray-400 dark:text-slate-500"
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search anything..."
          className="w-full bg-transparent px-3 py-3 text-slate-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-slate-500"
        />

        <div className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
          Ctrl K
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-16 z-50 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800">
          <div className="border-b border-gray-200 p-4 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {query ? "Search Results" : "Recent Searches"}
            </h3>
          </div>

          <div className="p-2">
            {filteredSearches.length > 0 ? (
              filteredSearches.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl p-3 text-slate-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className="text-indigo-600 dark:text-indigo-400"
                      />

                      <span>{item.title}</span>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="text-gray-400 dark:text-slate-500"
                    />
                  </button>
                );
              })
            ) : (
              <p className="p-4 text-sm text-gray-500 dark:text-slate-400">
                No results found for "{query}".
              </p>
            )}
          </div>

          <div className="border-t border-gray-200 p-3 dark:border-slate-700">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
              <Clock3 size={16} />

              Search notes, assignments, events and more.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;