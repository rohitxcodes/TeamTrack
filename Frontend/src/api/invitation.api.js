import api from "./axios";

export async function getMyInvitations() {
  const res = await api.get("/invitations");
  return res.data;
}

export async function acceptInvitation(inviteId) {
  const res = await api.post(`/invitations/${inviteId}/accept`);
  return res.data;
}

export async function rejectInvitation(inviteId) {
  const res = await api.post(`/invitations/${inviteId}/reject`);
  return res.data;
}
