import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../app/AuthProvider";

const OrganizationDonorDashboard = () => {
  const { logout } = useAuth();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApprovedRequests();
  }, []);

  const loadApprovedRequests = async () => {
    try {
      const res = await api.get("/api/requests/approved");
      setRequests(res.data || []);
    } catch (err) {
      console.error("Failed to load approved requests", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DETAIL VIEW ================= */
  if (selectedRequest) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* NAVBAR */}
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
          <h1 className="text-xl font-bold">CareConnect</h1>
          <button onClick={logout} className="text-sm hover:underline">
            Logout
          </button>
        </nav>

        <div className="max-w-4xl mx-auto p-6">
          <button
            onClick={() => setSelectedRequest(null)}
            className="mb-4 text-sm text-blue-600 hover:underline"
          >
            ← Back to all requests
          </button>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedRequest.requestType}
            </h2>

            <p className="text-gray-600 mb-4">
              {selectedRequest.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm text-gray-500">
                  Quantity Needed
                </span>
                <div className="font-semibold">
                  {selectedRequest.quantity}
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">Status</span>
                <div className="inline-block px-3 py-1 rounded text-sm bg-green-100 text-green-700">
                  {selectedRequest.status}
                </div>
              </div>
            </div>

            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Proceed to Donate
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= LIST VIEW ================= */
  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">CareConnect</h1>
        <button onClick={logout} className="text-sm hover:underline">
          Logout
        </button>
      </nav>

      {/* HEADER */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h2 className="text-2xl font-bold">
            Organization Donor Dashboard
          </h2>
          <p className="text-gray-600">
            Approved requests you can support
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <p className="text-gray-500">Loading requests...</p>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center text-gray-600">
            No approved requests available right now.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req.requestId}
                className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedRequest(req)}
              >
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-1">
                    {req.requestType}
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {req.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Qty: {req.quantity}
                    </span>

                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                      {req.status}
                    </span>
                  </div>
                </div>

                <div className="border-t px-6 py-3 text-center text-sm font-semibold text-blue-600">
                  View Details
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationDonorDashboard;
