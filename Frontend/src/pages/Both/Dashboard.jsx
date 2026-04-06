import { useState } from "react";
import { createAdminTask } from "../../api/admin";
import { useAuth } from "../../context/useAuth";

function Dashboard() {
  const { user, refreshMe } = useAuth();
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function onChange(event) {
    const { name, value } = event.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onCreateTask(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await createAdminTask(taskForm);
      setMessage(typeof response === "string" ? response : "Task created");
      setTaskForm({ title: "", description: "", status: "pending" });
    } catch (err) {
      setError(err.message || "Task creation failed");
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-600">
          Connected session and role-aware controls.
        </p>
        <div className="mt-4 flex gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-slate-100">
            Name: {user?.name || "User"}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100">
            Role: {user?.role || "employee"}
          </span>
          <button
            type="button"
            onClick={refreshMe}
            className="px-3 py-1 rounded-full border border-slate-300 hover:bg-slate-100"
          >
            Refresh session
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Admin: Create Task</h2>
        <p className="text-sm text-slate-600 mb-4">
          This calls <code>/api/admin/tasks</code>. Requires admin session.
        </p>
        <form onSubmit={onCreateTask} className="space-y-3 max-w-xl">
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            name="title"
            placeholder="Task title"
            value={taskForm.title}
            onChange={onChange}
            required
          />
          <textarea
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            name="description"
            placeholder="Task description"
            value={taskForm.description}
            onChange={onChange}
          />
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
            name="status"
            value={taskForm.status}
            onChange={onChange}
          >
            <option value="pending">pending</option>
            <option value="in-progress">in-progress</option>
            <option value="completed">completed</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-slate-900 text-white px-4 py-2 hover:bg-slate-700"
          >
            Create task
          </button>
        </form>
        {message ? (
          <p className="mt-3 text-sm text-emerald-700">{message}</p>
        ) : null}
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </div>
    </section>
  );
}

export default Dashboard;
