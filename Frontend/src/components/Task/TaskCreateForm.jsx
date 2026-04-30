import { useState } from "react";

export function TaskCreateForm({ members, isGroupAdmin, onSubmit, loading }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assigneeId: "",
  });
  const [status, setStatus] = useState("TODO");

  function handleSubmit(e) {
    e.preventDefault();
    if (!task.title.trim()) return;
    onSubmit?.({
      title: task.title.trim(),
      description: task.description.trim(),
      ...(task.assigneeId ? { assignedTo: task.assigneeId } : {}),
      ...(status ? { status } : {}),
    });
    setTask({ title: "", description: "", assigneeId: "" });
    setStatus("TODO");
  }

  if (!isGroupAdmin) {
    return (
      <p className="tt-muted text-sm">
        Only group admins can create and assign tasks.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        className="tt-input"
        type="text"
        placeholder="Task title"
        value={task.title}
        onChange={(e) => setTask((s) => ({ ...s, title: e.target.value }))}
        required
      />
      <textarea
        className="tt-input h-24"
        placeholder="Task description (optional)"
        value={task.description}
        onChange={(e) =>
          setTask((s) => ({ ...s, description: e.target.value }))
        }
      />
      <select
        className="tt-input"
        value={task.assigneeId}
        onChange={(e) => setTask((s) => ({ ...s, assigneeId: e.target.value }))}
      >
        <option value="">Assign to (optional)</option>
        {members.map((m) => (
          <option
            key={m?._id || m?.user?._id}
            value={m?.user?._id || m?.user?.id}
          >
            {m?.user?.email || m?.user?.name}
          </option>
        ))}
      </select>
      {isGroupAdmin && (
        <select
          className="tt-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      )}
      <div className="flex gap-2">
        <button type="submit" className="tt-btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create task"}
        </button>
        <button
          type="button"
          className="tt-btn-secondary"
          onClick={() =>
            setTask({ title: "", description: "", assigneeId: "" })
          }
        >
          Clear
        </button>
      </div>
    </form>
  );
}

// PropTypes removed to avoid dependency on 'prop-types'
