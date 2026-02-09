import { useEffect, useState } from "react";
import { useAuth } from "../../app/AuthProvider";
import {
  getAllUsers,
  approveUser,
  getAllRequests,
  updateRequestStatus,
} from "../../services/adminService";

/* ================= MAIN ================= */
const AdminDashboard = () => {
  const { logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [view, setView] = useState("users");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    setLoading(true);

    const [u, r] = await Promise.all([
      getAllUsers(),
      getAllRequests(),
    ]);

    /* ✅ NORMALIZE USERS (FIX #1) */
    const normalizedUsers = u.map((user) => ({
      ...user,
      approved:
        user.approved === true ||
        user.approved === 1 ||
        user.approved === "1",
    }));

    /* ✅ NORMALIZE REQUESTS (FIX #2) */
    const normalizedRequests = r.map((req) => ({
      ...req,
      requestId: req.requestId ?? req.request_id,
      status: (req.status || "OPEN").toUpperCase(),
      approvedByAdmin:
        req.approvedByAdmin === true ||
        req.approvedByAdmin === 1 ||
        req.approved_by_admin === 1,
    }));

    setUsers(normalizedUsers);
    setRequests(normalizedRequests);
    setLoading(false);
  };

  /* ================= USER APPROVE ================= */
  const handleApproveUser = async (email) => {
    if (!window.confirm("Approve this user?")) return;

    await approveUser(email);

    setUsers((prev) =>
      prev.map((u) =>
        u.email === email ? { ...u, approved: true } : u
      )
    );
  };

  /* ================= REQUEST APPROVE ================= */
  const handleApproveRequest = async (requestId) => {
    if (!window.confirm("Approve this request?")) return;

    await updateRequestStatus(requestId, "APPROVED");

    setRequests((prev) =>
      prev.map((r) =>
        r.requestId === requestId
          ? { ...r, approvedByAdmin: true, status: "APPROVED" }
          : r
      )
    );
  };

  /* ================= REQUEST REJECT ================= */
  const handleRejectRequest = async (requestId) => {
    if (!window.confirm("Reject this request?")) return;

    await updateRequestStatus(requestId, "REJECTED");

    setRequests((prev) =>
      prev.map((r) =>
        r.requestId === requestId
          ? { ...r, status: "REJECTED" }
          : r
      )
    );
  };

  /* ================= CORRECT COUNTS (FIX #3) ================= */
  const totalUsers = users.length;

  const pendingUsers = users.filter(
    (u) => u.approved === false
  ).length;

  const openRequests = requests.filter(
    (r) => r.status === "OPEN"
  ).length;

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="px-6 py-5 text-xl font-bold text-blue-600">
          Admin Panel
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setView("users")}
            className={`w-full px-4 py-2 rounded-lg text-left ${
              view === "users"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            👤 Users
          </button>

          <button
            onClick={() => setView("requests")}
            className={`w-full px-4 py-2 rounded-lg text-left ${
              view === "requests"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            📄 Requests(upcoming..)
          </button>
        </nav>

        <button
          onClick={logout}
          className="m-4 text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6">
        {/* ================= STATS (NOW CORRECT) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Total Users" value={totalUsers} />
          <StatCard title="Pending Users" value={pendingUsers} />
          <StatCard title="Open Requests" value={openRequests} />
        </div>

        <div className="bg-white rounded-xl shadow">
          <div className="border-b px-6 py-4 text-lg font-semibold">
            {view === "users"
              ? "User Management"
              : "Request Management"}
          </div>

          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : view === "users" ? (
            <UsersTable users={users} onApprove={handleApproveUser} />
          ) : (
            <RequestsTable
              requests={requests}
              onApprove={handleApproveRequest}
              onReject={handleRejectRequest}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

/* ================= USERS TABLE ================= */
const UsersTable = ({ users, onApprove }) => (
  <table className="w-full text-sm">
    <tbody>
      {users.map((u) => (
        <tr key={u.email} className="border-t">
          <td className="p-4">{u.email}</td>
          <td className="p-4">
            {!u.approved ? (
              <button
                onClick={() => onApprove(u.email)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
            ) : (
              <span className="text-green-600 font-medium">
                Approved
              </span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

/* ================= REQUESTS TABLE ================= */
const RequestsTable = ({ requests, onApprove, onReject }) => (
  <table className="w-full text-sm">
    <thead className="bg-gray-50">
      <tr>
        <Th>TYPE</Th>
        <Th>DESCRIPTION</Th>
        <Th>QTY</Th>
        <Th>STATUS</Th>
        <Th>APPROVED BY ADMIN</Th>
      </tr>
    </thead>

    <tbody>
      {requests.map((r) => (
        <tr key={r.requestId} className="border-t">
          <Td>{r.requestType}</Td>
          <Td>{r.description}</Td>
          <Td>{r.quantity}</Td>

          <Td>
            <select
              value={r.status}
              disabled={r.status !== "OPEN"}
              onChange={() => onReject(r.requestId)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="OPEN">OPEN</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </Td>

          <Td>
            <button
              disabled={r.approvedByAdmin}
              onClick={() => onApprove(r.requestId)}
              className={`px-3 py-1 rounded text-white ${
                r.approvedByAdmin
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {r.approvedByAdmin ? "Approved" : "Approve"}
            </button>
          </Td>
        </tr>
      ))}
    </tbody>
  </table>
);

/* ================= UI HELPERS ================= */
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-5">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold mt-1">{value}</div>
  </div>
);

const Th = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap">{children}</td>
);
