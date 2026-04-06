import { apiFetch } from "./http";

export function registerUser(data) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: data,
  });
}

export function loginUser(data) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: data,
  });
}

export function logoutUser() {
  return apiFetch("/api/auth/logout", {
    method: "POST",
  });
}

export function getMe() {
  return apiFetch("/api/auth/me", {
    method: "GET",
  });
}
