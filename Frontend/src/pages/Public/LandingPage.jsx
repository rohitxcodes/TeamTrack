import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
        Role-based task control
      </p>
      <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
        TeamTrack
      </h1>
      <p className="text-slate-600 max-w-2xl mb-8">
        Wireframe-ready frontend connected to your auth, admin, and group
        endpoints. Start by creating an account, then move into dashboard and
        workspace flows.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/register"
          className="rounded-xl bg-slate-900 text-white px-5 py-2.5 font-medium hover:bg-slate-700"
        >
          Create account
        </Link>
        <Link
          to="/login"
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-100"
        >
          Login
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
