import { useEffect, useState } from "react";
import { getMyHelpRequests } from "../../services/beneficiaryService";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getMyHelpRequests();
        setRequests(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              My Help Requests
            </h1>
            <p className="text-gray-600 text-lg">Track all your requests and their status</p>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-5 py-3 text-lg font-medium focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200"
          >
            <option value="all">All Status ({requests.length})</option>
            <option value="open">Open</option>
            <option value="initiated">Initiated</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-3 text-lg text-gray-600">Loading requests...</span>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No requests found
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === "all" 
                ? "Create your first help request to get started" 
                : `No ${filter} requests found`
              }
            </p>
            <a 
              href="/beneficiary/requests/new" 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create New Request
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Approved</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((req) => (
                  <tr key={req.request_id || Math.random()} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-5 whitespace-nowrap font-semibold text-gray-900">
                      <div className="flex items-center">
                        <span className="ml-3 text-lg">{req.request_type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">
                      {req.quantity}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.approved_by_admin 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {req.approved_by_admin ? '✅ Yes' : '❌ No'}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                      {new Date(req.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    open: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    initiated: "bg-blue-100 text-blue-800 border border-blue-200",
    completed: "bg-green-100 text-green-800 border border-green-200",
    cancelled: "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold border ${styles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}
