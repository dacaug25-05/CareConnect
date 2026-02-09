import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../app/ProtectedRoute";
import RoleRoute from "../app/RoleRoute";

// Public Pages
import LandingPage from "../features/public/LandingPage";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import ForbiddenPage from "../features/public/ForbiddenPage";
import PendingApprovalPage from "../features/auth/PendingApprovalPage";

// Post Login Routing
import ProfileGate from "../features/users/ProfileGate";
import DonorProfileRouter from "../features/donors/DonorProfileRouter";
import RoleDashboardPage from "../features/dashboards/RoleDashboardPage";

// Beneficiary Pages
import BeneficiaryDashboard from "../features/beneficiaries/BeneficiaryDashboard";
import BeneficiaryProfile from "../features/beneficiaries/BeneficiaryProfile";
import CreateRequest from "../features/beneficiaries/CreateRequest";
import MyRequests from "../features/beneficiaries/MyRequests";
import VerificationLogs from "../features/beneficiaries/VerificationLogs";
import AdminDashboard from "../features/admin/AdminDashboard";
import OrganizationDonorDashboard from "../features/donors/OrganizationDonorDashboard";
import IndividualDonorDashboard from "../features/donors/IndividualDonorDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/403" element={<ForbiddenPage />} />

      {/* ================= POST LOGIN ================= */}
      <Route path="/post-login" element={<ProfileGate />} />
      <Route
        path="/pending-approval"
        element={<PendingApprovalPage />}
      />
  <Route
        path="/admin"
        element={<AdminDashboard />}
      />
      {/* ================= DASHBOARD REDIRECT ================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* ================= DONOR ================= */}
<Route
  path="/donor/profile"
  element={
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[
          "INDIVIDUAL_DONOR",
          "ORGANIZATION_DONOR",
        ]}
      >
        <DonorProfileRouter />
      </RoleRoute>
    </ProtectedRoute>
  }
/>


<Route
  path="/donor/ind"
  element={
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[
          "INDIVIDUAL_DONOR",
        ]}
      >
<IndividualDonorDashboard/>   </RoleRoute>
    </ProtectedRoute>
  }
/>


<Route
  path="/donor/org"
  element={
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[
          "ORGANIZATION_DONOR",
        ]}
      >
<OrganizationDonorDashboard   />   </RoleRoute>
    </ProtectedRoute>
  }
/>


      {/* ================= BENEFICIARY ================= */}
      <Route
        path="/beneficiary"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["BENEFICIARY"]}>
              <BeneficiaryDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/beneficiary/profile"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["BENEFICIARY"]}>
              <BeneficiaryProfile />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/beneficiary/requests"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["BENEFICIARY"]}>
              <MyRequests />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/beneficiary/requests/new"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["BENEFICIARY"]}>
              <CreateRequest />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/beneficiary/logs"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ADMIN", "NGO"]}>
              <VerificationLogs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      
      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<ForbiddenPage />} />
    </Routes>
  );
}
