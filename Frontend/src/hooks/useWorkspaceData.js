import { useState, useEffect } from "react";
import { getMyGroups, getGroupMembers } from "../api/group.api";
import { getMyInvitations } from "../api/invitation.api";

export function useWorkspaceData() {
  const [groups, setGroups] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadWorkspaceData(selectedGroupId = null) {
    setLoading(true);
    setError("");
    try {
      const [groupsResponse, invitationsResponse] = await Promise.all([
        getMyGroups(),
        getMyInvitations(),
      ]);

      const nextGroups = groupsResponse.groupForUser ?? [];
      setGroups(nextGroups);
      setInvitations(invitationsResponse.invitations ?? []);

      // Load members for selected group
      if (selectedGroupId) {
        try {
          const membersResponse = await getGroupMembers(selectedGroupId);
          setMembers(membersResponse.members ?? []);
        } catch {
          setMembers([]);
        }
      }
    } catch (err) {
      setError(err?.message || "Failed to load workspace data");
    } finally {
      setLoading(false);
    }
  }

  async function loadMembers(groupId) {
    if (!groupId) {
      setMembers([]);
      return;
    }
    try {
      const res = await getGroupMembers(groupId);
      setMembers(res.members ?? []);
    } catch {
      setMembers([]);
    }
  }

  useEffect(() => {
    loadWorkspaceData();
  }, []);

  return {
    groups,
    invitations,
    members,
    loading,
    error,
    refetch: loadWorkspaceData,
    loadMembers,
    setInvitations,
  };
}
