import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest, postJson } from "../lib/api";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    apiRequest("/api/admin/session")
      .then((result) => { if (active) setAdmin(result.admin); })
      .catch(() => { if (active) setAdmin(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const value = useMemo(() => ({
    admin,
    loading,
    async login(email, password) {
      const result = await postJson("/api/admin/login", { email, password });
      setAdmin(result.admin);
      return result.admin;
    },
    async logout() {
      await postJson("/api/admin/logout", {});
      setAdmin(null);
    },
  }), [admin, loading]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const value = useContext(AdminAuthContext);
  if (!value) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return value;
}
