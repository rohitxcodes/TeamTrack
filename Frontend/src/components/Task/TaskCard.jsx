export function TaskCard({
  task,
  currentUserId,
  isGroupAdmin,
  onToggleComplete,
  onDelete,
  updatingTask,
  deletingTask,
  onUpdateStatus,
}) {
  // Normalize IDs (they may be strings or ObjectId-like objects) and compare as strings
  const assignedIdRaw =
    task?.assignedTo?._id || task?.assignedTo?.id || task?.assignedTo;
  const assignedId = assignedIdRaw ? String(assignedIdRaw) : null;
  const currentId = currentUserId ? String(currentUserId) : null;
  const isAssignedToCurrentUser =
    currentId && assignedId && assignedId === currentId;
  const canToggleStatus = isAssignedToCurrentUser;
  const status = task?.status || "TODO";

  const statusStyles = {
    TODO: "bg-slate-100 text-slate-700 border-slate-200",
    IN_PROGRESS: "bg-amber-100 text-amber-800 border-amber-200",
    DONE: "bg-emerald-100 text-emerald-800 border-emerald-200",
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium text-slate-900">
          {task?.title || "Untitled"}
        </p>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
            statusStyles[status] || statusStyles.TODO
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
        {task?.assignedTo?.name && (
          <span>Assigned to: {task.assignedTo.name}</span>
        )}
        <div className="ml-auto flex items-center gap-2">
          {canToggleStatus ? (
            <select
              className="text-xs border rounded px-2 py-1 bg-white"
              value={task?.status || "TODO"}
              onChange={(e) => onUpdateStatus?.(task._id, e.target.value)}
              disabled={updatingTask}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          ) : (
            <button
              type="button"
              className="tt-btn-secondary text-xs"
              disabled
              title="Only the assignee can update status"
            >
              Update only by assignee
            </button>
          )}

          {isGroupAdmin && (
            <button
              type="button"
              className="tt-btn-danger text-xs"
              onClick={() => onDelete?.(task._id)}
              disabled={deletingTask}
            >
              {deletingTask ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

// PropTypes removed to avoid dependency on 'prop-types'
