const filters = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

export default function FilterButtons({ filter, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          aria-pressed={filter === item.value}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === item.value
              ? "bg-sky-600 text-white shadow-sm shadow-sky-200"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
