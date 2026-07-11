import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  NoteFormData,
  NoteRecord,
} from "../types/note.types";

import {
  getNoteSummary,
  getUniqueNoteSubjects,
} from "../utils/note.utils";

const STORAGE_KEY = "unisync-student-notes";

function getStoredNotes(): NoteRecord[] {
  try {
    const storedNotes =
      localStorage.getItem(STORAGE_KEY);

    if (!storedNotes) {
      return [];
    }

    const parsedNotes = JSON.parse(storedNotes);

    if (!Array.isArray(parsedNotes)) {
      return [];
    }

    return parsedNotes;
  } catch {
    return [];
  }
}

function useNotes() {
  const [notes, setNotes] = useState<
    NoteRecord[]
  >(getStoredNotes);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(notes)
    );
  }, [notes]);

  const summary = useMemo(
    () => getNoteSummary(notes),
    [notes]
  );

  const subjects = useMemo(
    () => getUniqueNoteSubjects(notes),
    [notes]
  );

  function addNote(formData: NoteFormData) {
    const currentTime =
      new Date().toISOString();

    const newNote: NoteRecord = {
      id: crypto.randomUUID(),
      ...formData,
      isPinned: false,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    setNotes((currentNotes) => [
      ...currentNotes,
      newNote,
    ]);
  }

  function updateNote(
    id: string,
    formData: NoteFormData
  ) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...formData,
              updatedAt:
                new Date().toISOString(),
            }
          : note
      )
    );
  }

  function deleteNote(id: string) {
    setNotes((currentNotes) =>
      currentNotes.filter(
        (note) => note.id !== id
      )
    );
  }

  function togglePinNote(id: string) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              isPinned: !note.isPinned,
              updatedAt:
                new Date().toISOString(),
            }
          : note
      )
    );
  }

  return {
    notes,
    summary,
    subjects,
    addNote,
    updateNote,
    deleteNote,
    togglePinNote,
  };
}

export default useNotes;