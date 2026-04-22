import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getMe,
  loginUser as loginApi,
  logoutUser as logoutApi,
  registerUser as registerApi,
} from "../api/auth";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeUser = useCallback((payload) => {
    if (!payload || typeof payload !== "object") return null;
    if (payload.user && typeof payload.user === "object") return payload.user;
    if (
      payload.id ||
      payload._id ||
      payload.email ||
      payload.role ||
      payload.name
    )
      return payload;
    return null;
  }, []);

  const refreshMe = useCallback(async () => {
    try {
      const meResponse = await getMe();
      if (typeof meResponse === "string") {
        // Backend currently returns placeholder text for /me.
        setUser(
          (prev) => prev || { name: "User", role: "employee", raw: meResponse },
        );
      } else {
        setUser(normalizeUser(meResponse));
      }
    } catch {
      setUser(null);
    }
  }, [normalizeUser]);

  const login = useCallback(
    async (credentials) => {
      const response = await loginApi(credentials);
      const normalizedFromLogin = normalizeUser(response);
      if (normalizedFromLogin) {
        setUser(normalizedFromLogin);
      }
      await refreshMe();
      return response;
    },
    [normalizeUser, refreshMe],
  );

  const register = useCallback(async (data) => {
    return registerApi(data);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    async function init() {
      await refreshMe();
      setLoading(false);
    }
    init();
  }, [refreshMe]);

  const value = useMemo(() => {
    return { user, loading, login, register, logout, refreshMe };
  }, [user, loading, login, register, logout, refreshMe]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
