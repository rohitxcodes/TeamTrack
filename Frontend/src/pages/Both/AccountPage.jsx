import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/Common/PageHeader";
import { useAuth } from "../../context/useAuth";

function AccountPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function onLogout() {
    await logout();
    setMessage("Logged out successfully.");
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

      <button
        type="button"
        onClick={onLogout}
        className="mt-6 tt-btn-secondary"
      >
        Logout
      </button>

      {message ? (
        <p className="mt-4 text-sm text-amber-700">{message}</p>
      ) : null}
    </section>
  );
}

export default AccountPage;
