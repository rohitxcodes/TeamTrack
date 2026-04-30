import { useMemo, useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/Common/PageHeader";
import { useAuth } from "../../context/useAuth";
import { useGroupData } from "../../hooks/useGroupData";
import { useTaskActions } from "../../hooks/useTaskActions";
import { TaskCard } from "../../components/Task/TaskCard";
import { TaskCreateForm } from "../../components/Task/TaskCreateForm";
import GroupChat from "../../components/Chat/GroupChat";
import { inviteGroupMember } from "../../api/group.api";
import socket from "../../socket";
import {
  getId,
  filterPersonalTasks,
  filterOtherTasks,
} from "../../utils/helpers";

function Dashboard() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // prefer groupId passed via navigation state; fallback to route param
  const incomingStateGroupId = location?.state?.groupId;
  const paramGroupId = params.groupId;
  const derivedGroupId = incomingStateGroupId || paramGroupId;

  // if user landed on /workspace/:groupId, replace URL with /workspace/dashboard
  useEffect(() => {
    if (paramGroupId && !incomingStateGroupId) {
      navigate("/workspace/dashboard", {
        state: { groupId: paramGroupId },
        replace: true,
      });
    }
  }, [paramGroupId, incomingStateGroupId, navigate]);

  const { groups, members, tasks, loading, error, refetch } =
    useGroupData(derivedGroupId);
  // socket: join group room and listen for real-time task/chat events
  useEffect(() => {
    if (!derivedGroupId) return;
    socket.emit("joinGroup", derivedGroupId);

    const handleTaskUpdated = () => {
      refetch();
    };

    socket.on("taskUpdated", handleTaskUpdated);
    socket.on("taskCreated", handleTaskUpdated);
    socket.on("taskDeleted", handleTaskUpdated);

    return () => {
      socket.off("taskUpdated", handleTaskUpdated);
      socket.off("taskCreated", handleTaskUpdated);
      socket.off("taskDeleted", handleTaskUpdated);
      socket.emit("leaveGroup", derivedGroupId);
    };
  }, [derivedGroupId, refetch]);
  const {
    createTask,
    deleteTask,
    updateTaskStatus,
    message,
    error: taskError,
    creatingTask,
  } = useTaskActions(derivedGroupId, refetch);

  const currentUserId = user?.id || user?._id;

  const selectedGroup = useMemo(
    () => groups.find((g) => getId(g) === derivedGroupId),
    [groups, derivedGroupId],
  );

  const selectedMembership = useMemo(
    () =>
      members.find((m) => {
        const memberUserId = m?.user?._id || m?.user?.id;
        return currentUserId && memberUserId && memberUserId === currentUserId;
      }),
    [members, currentUserId],
  );

  const isGroupAdmin = selectedMembership?.role === "ADMIN";
  const personalTasks = useMemo(
    () => filterPersonalTasks(tasks, currentUserId),
    [tasks, currentUserId],
  );
  const otherTasks = useMemo(
    () => filterOtherTasks(tasks, currentUserId),
    [tasks, currentUserId],
  );

  async function handleInviteMember(email) {
    if (!derivedGroupId || !email.trim()) return;
    try {
      const response = await inviteGroupMember(derivedGroupId, {
        email: email.trim(),
      });
      await refetch();
      return response.message || "Invitation sent";
    } catch (err) {
      throw err;
    }
  }

  if (!derivedGroupId) {
    return (
      <section className="tt-card p-6 md:p-8 space-y-4">
        <PageHeader
          title="Group Dashboard"
          subtitle="Pick a group from workspace first."
        />
        <Link to="/workspace" className="tt-btn-primary inline-flex w-fit">
          Back to workspace
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="tt-card p-6 md:p-8">
        <PageHeader
          title={selectedGroup?.name || `Group ${derivedGroupId}`}
          subtitle="This dashboard belongs to one group only. Roles are checked inside the group."
        />
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-slate-900 text-white px-3 py-1 font-semibold">
            {selectedMembership?.role || "MEMBER"}
          </span>
          {loading && <span className="tt-muted">Loading group data...</span>}
          <Link to="/workspace" className="tt-btn-secondary inline-flex">
            Back to workspace
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="tt-card p-5 space-y-4">
          <GroupChat groupId={derivedGroupId} user={user} />
        </section>

        <section className="tt-card p-5 space-y-4">
          <div>
            <h2 className="tt-heading-section">Tasks</h2>
            <p className="tt-muted text-sm">Tasks inside this group.</p>
          </div>

          <TaskCreateForm
            members={members}
            isGroupAdmin={isGroupAdmin}
            onSubmit={createTask}
            loading={creatingTask}
          />

          <div className="space-y-2 max-h-[28rem] overflow-auto pr-1">
            {personalTasks.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Personal tasks
                </h3>
                {personalTasks.map((task) => (
                  <TaskCard
                    key={getId(task)}
                    task={task}
                    currentUserId={currentUserId}
                    isGroupAdmin={isGroupAdmin}
                    onToggleComplete={() =>
                      updateTaskStatus(
                        task._id,
                        (task.status || "TODO") === "DONE" ? "TODO" : "DONE",
                      )
                    }
                    onUpdateStatus={updateTaskStatus}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            )}

            {otherTasks.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Other tasks
                </h3>
                {otherTasks.map((task) => (
                  <TaskCard
                    key={getId(task)}
                    task={task}
                    currentUserId={currentUserId}
                    isGroupAdmin={isGroupAdmin}
                    onToggleComplete={() =>
                      updateTaskStatus(
                        task._id,
                        (task.status || "TODO") === "DONE" ? "TODO" : "DONE",
                      )
                    }
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            )}

            {personalTasks.length === 0 && otherTasks.length === 0 && (
              <p className="tt-muted text-sm">No tasks loaded yet.</p>
            )}
          </div>
        </section>
      </div>

      {isGroupAdmin && (
        <AdminInviteSection
          groupId={derivedGroupId}
          onInvite={handleInviteMember}
        />
      )}

      {message && <p className="text-sm text-emerald-700">{message}</p>}
      {taskError && <p className="text-sm text-rose-700">{taskError}</p>}
      {error && <p className="text-sm text-rose-700">{error}</p>}
    </section>
  );
}

function AdminInviteSection({ groupId, onInvite }) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setInviting(true);
    setMessage("");
    setError("");
    try {
      const msg = await onInvite(inviteEmail.trim());
      setMessage(msg);
      setInviteEmail("");
    } catch (err) {
      setError(err?.message || "Failed to invite member");
    } finally {
      setInviting(false);
    }
  }

  return (
    <section className="tt-card p-5 md:p-6 space-y-4 max-w-xl">
      <div>
        <h2 className="tt-heading-section">Invite members</h2>
        <p className="tt-muted text-sm">
          Only group admins can invite members to this workspace.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="tt-input"
          type="email"
          placeholder="member@example.com"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          required
        />
        <button type="submit" className="tt-btn-primary" disabled={inviting}>
          {inviting ? "Inviting..." : "Send invite"}
        </button>
      </form>
      {message && <p className="text-sm text-emerald-700">{message}</p>}
      {error && <p className="text-sm text-rose-700">{error}</p>}
    </section>
  );
}

export default Dashboard;
