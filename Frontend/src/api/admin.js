import { apiFetch } from "./http";

export function createAdminTask(data) {
  return apiFetch("/api/admin/tasks", {
    method: "POST",
    body: data,
  });
}

export function getAdminUsers() {
  return apiFetch("/api/admin/users", {
    method: "GET",
  });
}

export function deleteAdminUser(userId) {
  return apiFetch(`/api/admin/users/${userId}`, {
    method: "DELETE",
  });
}

export function getAdminTasks() {
  return apiFetch("/api/admin/tasks", {
    method: "GET",
  });
}

export function deleteAdminTask(taskId) {
  return apiFetch(`/api/admin/tasks/${taskId}`, {
    method: "DELETE",
  });
}
