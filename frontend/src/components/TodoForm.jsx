import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  description: "",
};

export default function TodoForm({
  onSubmit,
  initialValues = emptyForm,
  isEditing = false,
  isSubmitting = false,
  onCancel,
}) {
  const [form, setForm] = useState(initialValues);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setForm({
      title: initialValues.title ?? "",
      description: initialValues.description ?? "",
    });
    setValidationError("");
  }, [initialValues.description, initialValues.title]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = form.title.trim();
    const description = form.description.trim();

    if (!title) {
      setValidationError("Title cannot be empty.");
      return;
    }

    setValidationError("");

    const success = await onSubmit({
      title,
      description,
    });

    if (success) {
      setForm(emptyForm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {isEditing ? "Edit Todo" : "Add Todo"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep titles short, clear, and easy to scan.
          </p>
        </div>

        {isEditing && onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        ) : null}
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="todo-title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Title
          </label>

          <input
            id="todo-title"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Todo title"
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
            }
          />
        </div>

        <div>
          <label
            htmlFor="todo-description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="todo-description"
            rows="4"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            placeholder="Optional details"
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
          />
        </div>

        {validationError ? (
          <p className="text-sm font-medium text-rose-600">{validationError}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update Todo" : "Add Todo"}
        </button>
      </div>
    </form>
  );
}
