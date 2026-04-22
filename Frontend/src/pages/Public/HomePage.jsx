import { Link } from "react-router-dom";
import PageHeader from "../../components/Common/PageHeader";

function HomePage() {
  const workflow = [
    {
      title: "Write",
      description:
        "Create tasks and team plans in one place with clear ownership.",
    },
    {
      title: "Run",
      description:
        "Execute work with status updates, assignments, and role-based safety built in.",
    },
    {
      title: "Review",
      description:
        "Track what changed, who changed it, and what is still blocked at a glance.",
    },
  ];

  const quickLinks = [
    {
      label: "Login",
      description: "Access your account and recent workspace activity.",
      to: "/login",
    },
    {
      label: "Register",
      description: "Create a new team account and get started quickly.",
      to: "/register",
    },
    {
      label: "Dashboard",
      description: "Track priorities, task status, and team progress.",
      to: "/dashboard",
    },
    {
      label: "Workspace",
      description: "Manage groups, members, and collaboration flows.",
      to: "/workspace",
    },
  ];

  const platformHighlights = [
    "Role-based workspace access",
    "Shared team task board",
    "Admin and member dashboards",
    "Group-level collaboration",
    "Fast onboarding with guided flows",
  ];

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-[0_10px_34px_rgba(2,6,23,0.55)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(15,118,110,0.16),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(249,115,22,0.14),transparent_36%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(45,212,191,0.14),transparent_42%),radial-gradient(circle_at_84%_12%,rgba(59,130,246,0.16),transparent_38%),linear-gradient(180deg,#0f172a_0%,#0b1220_100%)]" />

      <div className="relative px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12 space-y-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <article className="space-y-5">
            <p className="inline-flex items-center rounded-full bg-teal-100 text-teal-900 px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
              TeamTrack Platform
            </p>
            <PageHeader
              level="display"
              title="Build, assign, and ship team work with admin-grade control."
              subtitle="A role-based workspace inspired by modern online coding tools: clean panels, fast actions, and real-time clarity for every task."
              className="max-w-xl"
            />

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard"
                className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-blue-600 dark:text-slate-50 dark:hover:bg-blue-500"
              >
                Open Dashboard
              </Link>
              <Link
                to="/workspace"
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              >
                Explore Workspace
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              {workflow.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_6px_24px_rgba(15,23,42,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_8px_26px_rgba(2,6,23,0.5)]"
                >
                  <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-800/10 bg-slate-950 text-slate-100 shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700/70 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                teamtrack-session
              </span>
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-rose-400" />
              </span>
            </div>
            <div className="p-4 text-xs sm:text-sm font-mono leading-6 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,132,199,0.14))] min-h-72">
              <p className="text-teal-300">Today in TeamTrack</p>
              <p className="text-slate-300">&gt; Workspace status: Active</p>
              <p className="text-slate-400">32 tasks tracked across 4 groups</p>
              <br />
              <p className="text-teal-300">Team Focus</p>
              <p className="text-slate-300">&gt; Priorities: Sprint planning</p>
              <p className="text-slate-400">8 tasks in review, 3 blocked</p>
              <br />
              <p className="text-teal-300">People</p>
              <p className="text-slate-300">roles: admin, manager, member</p>
              <p className="text-slate-300">visibility: secure by group</p>
            </div>
          </aside>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-4">
          <article className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_6px_24px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_8px_26px_rgba(2,6,23,0.5)]">
            <h2 className="text-xl md:text-2xl leading-snug font-bold text-slate-900 dark:text-slate-100">
              Quick Access
            </h2>
            <p className="mt-1 mb-4 text-sm text-slate-600 dark:text-slate-300">
              Jump to your most used screens.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-fr">
              {quickLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative flex min-h-[112px] flex-col gap-1 rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-100 p-4 transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-[0_10px_22px_rgba(15,23,42,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/60 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 dark:hover:border-slate-500 dark:hover:shadow-[0_12px_24px_rgba(2,6,23,0.5)]"
                >
                  <span className="text-[0.95rem] font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    {item.label}
                  </span>
                  <span className="pr-6 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </span>
                  <span
                    className="absolute right-3 top-3 text-base font-bold text-teal-700 transition group-hover:translate-x-0.5 dark:text-teal-300"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_6px_24px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_8px_26px_rgba(2,6,23,0.5)]">
            <h2 className="text-xl md:text-2xl leading-snug font-bold text-slate-900 dark:text-slate-100">
              Platform Highlights
            </h2>
            <p className="mt-1 mb-4 text-sm text-slate-600 dark:text-slate-300">
              Everything teams need to organize, track, and ship work.
            </p>
            <ul className="space-y-2 text-sm">
              {platformHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-slate-900 text-slate-100 px-3 py-2 font-mono"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
