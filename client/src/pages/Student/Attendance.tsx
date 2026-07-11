import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  CalendarCheck,
  Plus,
  BookOpen,
  CheckCircle2,
  BarChart3,
  Calculator,
} from "lucide-react";

import AttendanceSubjectCard from "../../components/student/attendance/AttendanceSubjectCard";

import AttendanceSubjectForm from "../../components/student/attendance/AttendanceSubjectForm";

import useStudentAttendance from "../../hooks/useStudentAttendance";

import type {
  AttendanceSubjectFormData,
  AttendanceSubjectRecord,
} from "../../types/studentAttendence.types";

function Attendance() {
  const navigate = useNavigate();

  const {
    subjects,
    overallAttendance,
    addSubject,
    updateSubject,
    deleteSubject,
    markPresent,
    markAbsent,
  } = useStudentAttendance();

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [editingSubject, setEditingSubject] =
    useState<AttendanceSubjectRecord | null>(null);

  function openAddSubjectForm() {
    setEditingSubject(null);

    setIsFormOpen(true);
  }

  function openEditSubjectForm(
    subject: AttendanceSubjectRecord
  ) {
    setEditingSubject(subject);

    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);

    setEditingSubject(null);
  }

  function handleFormSubmit(
    formData: AttendanceSubjectFormData
  ) {
    if (editingSubject) {
      updateSubject(
        editingSubject.id,
        formData
      );
    } else {
      addSubject(formData);
    }

    closeForm();
  }

  function handleDeleteSubject(id: string) {
    const subject = subjects.find(
      (item) => item.id === id
    );

    if (!subject) {
      return;
    }

    const shouldDelete = window.confirm(
      `Delete ${subject.subjectName}?`
    );

    if (!shouldDelete) {
      return;
    }

    deleteSubject(id);
  }

  function openAttendanceCalculator() {
    navigate("/student/tools/attendance");
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            <CalendarCheck size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              My Attendance
            </h1>

            <p className="mt-1 text-gray-600 dark:text-slate-400">
              Track attendance for every subject.
            </p>
          </div>
        </div>

        {/* Header Actions */}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openAttendanceCalculator}
            className="flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 font-medium text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-950/70"
          >
            <Calculator size={20} />

            Calculate Attendance
          </button>

          <button
            type="button"
            onClick={openAddSubjectForm}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <Plus size={20} />

            Add Subject
          </button>
        </div>
      </div>

      {/* Overview */}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <BookOpen className="text-indigo-600 dark:text-indigo-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Subjects
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {subjects.length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <CheckCircle2 className="text-green-600 dark:text-green-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Classes Attended
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {overallAttendance.totalAttended}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <CalendarCheck className="text-amber-600 dark:text-amber-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Total Classes
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {overallAttendance.totalClasses}
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-600 p-5 text-white shadow-lg shadow-indigo-600/20 dark:bg-indigo-500">
          <BarChart3 />

          <p className="mt-4 text-sm text-indigo-100">
            Overall Attendance
          </p>

          <p className="mt-1 text-3xl font-bold">
            {overallAttendance.percentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Subjects */}

      {subjects.length === 0 ? (
        <div className="mt-10 flex min-h-[380px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            <CalendarCheck size={32} />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            No subjects added yet
          </h2>

          <p className="mt-3 max-w-md leading-7 text-gray-600 dark:text-slate-400">
            Add your subjects and current attendance to start
            tracking classes.
          </p>

          <button
            type="button"
            onClick={openAddSubjectForm}
            className="mt-7 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500"
          >
            <Plus size={19} />

            Add Your First Subject
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {subjects.map((subject) => (
            <AttendanceSubjectCard
              key={subject.id}
              subject={subject}
              onPresent={markPresent}
              onAbsent={markAbsent}
              onEdit={openEditSubjectForm}
              onDelete={handleDeleteSubject}
            />
          ))}
        </div>
      )}

      {/* Subject Form */}

      {isFormOpen && (
        <AttendanceSubjectForm
          subject={editingSubject}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
        />
      )}
    </main>
  );
}

export default Attendance;