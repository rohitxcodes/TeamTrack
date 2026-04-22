import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="tt-card p-8 grid place-items-center text-slate-700">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
