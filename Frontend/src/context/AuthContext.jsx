import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import { AUTH_TOKEN_KEY } from "../api/axios";
import {
  getMe,
  login as loginRequest,
  logout as logoutRequest,
} from "../api/auth.api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshAuth() {
    try {
      const response = await getMe();
      setUser(response.user ?? null);
      return response.user ?? null;
    } catch {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
      }
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshAuth();
  }, []);

  async function login(credentials) {
    const response = await loginRequest(credentials);
    if (response.token && typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_TOKEN_KEY, response.token);
    }
    const nextUser = response.user ?? null;
    setUser(nextUser);
    return response;
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
      }
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login,
      logout,
      refreshAuth,
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
