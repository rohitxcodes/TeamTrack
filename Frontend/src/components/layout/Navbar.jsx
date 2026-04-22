import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/useTheme";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-2.5 py-1.5 transition ${
      isActive
        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
    }`;

  const secondaryButtonClass =
    "rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800";

  const primaryButtonClass =
    "rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-blue-600 dark:text-slate-50 dark:hover:bg-blue-500";

  async function onLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center"
          aria-label="TeamTrack home"
        >
          <img
            src={theme === "dark" ? "/logoDark.svg" : "/logo.svg"}
            alt="TeamTrack"
            className="h-9 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-2 text-sm flex-wrap justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className={secondaryButtonClass}
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/workspace" className={navLinkClass}>
                Workspace
              </NavLink>
              <NavLink to="/account" className={navLinkClass}>
                Account
              </NavLink>
              {user?.role === "admin" ? (
                <>
                  <NavLink to="/admin/users" className={navLinkClass}>
                    Admin Users
                  </NavLink>
                  <NavLink to="/admin/tasks" className={navLinkClass}>
                    Admin Tasks
                  </NavLink>
                </>
              ) : null}
              <button
                type="button"
                onClick={onLogout}
                className={secondaryButtonClass}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={primaryButtonClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
