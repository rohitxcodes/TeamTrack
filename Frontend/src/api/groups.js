import { apiFetch } from "./http";

export function getMyGroups() {
  return apiFetch("/api/groups/my", {
    method: "GET",
  });
}
