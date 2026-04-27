import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/useTheme";
import userIcon from "../../../public/user.svg";
function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-2.5 py-1.5 transition ${
      isActive
        ? theme === "dark"
          ? "bg-slate-100 text-slate-900"
          : "bg-slate-900 text-white"
        : theme === "dark"
          ? "text-slate-300 hover:text-slate-50 hover:bg-slate-800"
          : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
    }`;

  async function onLogout() {
    await logout();
  }

  return (
    <header className="tt-navbar sticky top-0 z-20 border-b border-slate-200/90 backdrop-blur-md">
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
            className="tt-btn-secondary"
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/workspace" className={navLinkClass}>
                Workspace
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/account" className={navLinkClass}>
                <img src={userIcon} alt="account" className="w-7 h-7" />
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
                className="tt-btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className="tt-btn-primary">
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
