import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useBeneficiaryProfile from "../../hooks/BeneficiaryProfile";
import { getMyHelpRequests } from "../../services/beneficiaryService";

export default function BeneficiaryDashboard() {
  const { profile, loading: profileLoading, error } = useBeneficiaryProfile();

  const [requests, setRequests] = useState([]);
  const [reqLoading, setReqLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getMyHelpRequests();
        setRequests(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setReqLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Beneficiary Dashboard
          </h1>
          <p className="text-gray-500">
            Welcome, {profile?.name || "Beneficiary"}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Link
            to="/beneficiary/profile"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Edit Profile
          </Link>
          <Link
            to="/beneficiary/requests/new"
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
          >
            New Request
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Requests"
          value={requests.length}
          color="bg-blue-100 text-blue-700"
        />
        <StatCard
          title="Open"
          value={requests.filter((r) => r.status === "OPEN").length}
          color="bg-yellow-100 text-yellow-700"
        />
        {/* <StatCard
          title="Approved"
          value={requests.filter((r) => r.approved_by_admin === 1).length}
          color="bg-green-100 text-green-700"
        /> */}
        {/* <StatCard
          title="Verified"
          value={profile?.verified ? "Yes" : "No"}
          color="bg-purple-100 text-purple-700"
        /> */}
      </div>

      {/* REQUEST TABLE */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">My Help Requests</h2>

        {reqLoading ? (
          <p className="text-gray-500">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-500">
            You haven't created any requests yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="text-left px-3 py-2">Request</th>
                  <th className="text-left px-3 py-2">Quantity</th>
                  <th className="text-left px-3 py-2">Status</th>
                  <th className="text-left px-3 py-2">Approved</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <RequestRow key={r.request_id} data={r} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}

/* ================= HELPERS ================= */

function StatCard({ title, value, color }) {
  return (
    <div className={`rounded-xl p-4 ${color} flex flex-col shadow-sm`}>
      <span className="text-sm font-medium opacity-90">{title}</span>
      <span className="text-2xl font-bold mt-1">{value}</span>
    </div>
  );
}

/* ================= REQUEST ROW ================= */

function RequestRow({ data }) {
  return (
    <tr className="border-b last:border-none hover:bg-gray-50">
      {/* TYPE + DESCRIPTION */}
      <td className="px-3 py-2">
        <div className="font-medium text-gray-900">
          {data.request_type}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {data.description}
        </div>
      </td>

      {/* QUANTITY */}
      <td className="px-3 py-2">{data.quantity}</td>

      {/* STATUS */}
      <td className="px-3 py-2">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            data.status === "APPROVED"
              ? "bg-yellow-100 text-yellow-800"
              : data.status === "APPROVED"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {data.status}
        </span>
      </td>

      {/* APPROVED BY ADMIN (TEXT ONLY) */}
      <td className="px-3 py-2 font-medium">
        {data.approved_by_admin === 1 ? (
          <span className="text-green-700">Approved</span>
        ) : (
          <span className="text-green-600">Approved</span>
        )}
      </td>
    </tr>
  );
}
