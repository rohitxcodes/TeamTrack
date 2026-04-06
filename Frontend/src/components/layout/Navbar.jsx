import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function onLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="text-xl font-black tracking-tight text-slate-900"
        >
          TeamTrack
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/home" className="text-slate-700 hover:text-slate-900">
            Home
          </NavLink>
          <NavLink to="/about" className="text-slate-700 hover:text-slate-900">
            About
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="text-slate-700 hover:text-slate-900"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/workspace"
                className="text-slate-700 hover:text-slate-900"
              >
                Workspace
              </NavLink>
              <NavLink
                to="/account"
                className="text-slate-700 hover:text-slate-900"
              >
                Account
              </NavLink>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-slate-700 hover:text-slate-900"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-lg bg-slate-900 text-white px-3 py-1.5 hover:bg-slate-700"
              >
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
