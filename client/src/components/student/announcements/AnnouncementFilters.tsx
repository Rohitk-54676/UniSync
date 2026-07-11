import { Search } from "lucide-react";

import {
  ANNOUNCEMENT_CATEGORIES,
} from "../../../constants/announcement.constants";

import type {
  AnnouncementSortOption,
} from "../../../types/announcements.types";

interface AnnouncementFiltersProps {
  searchQuery: string;
  activeCategory: string;
  sortOption: AnnouncementSortOption;
  showBookmarksOnly: boolean;
  showUnreadOnly: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (
    value: AnnouncementSortOption
  ) => void;
  onBookmarksChange: (value: boolean) => void;
  onUnreadChange: (value: boolean) => void;
}

function AnnouncementFilters({
  searchQuery,
  activeCategory,
  sortOption,
  showBookmarksOnly,
  showUnreadOnly,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onBookmarksChange,
  onUnreadChange,
}: AnnouncementFiltersProps) {
  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
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
            placeholder="Search announcements..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
          />
        </div>

        <select
          value={activeCategory}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
          aria-label="Filter announcement category"
          className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="all">
            All Categories
          </option>

          {ANNOUNCEMENT_CATEGORIES.map(
            (category) => (
              <option
                key={category.value}
                value={category.value}
              >
                {category.label}
              </option>
            )
          )}
        </select>

        <select
          value={sortOption}
          onChange={(event) =>
            onSortChange(
              event.target
                .value as AnnouncementSortOption
            )
          }
          aria-label="Sort announcements"
          className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="latest">
            Latest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="priority">
            Priority
          </option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() =>
            onUnreadChange(!showUnreadOnly)
          }
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
            showUnreadOnly
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-gray-300 text-slate-700 hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          Unread Only
        </button>

        <button
          type="button"
          onClick={() =>
            onBookmarksChange(
              !showBookmarksOnly
            )
          }
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
            showBookmarksOnly
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-gray-300 text-slate-700 hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          Bookmarked
        </button>
      </div>
    </div>
  );
}

export default AnnouncementFilters;