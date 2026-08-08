export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 px-6 py-16 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-3 text-sm text-slate-500">
        {description}
      </p>

      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
