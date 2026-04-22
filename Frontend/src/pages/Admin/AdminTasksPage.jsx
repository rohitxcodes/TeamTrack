import { useEffect, useState } from "react";
import { deleteAdminTask, getAdminTasks } from "../../api/admin";
import PageHeader from "../../components/Common/PageHeader";

function extractTasks(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.tasks)) return payload.tasks;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
}

function getTaskId(task, index) {
  return task?._id || task?.id || `task-${index}`;
}

function AdminTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  async function loadTasks() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await getAdminTasks();
      const list = extractTasks(response);
      setTasks(list);
      if (list.length === 0) {
        setMessage(response?.message || "No tasks returned by backend yet.");
      }
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  async function onDeleteTask(taskId) {
    if (!taskId) return;

    setDeletingId(taskId);
    setError("");
    setMessage("");

    try {
      const response = await deleteAdminTask(taskId);
      setTasks((prev) =>
        prev.filter((task, idx) => getTaskId(task, idx) !== taskId),
      );
      setMessage(response?.message || "Task deleted");
    } catch (err) {
      setError(err.message || "Failed to delete task");
    } finally {
      setDeletingId("");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_6px_24px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_8px_26px_rgba(2,6,23,0.5)]">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <PageHeader
            title="Admin Tasks"
            subtitle="View and manage all tasks across the system."
          />
          <button
            type="button"
            onClick={loadTasks}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_6px_24px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_8px_26px_rgba(2,6,23,0.5)]">
        {tasks.length > 0 ? (
          <ul className="divide-y divide-slate-200">
            {tasks.map((task, index) => {
              const taskId = getTaskId(task, index);
              const isDeleting = deletingId === taskId;
              return (
                <li
                  key={taskId}
                  className="py-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {task.title || "Untitled task"}
                    </p>
                    <p className="text-sm text-slate-600">
                      {task.description || "No description"}
                    </p>
                    <p className="text-xs text-slate-500">
                      Status: {task.status || "pending"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteTask(taskId)}
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
            {loading ? "Loading tasks..." : "No tasks to display yet."}
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

export default AdminTasksPage;
