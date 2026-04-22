import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="tt-card p-8 grid place-items-center text-slate-700">
        Checking permissions...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;
