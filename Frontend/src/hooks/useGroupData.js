import { useState, useEffect } from "react";
import { getMyGroups, getGroupMembers, getGroupTasks } from "../api/group.api";

export function useGroupData(groupId) {
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadGroupData() {
    if (!groupId) {
      setGroups([]);
      setMembers([]);
      setTasks([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const [groupsResponse, membersResponse, tasksResponse] =
        await Promise.all([
          getMyGroups(),
          getGroupMembers(groupId),
          getGroupTasks(groupId),
        ]);

      setGroups(groupsResponse.groupForUser ?? []);
      setMembers(membersResponse.members ?? []);
      setTasks(tasksResponse.tasks ?? []);
    } catch (err) {
      setError(err?.message || "Failed to load group data");
    } finally {
      setLoading(false);
    }
  }

  // lightweight task refresher for near-real-time updates (admins see member changes)
  async function loadTasksOnly() {
    if (!groupId) return;
    try {
      const tasksResponse = await getGroupTasks(groupId);
      setTasks(tasksResponse.tasks ?? []);
    } catch (err) {
      // ignore task-only refresh errors to avoid noisy UI
    }
  }

  useEffect(() => {
    loadGroupData();

    if (!groupId) return undefined;

    const interval = setInterval(() => {
      loadTasksOnly();
    }, 3000);

    return () => clearInterval(interval);
  }, [groupId]);

  return {
    groups,
    members,
    tasks,
    loading,
    error,
    refetch: loadGroupData,
    setTasks,
  };
}
