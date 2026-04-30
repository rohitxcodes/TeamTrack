import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
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
    const nextUser = response.user ?? null;
    setUser(nextUser);
    return response;
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
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
