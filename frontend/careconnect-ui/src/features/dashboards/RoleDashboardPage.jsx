import { useAuth } from "../../app/AuthProvider";
import { useNavigate } from "react-router-dom";

const RoleDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role;

  const getMessageByRole = () => {
    switch (role) {
      case "ADMIN":
        return "🛠️ Admin Dashboard Coming Soon";
      case "BENEFICIARY":
        return "🏥 Beneficiary Dashboard Coming Soon";
      case "ORGANIZATION_DONOR":
        return "🏢 Organization Donor Dashboard Coming Soon";
      case "INDIVIDUAL_DONOR":
      default:
        return "💝 Donor Dashboard Coming Soon";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">CareConnect</h1>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center text-center px-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            {getMessageByRole()}
          </h2>
          <p className="text-gray-600">
            Your account is approved. We’re building features for this role.
            Please check back soon.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © 2026 CareConnect | Privacy | Terms | Support
      </footer>
    </div>
  );
};

export default RoleDashboardPage;
