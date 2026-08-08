import { useCallback, useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";
import TodoCard from "../components/TodoCard";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/todoApi";
import { getApiErrorMessage } from "../utils/apiError";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [busyTodoId, setBusyTodoId] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTodos();

      setTodos(response.data.todos);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Failed to load todos."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    if (!notice) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setNotice("");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const initialFormValues = useMemo(
    () => ({
      title: editingTodo?.title ?? "",
      description: editingTodo?.description ?? "",
    }),
    [editingTodo]
  );

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );

  const pendingCount = todos.length - completedCount;

  const filteredTodos = useMemo(() => {
    const term = search.trim().toLowerCase();

    return todos.filter((todo) => {
      const title = todo.title?.toLowerCase() ?? "";
      const description = todo.description?.toLowerCase() ?? "";

      const matchesSearch =
        term.length === 0 ||
        title.includes(term) ||
        description.includes(term);

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && todo.completed) ||
        (filter === "pending" && !todo.completed);

      return matchesSearch && matchesFilter;
    });
  }, [todos, search, filter]);

  const resetEditor = useCallback(() => {
    setEditingTodo(null);
  }, []);

  const addOrUpdateTodo = useCallback(
    async (data) => {
      setSubmitting(true);
      setError("");

      try {
        if (editingTodo) {
          const response = await updateTodo(editingTodo._id, data);
          const updatedTodo = response.data.todo;

          setTodos((currentTodos) =>
            currentTodos.map((todo) =>
              todo._id === updatedTodo._id ? updatedTodo : todo
            )
          );
          setEditingTodo(null);
          setNotice("Todo updated successfully.");
        } else {
          const response = await createTodo(data);

          setTodos((currentTodos) => [response.data.todo, ...currentTodos]);
          setNotice("Todo created successfully.");
        }

        return true;
      } catch (requestError) {
        setError(
          getApiErrorMessage(
            requestError,
            editingTodo ? "Failed to update todo." : "Failed to create todo."
          )
        );
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [editingTodo]
  );

  const removeTodo = useCallback(
    async (id) => {
      const todoToDelete = todos.find((todo) => todo._id === id);

      if (
        !window.confirm(
          `Delete "${todoToDelete?.title ?? "this todo"}"? This cannot be undone.`
        )
      ) {
        return;
      }

      setBusyTodoId(id);
      setError("");

      try {
        await deleteTodo(id);

        setTodos((currentTodos) =>
          currentTodos.filter((todo) => todo._id !== id)
        );

        if (editingTodo?._id === id) {
          setEditingTodo(null);
        }

        setNotice("Todo deleted successfully.");
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, "Failed to delete todo."));
      } finally {
        setBusyTodoId("");
      }
    },
    [todos, editingTodo]
  );

  const toggleTodo = useCallback(
    async (todo) => {
      setBusyTodoId(todo._id);
      setError("");

      try {
        const response = await updateTodo(todo._id, {
          completed: !todo.completed,
        });

        const updatedTodo = response.data.todo;

        setTodos((currentTodos) =>
          currentTodos.map((item) =>
            item._id === updatedTodo._id ? updatedTodo : item
          )
        );

        if (editingTodo?._id === updatedTodo._id) {
          setEditingTodo(updatedTodo);
        }

        setNotice(
          updatedTodo.completed
            ? "Todo marked as completed."
            : "Todo marked as pending."
        );
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, "Failed to update todo status."));
      } finally {
        setBusyTodoId("");
      }
    },
    [editingTodo]
  );

  const handleEdit = useCallback((todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const clearFilters = useCallback(() => {
    setSearch("");
    setFilter("all");
  }, []);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Todo dashboard
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Manage your tasks with a simple, polished CRUD flow.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Add, edit, complete, search, and filter todos without making the
                app feel heavier than it needs to be.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:min-w-[320px]">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {todos.length}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Done
                </p>
                <p className="mt-1 text-2xl font-semibold text-emerald-700">
                  {completedCount}
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-amber-700">
                  Pending
                </p>
                <p className="mt-1 text-2xl font-semibold text-amber-700">
                  {pendingCount}
                </p>
              </div>
            </div>
          </div>
        </section>

        {error ? (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        {notice ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {notice}
          </div>
        ) : null}

        <TodoForm
          onSubmit={addOrUpdateTodo}
          initialValues={initialFormValues}
          isEditing={Boolean(editingTodo)}
          isSubmitting={submitting}
          onCancel={editingTodo ? resetEditor : undefined}
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
          <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch("")}
          />

          <div className="flex items-center">
            <FilterButtons filter={filter} onChange={setFilter} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredTodos.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">{todos.length}</span>{" "}
            todos
          </p>

          {(search || filter !== "all") ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-sky-700 transition hover:text-sky-800"
            >
              Reset filters
            </button>
          ) : null}
        </div>

        <section className="mt-6">
          {loading ? (
            <Loader label="Loading todos..." />
          ) : filteredTodos.length === 0 ? (
            <EmptyState
              title="No todos found"
              description={
                search || filter !== "all"
                  ? "Try a different search term or reset the filters."
                  : "Create your first todo to get started."
              }
              actionLabel={search || filter !== "all" ? "Reset filters" : undefined}
              onAction={search || filter !== "all" ? clearFilters : undefined}
            />
          ) : (
            <div className="space-y-4">
              {filteredTodos.map((todo) => (
                <TodoCard
                  key={todo._id}
                  todo={todo}
                  onEdit={handleEdit}
                  onDelete={removeTodo}
                  onToggle={toggleTodo}
                  disabled={busyTodoId === todo._id || submitting}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
