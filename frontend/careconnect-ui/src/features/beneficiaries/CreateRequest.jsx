import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHelpRequest } from "../../services/beneficiaryService";

export default function CreateRequest() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    requestType: "",
    description: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (!form.requestType) return "Request type is required";
    if (!form.description.trim()) return "Description is required";
    if (!form.quantity || Number(form.quantity) <= 0)
      return "Valid quantity is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await createHelpRequest({
        requestType: form.requestType,
        description: form.description.trim(),
        quantity: Number(form.quantity),
      });

      alert("✅ Help request created successfully!");
      navigate("/beneficiary");
    } catch (err) {
      setError(err?.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* HEADER */}
        <div className="px-8 pt-8 pb-6 border-b">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Help Request
          </h1>
          <p className="text-gray-500 mt-1">
            Provide accurate details so donors can help effectively.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* REQUEST TYPE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Type <span className="text-red-500">*</span>
            </label>
            <select
              name="requestType"
              value={form.requestType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            >
              <option value="">Select a category</option>
              <option value="FOOD"> Food Supplies</option>
              <option value="CLOTHES"> Clothing</option>
              <option value="MEDICINE"> Medical Aid</option>
              <option value="EDUCATION">Education</option>
              <option value="OTHER"> Other Needs</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Explain what you need and why it is required..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm resize-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white text-sm font-semibold hover:bg-green-700 focus:ring-4 focus:ring-green-300 disabled:opacity-60"
            >
              {loading && (
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                  />
                </svg>
              )}
              {loading ? "Submitting..." : "Submit Request"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/beneficiary")}
              className="flex-1 rounded-lg bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
