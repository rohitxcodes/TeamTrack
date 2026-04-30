import { Link } from "react-router-dom";
import { useTheme } from "../../context/useTheme";

function LandingPage() {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "%23e2e8f0" : "%230f172a";

  return (
    <>
      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center pt-6 md:pt-12">
        <div className="max-w-md">
          <p className="text-sm uppercase tracking-[0.28em] tt-muted mb-4">
            TeamTrack
          </p>
          <h1 className="tt-heading-display max-w-sm mb-5">
            Role-based task management
          </h1>
          <p className="tt-muted text-base md:text-lg leading-8 max-w-sm">
            A secure workspace for admins and employees to manage groups, tasks,
            and access with clear role-based control.
          </p>
        </div>

        <div className="hidden lg:flex justify-end pb-8">
          <div className="tt-landing-illustration tt-card relative w-full max-w-md min-h-80 overflow-hidden p-8 flex items-center justify-center backdrop-blur-sm">
            <div className="tt-landing-illustration-glow absolute inset-0" />
            <img
              src={`https://api.iconify.design/tabler:clipboard-check.svg?color=${iconColor}`}
              alt="Task management illustration"
              className="tt-landing-illustration-icon relative h-44 w-44"
            />
            <div className="tt-landing-chip-primary absolute left-8 top-8 rounded-full px-3 py-1 text-[11px] tracking-[0.2em]">
              Secure
            </div>
            <div className="tt-landing-chip-secondary absolute right-8 bottom-8 rounded-full px-3 py-1 text-[11px] tracking-[0.2em] border">
              Team Ready
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex justify-end pb-2 pr-35 md:pb-4">
        <Link to="/home" className="tt-btn-primary px-8 py-4 text-xl shadow-xl">
          Get Started
        </Link>
      </div>
    </>
  );
}

export default LandingPage;
