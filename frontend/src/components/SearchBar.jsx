export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <span className="text-slate-400" aria-hidden="true">
        Search
      </span>

      <input
        type="search"
        placeholder="Search by title or description"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        aria-label="Search todos"
      />

      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
