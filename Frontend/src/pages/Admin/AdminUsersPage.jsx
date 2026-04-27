import { useState } from "react";
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
  const [users] = useState([
    {
      _id: "u-1",
      name: "Student One",
      email: "one@example.com",
      role: "admin",
    },
    {
      _id: "u-2",
      name: "Student Two",
      email: "two@example.com",
      role: "employee",
    },
  ]);
  const [message, setMessage] = useState("");
  const [loading] = useState(false);

  function onDeleteUser() {
    setMessage("Logic removed: implement delete user API yourself.");
  }

  return (
    <section className="space-y-6">
      <div className="tt-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <PageHeader
            title="Admin Users"
            subtitle="View all users and delete users as defined in the PRD."
          />
          <button
            type="button"
            onClick={() =>
              setMessage("Logic removed: implement refresh users yourself.")
            }
            className="tt-btn-secondary"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="tt-card p-6">
        {users.length > 0 ? (
          <ul className="divide-y divide-slate-200">
            {users.map((user, index) => {
              const userId = getUserId(user, index);
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
                    className="tt-btn-danger disabled:opacity-60"
                  >
                    Delete
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
      </div>
    </section>
  );
}

export default AdminUsersPage;
