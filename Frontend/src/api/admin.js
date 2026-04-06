import { apiFetch } from "./http";

export function createAdminTask(data) {
  return apiFetch("/api/admin/tasks", {
    method: "POST",
    body: data,
  });
}
