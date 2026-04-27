import { useState } from "react";
import { useAuth } from "../../context/useAuth";

function Dashboard() {
  const { user } = useAuth();
  const [boardTasks, setBoardTasks] = useState([
    {
      id: "KAN-11",
      title: "Set up auth guard middleware",
      status: "in-progress",
      assignee: "RK",
    },
    {
      id: "KAN-12",
      title: "Wire admin delete-user flow",
      status: "review",
      assignee: "AD",
    },
    {
      id: "KAN-13",
      title: "Theme consistency pass",
      status: "done",
      assignee: "RK",
    },
  ]);
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

    setBoardTasks((prev) => [
      {
        id: `KAN-${prev.length + 100}`,
        title: taskForm.title,
        status: taskForm.status,
        assignee: user?.name?.slice(0, 2)?.toUpperCase() || "ME",
      },
      ...prev,
    ]);
    setTaskForm({ title: "", description: "", status: "pending" });
    setMessage("Logic removed: connect this form to your own API later.");
  }

  const columns = [
    { key: "pending", label: "TO DO" },
    { key: "in-progress", label: "IN PROGRESS" },
    { key: "review", label: "IN REVIEW" },
    { key: "completed", label: "DONE" },
    { key: "done", label: "DONE" },
  ];

  const boardColumns = [
    { key: "pending", label: "TO DO" },
    { key: "in-progress", label: "IN PROGRESS" },
    { key: "review", label: "IN REVIEW" },
    { key: "done", label: "DONE" },
  ];

  function getTasksForColumn(columnKey) {
    if (columnKey === "done") {
      return boardTasks.filter(
        (task) => task.status === "done" || task.status === "completed",
      );
    }
    return boardTasks.filter((task) => task.status === columnKey);
  }

  return (
    <section className="rounded-3xl overflow-hidden border border-slate-700/70 bg-[#10131a] text-slate-200 shadow-2xl">
      <div className="grid lg:grid-cols-[240px_1fr] min-h-[74vh]">
        <aside className="border-r border-slate-800 bg-[#0c1016] p-4 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-wide">TeamTrack</p>
            <button className="h-8 w-8 rounded-lg border border-slate-700 text-slate-400">
              +
            </button>
          </div>

          <div className="space-y-1 text-sm">
            <button className="w-full text-left rounded-lg px-3 py-2 bg-slate-800 text-slate-100">
              For you
            </button>
            <button className="w-full text-left rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800/70 hover:text-slate-100">
              Recent
            </button>
            <button className="w-full text-left rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800/70 hover:text-slate-100">
              Projects
            </button>
            <button className="w-full text-left rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800/70 hover:text-slate-100">
              Boards
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-xs tracking-wide text-slate-500">
              CURRENT SPACE
            </p>
            <p className="mt-1 font-semibold">My Kanban Project</p>
            <p className="mt-1 text-xs text-slate-400">
              {user?.name || "User"} • {user?.role || "employee"}
            </p>
          </div>
        </aside>

        <div className="p-4 md:p-5 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-[#131a24] p-3 md:p-4 flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <input
                className="min-w-60 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
              />
              <button className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-500">
                + Create
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setMessage(
                    "Logic removed: implement refresh session yourself.",
                  );
                  setError("");
                }}
                className="rounded-md border border-slate-700 px-3 py-2 text-slate-300 hover:bg-slate-800"
              >
                Refresh session
              </button>
              <span className="rounded-md border border-violet-500/70 text-violet-300 px-3 py-2">
                14 days left
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#131a24] p-4">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Spaces
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
                  My Kanban Project
                </h1>
              </div>
              <div className="text-xs text-slate-400">Board view</div>
            </div>

            <div className="flex items-center gap-2 flex-wrap mb-4">
              <button className="rounded-lg bg-slate-800 text-slate-300 px-3 py-1.5 text-sm">
                Search board
              </button>
              <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800">
                Filter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {boardColumns.map((column) => {
                const tasks = getTasksForColumn(column.key);
                return (
                  <div
                    key={column.key}
                    className="rounded-xl border border-slate-800 bg-[#0f141d] p-3 min-h-72"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xs tracking-wide text-slate-400 font-semibold">
                        {column.label}
                      </h2>
                      <span className="text-xs text-slate-500">
                        {tasks.length}
                      </span>
                    </div>

                    {column.key === "pending" ? (
                      <form
                        onSubmit={onCreateTask}
                        className="mb-3 rounded-lg border border-blue-600/70 bg-[#131d2f] p-3 space-y-2"
                      >
                        <input
                          className="w-full rounded bg-slate-950 border border-slate-700 px-2.5 py-2 text-sm placeholder:text-slate-500"
                          name="title"
                          placeholder="What needs to be done?"
                          value={taskForm.title}
                          onChange={onChange}
                          required
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            className="rounded bg-slate-950 border border-slate-700 px-2 py-2 text-xs"
                            name="status"
                            value={taskForm.status}
                            onChange={onChange}
                          >
                            <option value="pending">To do</option>
                            <option value="in-progress">In progress</option>
                            <option value="review">In review</option>
                            <option value="completed">Done</option>
                          </select>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                          >
                            Add
                          </button>
                        </div>
                        {message ? (
                          <p className="text-[11px] text-emerald-300">
                            {message}
                          </p>
                        ) : null}
                        {error ? (
                          <p className="text-[11px] text-rose-300">{error}</p>
                        ) : null}
                      </form>
                    ) : null}

                    <div className="space-y-2">
                      {tasks.length > 0 ? (
                        tasks.map((task) => (
                          <article
                            key={task.id}
                            className="rounded-lg border border-slate-700 bg-[#171d28] p-3"
                          >
                            <p className="text-sm text-slate-100">
                              {task.title}
                            </p>
                            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                              <span>{task.id}</span>
                              <span className="h-6 w-6 rounded-full bg-slate-700 grid place-items-center text-[10px] font-semibold text-slate-200">
                                {task.assignee}
                              </span>
                            </div>
                          </article>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500">No issues yet.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
