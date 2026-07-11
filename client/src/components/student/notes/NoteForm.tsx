import {
  useEffect,
  useState,
} from "react";

import {
  BookOpen,
  FileText,
  Tags,
  X,
} from "lucide-react";

import type {
  NoteFormData,
  NoteRecord,
} from "../../../types/note.types";

interface NoteFormProps {
  note?: NoteRecord | null;
  onSubmit: (formData: NoteFormData) => void;
  onCancel: () => void;
}

const initialFormData: NoteFormData = {
  title: "",
  subject: "",
  content: "",
  tags: [],
};

function NoteForm({
  note,
  onSubmit,
  onCancel,
}: NoteFormProps) {
  const [formData, setFormData] =
    useState<NoteFormData>(initialFormData);

  const [tagsInput, setTagsInput] =
    useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        subject: note.subject,
        content: note.content,
        tags: note.tags,
      });

      setTagsInput(note.tags.join(", "));

      return;
    }

    setFormData(initialFormData);
    setTagsInput("");
  }, [note]);

  function updateField<
    T extends keyof NoteFormData
  >(field: T, value: NoteFormData[T]) {
    setError("");

    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Note title is required.");
      return;
    }

    if (!formData.subject.trim()) {
      setError("Subject is required.");
      return;
    }

    if (!formData.content.trim()) {
      setError("Note content is required.");
      return;
    }

    const normalizedTags = Array.from(
      new Set(
        tagsInput
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      )
    );

    onSubmit({
      title: formData.title.trim(),
      subject: formData.subject.trim(),
      content: formData.content.trim(),
      tags: normalizedTags,
    });
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onCancel();
        }
      }}
    >
      <div className="w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {note ? "Edit Note" : "Create Note"}
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
              Organize your study material by
              subject and tags.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close note form"
            className="rounded-xl p-2 text-slate-500 transition hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <X size={21} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="note-title"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Note Title
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="note-title"
                type="text"
                value={formData.title}
                onChange={(event) =>
                  updateField(
                    "title",
                    event.target.value
                  )
                }
                placeholder="Example: Java Collections"
                autoFocus
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="note-subject"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Subject
            </label>

            <div className="relative">
              <BookOpen
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="note-subject"
                type="text"
                value={formData.subject}
                onChange={(event) =>
                  updateField(
                    "subject",
                    event.target.value
                  )
                }
                placeholder="Example: Java Programming"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="note-content"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Content
            </label>

            <textarea
              id="note-content"
              rows={12}
              value={formData.content}
              onChange={(event) =>
                updateField(
                  "content",
                  event.target.value
                )
              }
              placeholder="Write your study notes here..."
              className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 leading-7 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="note-tags"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Tags
            </label>

            <div className="relative">
              <Tags
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="note-tags"
                type="text"
                value={tagsInput}
                onChange={(event) => {
                  setError("");
                  setTagsInput(event.target.value);
                }}
                placeholder="java, collections, exam"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
              />
            </div>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Separate tags using commas.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {note ? "Save Changes" : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;