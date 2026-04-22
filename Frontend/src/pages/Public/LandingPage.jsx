import { Link } from "react-router-dom";
import { useTheme } from "../../context/useTheme";

function LandingPage() {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "%23e2e8f0" : "%230f172a";

  return (
    <>
      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center pt-6 md:pt-12">
        <div className="max-w-md">
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-slate-600 dark:text-slate-300">
            TeamTrack
          </p>
          <h1 className="mb-5 max-w-sm text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-slate-100">
            Role-based task management
          </h1>
          <p className="max-w-sm text-base leading-8 text-slate-600 md:text-lg dark:text-slate-300">
            A secure workspace for admins and employees to manage groups, tasks,
            and access with clear role-based control.
          </p>
        </div>

        <div className="hidden lg:flex justify-end pb-8">
          <div className="relative flex min-h-[320px] w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-[0_10px_34px_rgba(2,6,23,0.55)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(59,130,246,0.14),transparent_35%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.16),transparent_36%)] dark:bg-[radial-gradient(circle_at_35%_30%,rgba(96,165,250,0.18),transparent_36%),radial-gradient(circle_at_70%_70%,rgba(45,212,191,0.18),transparent_38%)]" />
            <img
              src={`https://api.iconify.design/tabler:clipboard-check.svg?color=${iconColor}`}
              alt="Task management illustration"
              className="relative h-44 w-44 drop-shadow-[0_18px_24px_rgba(15,23,42,0.18)] dark:drop-shadow-[0_18px_24px_rgba(2,6,23,0.52)]"
            />
            <div className="absolute left-8 top-8 rounded-full bg-slate-900 px-3 py-1 text-[11px] tracking-[0.2em] text-white dark:bg-blue-700 dark:text-blue-50">
              Secure
            </div>
            <div className="absolute right-8 bottom-8 rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-[11px] tracking-[0.2em] text-slate-700 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300">
              Team Ready
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex justify-end pb-2 pr-35 md:pb-4">
        <Link
          to="/home"
          className="rounded-xl bg-slate-900 px-8 py-4 text-xl font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-blue-600 dark:text-slate-50 dark:hover:bg-blue-500"
        >
          Get Started
        </Link>
      </div>
    </>
  );
}

export default LandingPage;
