import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-sm font-bold text-white shadow-lg shadow-sky-200 transition group-hover:-translate-y-0.5">
            TD
          </span>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              Todo App
            </h1>
            <p className="text-sm text-slate-500">
              Simple CRUD practice project
            </p>
          </div>
        </Link>

        <Link
          to="/"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
        >
          Home
        </Link>
      </div>
    </nav>
  );
}
