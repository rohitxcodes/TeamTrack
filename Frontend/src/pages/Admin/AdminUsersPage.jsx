import { useEffect, useState } from "react";
import { deleteAdminUser, getAdminUsers } from "../../api/admin";
import PageHeader from "../../components/Common/PageHeader";

function extractUsers(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.users)) return payload.users;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
}

function getUserId(user, index) {
  return user?._id || user?.id || user?.email || `user-${index}`;
}

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await getAdminUsers();
      const list = extractUsers(response);
      setUsers(list);
      if (list.length === 0) {
        setMessage(response?.message || "No users returned by backend yet.");
      }
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function onDeleteUser(userId) {
    if (!userId) return;

    setDeletingId(userId);
    setError("");
    setMessage("");

    try {
      const response = await deleteAdminUser(userId);
      setUsers((prev) =>
        prev.filter((user, idx) => getUserId(user, idx) !== userId),
      );
      setMessage(response?.message || "User deleted");
    } catch (err) {
      setError(err.message || "Failed to delete user");
    } finally {
      setDeletingId("");
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_6px_24px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_8px_26px_rgba(2,6,23,0.5)]">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <PageHeader
            title="Admin Users"
            subtitle="View all users and delete users as defined in the PRD."
          />
          <button
            type="button"
            onClick={loadUsers}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_6px_24px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_8px_26px_rgba(2,6,23,0.5)]">
        {users.length > 0 ? (
          <ul className="divide-y divide-slate-200">
            {users.map((user, index) => {
              const userId = getUserId(user, index);
              const isDeleting = deletingId === userId;
              return (
                <li
                  key={userId}
                  className="py-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {user.name || "Unnamed user"}
                    </p>
                    <p className="text-sm text-slate-600">
                      {user.email || "No email"}
                    </p>
                    <p className="text-xs text-slate-500">
                      Role: {user.role || "employee"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteUser(userId)}
                    disabled={isDeleting}
                    className="rounded-xl border border-red-300 bg-white px-3 py-2 font-semibold text-red-700 transition hover:-translate-y-0.5 hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:bg-slate-900 dark:text-red-300 dark:hover:bg-slate-800"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-slate-600">
            {loading ? "Loading users..." : "No users to display yet."}
          </p>
        )}

        {message ? (
          <p className="mt-4 text-sm text-emerald-700">{message}</p>
        ) : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      </div>
    </section>
  );
}

export default AdminUsersPage;
