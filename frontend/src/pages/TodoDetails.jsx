import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import { getTodo } from "../api/todoApi";
import { getApiErrorMessage } from "../utils/apiError";
import { formatDateTime } from "../utils/formatDate";

export default function TodoDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchTodo = async () => {
      if (!id) {
        if (isMounted) {
          setError("Missing todo id.");
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getTodo(id);

        if (isMounted) {
          setTodo(response.data.todo);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            getApiErrorMessage(
              requestError,
              "Unable to load this todo right now."
            )
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTodo();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <Loader label="Loading todo details..." />
        ) : error ? (
          <EmptyState
            title="Todo not available"
            description={error}
            actionLabel="Back to todos"
            onAction={() => navigate("/")}
          />
        ) : todo ? (
          <article className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                    {todo.title}
                  </h2>

                  <StatusBadge completed={todo.completed} />
                </div>

                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  {todo.description || "No description provided."}
                </p>
              </div>

              <Link
                to="/"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
              >
                Back
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Created
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {formatDateTime(todo.createdAt)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Updated
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {formatDateTime(todo.updatedAt)}
                </p>
              </div>
            </div>
          </article>
        ) : (
          <EmptyState
            title="Todo not found"
            description="This todo may have been deleted."
            actionLabel="Back to todos"
            onAction={() => navigate("/")}
          />
        )}
      </main>
    </>
  );
}
