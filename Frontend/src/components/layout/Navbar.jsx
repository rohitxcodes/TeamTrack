import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../context/useTheme";
import { useAuth } from "../../context/useAuth";
import userIcon from "../../../public/user.svg";
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();

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
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>
          <>
            <NavLink to="/workspace" className={navLinkClass}>
              Workspace
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            {isAuthenticated ? (
              <NavLink to="/account" className={navLinkClass}>
                <img
                  src={userIcon}
                  alt={user?.name ? `${user.name} account` : "account"}
                  className="w-6 h-6"
                />
              </NavLink>
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
            <button
              type="button"
              onClick={toggleTheme}
              className="tt-btn-secondary"
              aria-label="Toggle color theme"
            >
              <img
                src={theme === "dark" ? "/toggle-sun.svg " : "/toggle-moon.svg"}
                alt="TeamTrack"
                className="h-6 w-6 object-contain"
              />
            </button>
          </>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
