import { Search } from "lucide-react";

import type {
  AssignmentFilter,
} from "../../../types/assignment.types";

interface AssignmentFiltersProps {
  searchQuery: string;
  activeFilter: AssignmentFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (
    filter: AssignmentFilter
  ) => void;
}

const filters: {
  label: string;
  value: AssignmentFilter;
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "In Progress",
    value: "in-progress",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Overdue",
    value: "overdue",
  },
];

function AssignmentFilters({
  searchQuery,
  activeFilter,
  onSearchChange,
  onFilterChange,
}: AssignmentFiltersProps) {
  return (
    <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-sm">
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
          placeholder="Search assignments..."
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() =>
              onFilterChange(filter.value)
            }
            className={`
              shrink-0
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-medium
              transition
              ${
                activeFilter === filter.value
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AssignmentFilters;