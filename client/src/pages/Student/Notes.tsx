import {
  useMemo,
  useState,
} from "react";

import {
  BookOpen,
  FolderOpen,
  NotebookPen,
  Pin,
  Plus,
  Tags,
} from "lucide-react";

import NoteCard from "../../components/student/notes/NoteCard";

import NoteFilters from "../../components/student/notes/NoteFilters";

import NoteForm from "../../components/student/notes/NoteForm";

import NoteViewer from "../../components/student/notes/NoteViewer";

import useNotes from "../../hooks/useNotes";

import type {
  NoteFormData,
  NoteRecord,
  NoteSortOption,
} from "../../types/note.types";

import {
  sortNotes,
} from "../../utils/note.utils";

function Notes() {
  const {
    notes,
    summary,
    subjects,
    addNote,
    updateNote,
    deleteNote,
    togglePinNote,
  } = useNotes();

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [editingNote, setEditingNote] =
    useState<NoteRecord | null>(null);

  const [viewingNoteId, setViewingNoteId] =
    useState<string | null>(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeSubject, setActiveSubject] =
    useState("all");

  const [sortOption, setSortOption] =
    useState<NoteSortOption>("updated");

  const viewingNote = useMemo(
    () =>
      notes.find(
        (note) => note.id === viewingNoteId
      ) ?? null,
    [notes, viewingNoteId]
  );

  const filteredNotes = useMemo(() => {
    const normalizedSearch =
      searchQuery.trim().toLowerCase();

    const matchingNotes = notes.filter(
      (note) => {
        const matchesSubject =
          activeSubject === "all" ||
          note.subject === activeSubject;

        if (!matchesSubject) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        const searchableText = [
          note.title,
          note.subject,
          note.content,
          ...note.tags,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(
          normalizedSearch
        );
      }
    );

    return sortNotes(
      matchingNotes,
      sortOption
    );
  }, [
    notes,
    searchQuery,
    activeSubject,
    sortOption,
  ]);

  function openCreateNoteForm() {
    setEditingNote(null);
    setIsFormOpen(true);
  }

  function openEditNoteForm(note: NoteRecord) {
    setViewingNoteId(null);
    setEditingNote(note);
    setIsFormOpen(true);
  }

  function closeNoteForm() {
    setIsFormOpen(false);
    setEditingNote(null);
  }

  function handleNoteSubmit(
    formData: NoteFormData
  ) {
    if (editingNote) {
      updateNote(editingNote.id, formData);
    } else {
      addNote(formData);
    }

    closeNoteForm();
  }

  function handleDeleteNote(id: string) {
    const note = notes.find(
      (item) => item.id === id
    );

    if (!note) {
      return;
    }

    const shouldDelete = window.confirm(
      `Delete "${note.title}"?`
    );

    if (!shouldDelete) {
      return;
    }

    if (viewingNoteId === id) {
      setViewingNoteId(null);
    }

    deleteNote(id);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      {/* Header */}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
            <NotebookPen size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Notes
            </h1>

            <p className="mt-1 text-gray-600 dark:text-slate-400">
              Organize your study notes by subject
              and topic.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openCreateNoteForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <Plus size={20} />

          Create Note
        </button>
      </div>

      {/* Summary */}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <NotebookPen className="text-purple-600 dark:text-purple-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Total Notes
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.totalNotes}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <FolderOpen className="text-indigo-600 dark:text-indigo-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Subjects
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.totalSubjects}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Pin className="text-amber-600 dark:text-amber-400" />

          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
            Pinned Notes
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {summary.pinnedNotes}
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-600 p-5 text-white shadow-lg shadow-indigo-600/20 dark:bg-indigo-500">
          <Tags />

          <p className="mt-4 text-sm text-indigo-100">
            Unique Tags
          </p>

          <p className="mt-1 text-3xl font-bold">
            {summary.totalTags}
          </p>
        </div>
      </div>

      {/* Filters */}

      <NoteFilters
        searchQuery={searchQuery}
        activeSubject={activeSubject}
        sortOption={sortOption}
        subjects={subjects}
        onSearchChange={setSearchQuery}
        onSubjectChange={setActiveSubject}
        onSortChange={setSortOption}
      />

      {/* Notes */}

      {filteredNotes.length === 0 ? (
        <div className="mt-8 flex min-h-[380px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-800">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
            <BookOpen size={32} />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            {notes.length === 0
              ? "No notes yet"
              : "No matching notes"}
          </h2>

          <p className="mt-3 max-w-md leading-7 text-gray-600 dark:text-slate-400">
            {notes.length === 0
              ? "Create your first study note and keep important concepts organized inside UniSync."
              : "Try changing your search, subject filter or sorting option."}
          </p>

          {notes.length === 0 && (
            <button
              type="button"
              onClick={openCreateNoteForm}
              className="mt-7 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500"
            >
              <Plus size={19} />

              Create Your First Note
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onOpen={(selectedNote) =>
                setViewingNoteId(selectedNote.id)
              }
              onEdit={openEditNoteForm}
              onDelete={handleDeleteNote}
              onTogglePin={togglePinNote}
            />
          ))}
        </div>
      )}

      {/* Viewer */}

      {viewingNote && (
        <NoteViewer
          note={viewingNote}
          onClose={() => setViewingNoteId(null)}
          onEdit={openEditNoteForm}
          onTogglePin={togglePinNote}
        />
      )}

      {/* Form */}

      {isFormOpen && (
        <NoteForm
          note={editingNote}
          onSubmit={handleNoteSubmit}
          onCancel={closeNoteForm}
        />
      )}
    </main>
  );
}

export default Notes;