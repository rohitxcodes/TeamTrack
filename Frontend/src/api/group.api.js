import api from "./axios";

export async function getMyGroups() {
  const res = await api.get("/groups");
  return res.data;
}

export async function createGroup(data) {
  const res = await api.post("/groups", data);
  return res.data;
}

export async function getGroupMembers(groupId) {
  const res = await api.get(`/groups/${groupId}`);
  return res.data;
}

export async function inviteGroupMember(groupId, data) {
  const res = await api.post(`/groups/${groupId}/invite`, data);
  return res.data;
}

export async function getGroupTasks(groupId, params = {}) {
  const res = await api.get(`/groups/${groupId}/tasks`, { params });
  return res.data;
}

export async function createGroupTask(groupId, data) {
  const res = await api.post(`/groups/${groupId}/tasks`, data);
  return res.data;
}

export async function updateGroupTask(groupId, taskId, data) {
  const res = await api.patch(`/groups/${groupId}/tasks/${taskId}`, data);
  return res.data;
}

export async function deleteGroupTask(groupId, taskId) {
  const res = await api.delete(`/groups/${groupId}/tasks/${taskId}`);
  return res.data;
}
