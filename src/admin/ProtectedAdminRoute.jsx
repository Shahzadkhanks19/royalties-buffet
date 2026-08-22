import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  if (loading) return <div className="grid min-h-screen place-items-center bg-[#070707] text-sm font-bold uppercase tracking-[0.14em] text-[#d8ab4d]">Loading Admin...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}
