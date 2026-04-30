import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/Common/PageHeader";
import { useAuth } from "../../context/useAuth";
import { useWorkspaceData } from "../../hooks/useWorkspaceData";
import { createGroup, inviteGroupMember } from "../../api/group.api";
import { acceptInvitation, rejectInvitation } from "../../api/invitation.api";
import PersonalTasksSection from "../../components/Task/PersonalTasksSection";
import { MembersList } from "../../components/Members/MembersList";
import {
  PendingInviteCard,
  AcceptedInviteCard,
} from "../../components/Invites/InviteCard";
import { getId, getGroupLabel, separateInvitations } from "../../utils/helpers";

function WorkSpace() {
  const { user } = useAuth();
  const { groups, invitations, members, loading, error, refetch, loadMembers } =
    useWorkspaceData();
  const [groupForm, setGroupForm] = useState({ name: "" });
  const [selectedGroupId, setSelectedGroupId] = useState(
    groups[0] ? getId(groups[0]) : "",
  );
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [inviteForm, setInviteForm] = useState({ groupId: "", email: "" });
  const [inviting, setInviting] = useState(false);

  const { pending, accepted } = useMemo(
    () => separateInvitations(invitations),
    [invitations],
  );

  async function handleCreateGroup(e) {
    e.preventDefault();
    if (!groupForm.name.trim()) return;

    setCreatingGroup(true);
    setMessage("");
    setLocalError("");
    try {
      const response = await createGroup({ name: groupForm.name.trim() });
      setMessage(response.message || "Group created");
      setGroupForm({ name: "" });
      await refetch();
    } catch (err) {
      setLocalError(err?.message || "Failed to create group");
    } finally {
      setCreatingGroup(false);
    }
  }

  async function handleInviteMember(e) {
    e.preventDefault();
    if (!inviteForm.groupId || !inviteForm.email.trim()) return;

    setInviting(true);
    setMessage("");
    setLocalError("");
    try {
      const response = await inviteGroupMember(inviteForm.groupId, {
        email: inviteForm.email.trim(),
      });
      setMessage(response.message || "Invitation sent");
      setInviteForm((current) => ({ ...current, email: "" }));
      await refetch();
      if (inviteForm.groupId) await loadMembers(inviteForm.groupId);
    } catch (err) {
      setLocalError(err?.message || "Failed to send invitation");
    } finally {
      setInviting(false);
    }
  }

  async function handleInvitationAction(action, inviteId) {
    setMessage("");
    setLocalError("");
    try {
      if (action === "accept") {
        await acceptInvitation(inviteId);
      } else {
        await rejectInvitation(inviteId);
      }
      await refetch();
      if (selectedGroupId) await loadMembers(selectedGroupId);
      setMessage(
        action === "accept" ? "Invitation accepted" : "Invitation rejected",
      );
    } catch (err) {
      setLocalError(err?.message || "Failed to update invitation");
    }
  }

  return (
    <section className="space-y-6">
      <div className="tt-card p-6 md:p-8">
        <PageHeader
          title="Workspace"
          subtitle="Create groups, invite members, review invites, and open any group dashboard from here."
        />
        <p className="tt-muted mt-3 text-sm">
          Logged in as {user?.name || "User"}. Admin/member access is handled
          inside each group.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr_0.9fr]">
        <section className="tt-card p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="tt-heading-section">All Groups</h2>
              <p className="tt-muted text-sm">
                Click a group to open that group's dashboard.
              </p>
            </div>
            <button
              type="button"
              onClick={refetch}
              className="tt-btn-secondary text-sm"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {groups.length > 0 ? (
              groups.map((group) => (
                <Link
                  key={getId(group)}
                  to="/workspace/dashboard"
                  state={{ groupId: getId(group) }}
                  className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:-translate-y-0.5"
                >
                  <span className="block font-semibold text-slate-900">
                    {getGroupLabel(group)}
                  </span>
                  <span className="block text-xs mt-1 text-slate-500">
                    Open group dashboard
                  </span>
                </Link>
              ))
            ) : (
              <p className="tt-muted text-sm">
                {loading
                  ? "Loading groups..."
                  : "No groups yet. Create one below."}
              </p>
            )}
          </div>

          <form onSubmit={handleCreateGroup} className="space-y-3 pt-2">
            <h3 className="text-sm font-semibold text-slate-900">
              Create group
            </h3>
            <input
              className="tt-input"
              placeholder="Team name"
              value={groupForm.name}
              onChange={(e) => setGroupForm({ name: e.target.value })}
            />
            <button
              type="submit"
              className="tt-btn-primary w-full"
              disabled={creatingGroup}
            >
              {creatingGroup ? "Creating..." : "Create group"}
            </button>
          </form>
        </section>

        <section className="tt-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="tt-heading-section">Members</h2>
              <p className="tt-muted text-sm">Members of selected group.</p>
            </div>
          </div>

          <select
            className="tt-input"
            value={selectedGroupId}
            onChange={(e) => {
              setSelectedGroupId(e.target.value);
              if (e.target.value) loadMembers(e.target.value);
            }}
            disabled={groups.length === 0}
          >
            <option value="">Choose a group</option>
            {groups.map((group) => (
              <option key={getId(group)} value={getId(group)}>
                {getGroupLabel(group)}
              </option>
            ))}
          </select>

          <MembersList
            members={members}
            loading={loading}
            showRefresh={false}
          />
        </section>

        <aside className="tt-card p-5 space-y-5">
          <form onSubmit={handleInviteMember} className="space-y-3">
            <div>
              <h2 className="tt-heading-section">Invite members</h2>
              <p className="tt-muted text-sm">
                Send an invitation to a group you already belong to.
              </p>
            </div>
            <select
              className="tt-input"
              value={inviteForm.groupId}
              onChange={(event) =>
                setInviteForm((current) => ({
                  ...current,
                  groupId: event.target.value,
                }))
              }
              disabled={groups.length === 0}
            >
              <option value="">Choose a group</option>
              {groups.map((group) => {
                const groupId = getId(group);
                return (
                  <option key={groupId} value={groupId}>
                    {getGroupLabel(group)}
                  </option>
                );
              })}
            </select>
            <input
              className="tt-input"
              type="email"
              placeholder="member@example.com"
              value={inviteForm.email}
              onChange={(event) =>
                setInviteForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
            />
            <button
              type="submit"
              className="tt-btn-secondary w-full"
              disabled={inviting || groups.length === 0}
            >
              {inviting ? "Inviting..." : "Send invite"}
            </button>
          </form>

          <div className="space-y-3">
            <div>
              <h2 className="tt-heading-section">Pending invites</h2>
              <p className="tt-muted text-sm">
                Invitations waiting for a response.
              </p>
            </div>
            {pending.length > 0 ? (
              pending.map((invite) => (
                <PendingInviteCard
                  key={invite._id}
                  invite={invite}
                  onAccept={() => handleInvitationAction("accept", invite._id)}
                  onReject={() => handleInvitationAction("reject", invite._id)}
                />
              ))
            ) : (
              <p className="tt-muted text-sm">No pending invitations.</p>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <h2 className="tt-heading-section">Accepted invites</h2>
              <p className="tt-muted text-sm">
                Groups you have already joined.
              </p>
            </div>
            {accepted.length > 0 ? (
              accepted.map((invite) => (
                <AcceptedInviteCard key={invite._id} invite={invite} />
              ))
            ) : (
              <p className="tt-muted text-sm">No accepted invitations yet.</p>
            )}
          </div>
        </aside>
      </div>

      <PersonalTasksSection />

      {message && <p className="text-sm text-emerald-700">{message}</p>}
      {localError && <p className="text-sm text-rose-700">{localError}</p>}
      {error && <p className="text-sm text-rose-700">{error}</p>}
    </section>
  );
}

export default WorkSpace;
