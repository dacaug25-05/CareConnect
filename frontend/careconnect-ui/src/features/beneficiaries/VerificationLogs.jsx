import { useEffect, useState } from "react";
import { getVerificationLogs } from "../../services/beneficiaryService";

export default function VerificationLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getVerificationLogs();
        setLogs(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = filter === "all"
    ? logs
    : logs.filter((l) => l.entity_type === filter);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
              Verification Logs
            </h1>
            <p className="text-xl text-gray-600">Track verification activities across your platform</p>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full lg:w-auto border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg font-semibold focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 bg-white/60"
          >
            <option value="all">All Entities ({logs.length})</option>
            <option value="BENEFICIARY">👥 Beneficiaries</option>
            <option value="DONOR">❤️ Donors</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mr-4"></div>
            <span className="text-2xl text-gray-600 font-semibold">Loading verification logs...</span>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-32 h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8 p-6">
              <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">No logs found</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              {filter === "all" 
                ? "No verification activities recorded yet"
                : `No ${filter} verification logs available`
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border-2 border-gray-200/50 shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-linear-to-r from-indigo-50 to-blue-50">
                <tr>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Entity Type</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Entity ID</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Verified By</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date & Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredLogs.map((log, index) => (
                  <tr 
                    key={log.log_id || log.id || `log-${index}`} 
                    className="hover:bg-linear-to-r hover:from-indigo-50 hover:to-blue-50 transition-all duration-200 group"
                  >
                    <td className="px-8 py-6 whitespace-nowrap font-semibold text-lg text-gray-900 group-hover:text-indigo-700">
                      <div className="flex items-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold mr-3 ${
                          log.entity_type === 'BENEFICIARY' 
                            ? 'bg-linear-to-r from-purple-100 to-pink-100 text-purple-800' 
                            : 'bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-800'
                        }`}>
                          {log.entity_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-lg font-mono bg-gray-50 rounded-xl border border-gray-200">
                      {log.entity_id}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap font-medium text-gray-800">
                      {log.verified_by || 'System'}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-600">
                      {new Date(log.verified_on).toLocaleString('en-IN', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SUMMARY */}
        {!loading && logs.length > 0 && (
          <div className="mt-8 p-6 bg-linear-to-r from-indigo-50 to-blue-50 rounded-2xl border-l-4 border-indigo-400">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                <span>Total Logs: <span className="font-bold text-lg">{logs.length}</span></span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                <span>Beneficiaries: <span className="font-bold text-lg">{logs.filter(l => l.entity_type === 'BENEFICIARY').length}</span></span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span>Donors: <span className="font-bold text-lg">{logs.filter(l => l.entity_type === 'DONOR').length}</span></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    VERIFIED: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200 shadow-sm",
    REJECTED: "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200 shadow-sm",
    PENDING: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200 shadow-sm",
  };

  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-bold border shadow-sm transition-all duration-200 hover:scale-105 ${
      styles[status] || 'bg-linear-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-200'
    }`}>
      {status === 'VERIFIED' && '✅ Verified'}
      {status === 'REJECTED' && '❌ Rejected'}
      {status === 'PENDING' && '⏳ Pending'}
      {status !== 'VERIFIED' && status !== 'REJECTED' && status !== 'PENDING' && status}
    </span>
  );
}
