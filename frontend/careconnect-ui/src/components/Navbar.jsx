import { Link } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();                     // clears auth
    window.location.replace("/"); // ✅ force landing page
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/" className="font-semibold">
        CareConnect
      </Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <span className="capitalize">{user.role}</span>
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
