import { useEffect, useState } from "react";
import {
  createPersonalTask,
  deletePersonalTask,
  getPersonalTasks,
  updatePersonalTask,
} from "../../api/personalTask.api";

const STATUS_STYLES = {
  TODO: "bg-slate-100 text-slate-700 border-slate-200",
  IN_PROGRESS: "bg-amber-100 text-amber-800 border-amber-200",
  DONE: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function PersonalTasksSection() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
    dueDate: "",
  });

  async function loadTasks() {
    setLoading(true);
    setError("");
    try {
      const response = await getPersonalTasks();
      setTasks(response.tasks ?? []);
    } catch (err) {
      setError(err?.message || "Failed to load personal tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    setCreating(true);
    setMessage("");
    setError("");
    try {
      await createPersonalTask({
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        status: form.status,
        dueDate: form.dueDate || null,
      });
      setForm({
        title: "",
        description: "",
        priority: "MEDIUM",
        status: "TODO",
        dueDate: "",
      });
      setMessage("Personal task created");
      await loadTasks();
    } catch (err) {
      setError(err?.message || "Failed to create personal task");
    } finally {
      setCreating(false);
    }
  }

  async function handleStatusChange(taskId, status) {
    setUpdatingId(taskId);
    setMessage("");
    setError("");
    try {
      await updatePersonalTask(taskId, { status });
      setMessage("Personal task updated");
      await loadTasks();
    } catch (err) {
      setError(err?.message || "Failed to update personal task");
    } finally {
      setUpdatingId("");
    }
  }

  async function handleDelete(taskId) {
    setDeletingId(taskId);
    setMessage("");
    setError("");
    try {
      await deletePersonalTask(taskId);
      setMessage("Personal task deleted");
      await loadTasks();
    } catch (err) {
      setError(err?.message || "Failed to delete personal task");
    } finally {
      setDeletingId("");
    }
  }

  return (
    <section className="tt-card p-5 md:p-6 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="tt-heading-section">Personal Tasks</h2>
          <p className="tt-muted text-sm">
            Keep track of your own tasks separate from group work.
          </p>
        </div>
        <button
          type="button"
          className="tt-btn-secondary text-sm"
          onClick={loadTasks}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      <form onSubmit={handleCreate} className="grid gap-3 md:grid-cols-2">
        <input
          className="tt-input md:col-span-2"
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) =>
            setForm((current) => ({ ...current, title: e.target.value }))
          }
          required
        />
        <textarea
          className="tt-input h-24 md:col-span-2"
          placeholder="Task description (optional)"
          value={form.description}
          onChange={(e) =>
            setForm((current) => ({ ...current, description: e.target.value }))
          }
        />
        <select
          className="tt-input"
          value={form.priority}
          onChange={(e) =>
            setForm((current) => ({ ...current, priority: e.target.value }))
          }
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        <select
          className="tt-input"
          value={form.status}
          onChange={(e) =>
            setForm((current) => ({ ...current, status: e.target.value }))
          }
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <input
          className="tt-input"
          type="date"
          value={form.dueDate}
          onChange={(e) =>
            setForm((current) => ({ ...current, dueDate: e.target.value }))
          }
        />
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="tt-btn-primary" disabled={creating}>
            {creating ? "Creating..." : "Create personal task"}
          </button>
          <button
            type="button"
            className="tt-btn-secondary"
            onClick={() =>
              setForm({
                title: "",
                description: "",
                priority: "MEDIUM",
                status: "TODO",
                dueDate: "",
              })
            }
          >
            Clear
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => {
            const status = task?.status || "TODO";
            const dueDate = task?.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "";

            return (
              <article
                key={task._id}
                className="rounded-xl border border-slate-200 bg-white p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-slate-900">
                    {task?.title || "Untitled"}
                  </p>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                      STATUS_STYLES[status] || STATUS_STYLES.TODO
                    }`}
                  >
                    {status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  {task?.description || "No description"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span>Priority: {task?.priority || "MEDIUM"}</span>
                  {dueDate && <span>Due: {dueDate}</span>}
                  <div className="ml-auto flex items-center gap-2">
                    <select
                      className="text-xs border rounded px-2 py-1 bg-white"
                      value={status}
                      onChange={(e) =>
                        handleStatusChange(task._id, e.target.value)
                      }
                      disabled={updatingId === task._id}
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="DONE">DONE</option>
                    </select>
                    <button
                      type="button"
                      className="tt-btn-danger text-xs"
                      onClick={() => handleDelete(task._id)}
                      disabled={deletingId === task._id}
                    >
                      {deletingId === task._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <p className="tt-muted text-sm">
            No personal tasks yet. Create one above.
          </p>
        )}
      </div>

      {message && <p className="text-sm text-emerald-700">{message}</p>}
      {error && <p className="text-sm text-rose-700">{error}</p>}
    </section>
  );
}
