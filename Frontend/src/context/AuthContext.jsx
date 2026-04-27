import { useMemo, useState } from "react";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "Student User",
    role: "admin",
    email: "student@example.com",
  });
  const [loading] = useState(false);

  async function login() {
    setUser({
      name: "Student User",
      role: "admin",
      email: "student@example.com",
    });
    return { message: "TODO: implement login logic" };
  }

  async function register() {
    return { message: "TODO: implement register logic" };
  }

  async function logout() {
    setUser(null);
    return { message: "TODO: implement logout logic" };
  }

  async function refreshMe() {
    return { message: "TODO: implement refreshMe logic" };
  }

  const value = useMemo(() => {
    return { user, loading, login, register, logout, refreshMe };
  }, [user, loading, login, register, logout, refreshMe]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
