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
    <section className="tt-card p-6 md:p-8">
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
        className="mt-6 tt-btn-secondary"
      >
        Logout
      </button>
    </section>
  );
}

export default AccountPage;
