import { useMemo, useState } from "react";

import {
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  Clock3,
  Plus,
  TriangleAlert,
} from "lucide-react";

import AssignmentCard from "../../components/student/assignments/AssignmentCard";

import AssignmentFilters from "../../components/student/assignments/AssignmentFilters";

import AssignmentForm from "../../components/student/assignments/AssignmentForm";

import useAssignments from "../../hooks/useAssignments";

import type {
  AssignmentFilter,
  AssignmentFormData,
  AssignmentRecord,
} from "../../types/assignment.types";

import {
  isAssignmentOverdue,
} from "../../utils/assignment.utils";

function Assignments() {
  const {
    sortedAssignments,
    summary,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    toggleAssignmentComplete,
    changeAssignmentStatus,
  } = useAssignments();

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [editingAssignment, setEditingAssignment] =
    useState<AssignmentRecord | null>(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState<AssignmentFilter>("all");

  const filteredAssignments = useMemo(() => {
    const normalizedSearch =
      searchQuery.trim().toLowerCase();

    return sortedAssignments.filter(
      (assignment) => {
        const matchesSearch =
          !normalizedSearch ||
          assignment.title
            .toLowerCase()
            .includes(normalizedSearch) ||
          assignment.subject
            .toLowerCase()
            .includes(normalizedSearch) ||
          assignment.description
            .toLowerCase()
            .includes(normalizedSearch);

        if (!matchesSearch) {
          return false;
        }

        if (activeFilter === "all") {
          return true;
        }

        if (activeFilter === "overdue") {
          return isAssignmentOverdue(assignment);
        }

        return assignment.status === activeFilter;
      }
    );
  }, [
    sortedAssignments,
    searchQuery,
    activeFilter,
  ]);

  function openAddAssignmentForm() {
    setEditingAssignment(null);
    setIsFormOpen(true);
  }

  function openEditAssignmentForm(
    assignment: AssignmentRecord
  ) {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  }

  function closeAssignmentForm() {
    setIsFormOpen(false);
    setEditingAssignment(null);
  }

  function handleAssignmentSubmit(
    formData: AssignmentFormData
  ) {
    if (editingAssignment) {
      updateAssignment(
        editingAssignment.id,
        formData
      );
    } else {
      addAssignment(formData);
    }

    closeAssignmentForm();
  }

  function handleDeleteAssignment(id: string) {
    const assignment = sortedAssignments.find(
      (item) => item.id === id
    );

    if (!assignment) {
      return;
    }

    const shouldDelete = window.confirm(
      `Delete "${assignment.title}"?`
    );

    if (!shouldDelete) {
      return;
    }

    deleteAssignment(id);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      {/* Header */}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            <ClipboardList size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Assignments
            </h1>

            <p className="mt-1 text-gray-600 dark:text-slate-400">
              Manage tasks, deadlines and academic work.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openAddAssignmentForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <Plus size={20} />

          Add Assignment
        </button>
      </div>

      {/* Summary */}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <ClipboardList className="text-indigo-600 dark:text-indigo-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Total
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.total}
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveFilter("pending")
          }
          className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <CircleDashed className="text-slate-600 dark:text-slate-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Pending
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.pending}
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveFilter("in-progress")
          }
          className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <Clock3 className="text-indigo-600 dark:text-indigo-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            In Progress
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.inProgress}
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveFilter("completed")
          }
          className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <CheckCircle2 className="text-green-600 dark:text-green-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Completed
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.completed}
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveFilter("overdue")
          }
          className="rounded-2xl border border-red-200 bg-red-50 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-red-900 dark:bg-red-950/30"
        >
          <TriangleAlert className="text-red-600 dark:text-red-400" />

          <p className="mt-4 text-sm text-red-600 dark:text-red-400">
            Overdue
          </p>

          <p className="mt-1 text-3xl font-bold text-red-700 dark:text-red-300">
            {summary.overdue}
          </p>
        </button>
      </div>

      {/* Search and Filters */}

      <AssignmentFilters
        searchQuery={searchQuery}
        activeFilter={activeFilter}
        onSearchChange={setSearchQuery}
        onFilterChange={setActiveFilter}
      />

      {/* Assignment List */}

      {filteredAssignments.length === 0 ? (
        <div className="mt-8 flex min-h-[360px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            <ClipboardList size={32} />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            {sortedAssignments.length === 0
              ? "No assignments yet"
              : "No matching assignments"}
          </h2>

          <p className="mt-3 max-w-md leading-7 text-gray-600 dark:text-slate-400">
            {sortedAssignments.length === 0
              ? "Add your first assignment and UniSync will help you track its deadline and progress."
              : "Try changing the active filter or search query."}
          </p>

          {sortedAssignments.length === 0 && (
            <button
              type="button"
              onClick={openAddAssignmentForm}
              className="mt-7 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500"
            >
              <Plus size={19} />

              Add Your First Assignment
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filteredAssignments.map(
            (assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onEdit={openEditAssignmentForm}
                onDelete={handleDeleteAssignment}
                onToggleComplete={
                  toggleAssignmentComplete
                }
                onStatusChange={
                  changeAssignmentStatus
                }
              />
            )
          )}
        </div>
      )}

      {/* Form */}

      {isFormOpen && (
        <AssignmentForm
          assignment={editingAssignment}
          onSubmit={handleAssignmentSubmit}
          onCancel={closeAssignmentForm}
        />
      )}
    </main>
  );
}

export default Assignments;