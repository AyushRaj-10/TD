import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";
import { formatDateTime } from "../utils/formatDate";

export default function TodoCard({
  todo,
  onEdit,
  onDelete,
  onToggle,
  disabled = false,
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            disabled={disabled}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            aria-label={`Mark ${todo.title} as ${
              todo.completed ? "pending" : "completed"
            }`}
          />

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={`/todo?id=${todo._id}`}
                className="text-lg font-semibold tracking-tight text-slate-900 transition hover:text-sky-700"
              >
                {todo.title}
              </Link>

              <StatusBadge completed={todo.completed} />
            </div>

            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              {todo.description || "No description provided."}
            </p>

            <p className="text-xs text-slate-400">
              Created {formatDateTime(todo.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => onEdit(todo)}
            disabled={disabled}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(todo._id)}
            disabled={disabled}
            className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
