const variants = {
  completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
};

export default function StatusBadge({ completed }) {
  const isCompleted = Boolean(completed);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        isCompleted ? variants.completed : variants.pending
      }`}
    >
      {isCompleted ? "Completed" : "Pending"}
    </span>
  );
}
