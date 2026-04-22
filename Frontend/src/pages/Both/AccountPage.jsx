import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PageHeader from "../../components/Common/PageHeader";

function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function onLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_6px_24px_rgba(15,23,42,0.06)] md:p-8 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_8px_26px_rgba(2,6,23,0.5)]">
      <PageHeader title="Account" className="mb-4" />
      <dl className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl bg-slate-100 p-3 border border-slate-200">
          <dt className="text-slate-500">Name</dt>
          <dd className="font-medium text-slate-900">{user?.name || "User"}</dd>
        </div>
        <div className="rounded-xl bg-slate-100 p-3 border border-slate-200">
          <dt className="text-slate-500">Role</dt>
          <dd className="font-medium text-slate-900">
            {user?.role || "employee"}
          </dd>
        </div>
      </dl>

      {user?.raw ? (
        <p className="mt-4 text-xs text-amber-700">
          Backend /me is returning placeholder text, so user profile data is
          mocked on client.
        </p>
      ) : null}

      <button
        type="button"
        onClick={onLogout}
        className="mt-6 rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
      >
        Logout
      </button>
    </section>
  );
}

export default AccountPage;
