import api from "./axios";

export async function getPersonalTasks() {
  const res = await api.get("/tasks/personal");
  return res.data;
}

export async function createPersonalTask(data) {
  const res = await api.post("/tasks/personal", data);
  return res.data;
}

export async function updatePersonalTask(taskId, data) {
  const res = await api.patch(`/tasks/personal/${taskId}`, data);
  return res.data;
}

export async function deletePersonalTask(taskId) {
  const res = await api.delete(`/tasks/personal/${taskId}`);
  return res.data;
}
