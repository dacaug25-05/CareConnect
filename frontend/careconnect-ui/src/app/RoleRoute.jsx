import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  // ⏳ WAIT until user is loaded
  if (loading) return null;

  // 🔐 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🧪 DEBUG (temporary – keep until confirmed)
  console.log("ROLE CHECK:", user.role, allowedRoles);

  // 🚫 Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default RoleRoute;
