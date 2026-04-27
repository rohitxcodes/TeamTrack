import { useState } from "react";
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
  const [tasks] = useState([
    {
      _id: "t-1",
      title: "Sample task",
      description: "UI only placeholder row",
      status: "pending",
    },
    {
      _id: "t-2",
      title: "Another task",
      description: "Replace this with API data later",
      status: "in-progress",
    },
  ]);
  const [message, setMessage] = useState("");
  const [loading] = useState(false);

  function onDeleteTask() {
    setMessage("Logic removed: implement delete task API yourself.");
  }

  return (
    <section className="space-y-6">
      <div className="tt-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <PageHeader
            title="Admin Tasks"
            subtitle="View and manage all tasks across the system."
          />
          <button
            type="button"
            onClick={() =>
              setMessage("Logic removed: implement refresh tasks yourself.")
            }
            className="tt-btn-secondary"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="tt-card p-6">
        {tasks.length > 0 ? (
          <ul className="divide-y divide-slate-200">
            {tasks.map((task, index) => {
              const taskId = getTaskId(task, index);
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
            {loading ? "Loading tasks..." : "No tasks to display yet."}
          </p>
        )}

        {message ? (
          <p className="mt-4 text-sm text-emerald-700">{message}</p>
        ) : null}
      </div>
    </section>
  );
}

export default AdminTasksPage;
