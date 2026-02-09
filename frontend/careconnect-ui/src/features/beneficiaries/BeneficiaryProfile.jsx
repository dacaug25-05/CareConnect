import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBeneficiaryProfile from "../../hooks/BeneficiaryProfile";

export default function BeneficiaryProfile() {
  const { profile, loading, error, saveProfile, deleteProfile } = useBeneficiaryProfile();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    name: "",
    contactPerson: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (profile) {
      setForm({
        type: profile.type || "",
        name: profile.name || "",
        contactPerson: profile.contact_person || "",
        mobile: profile.mobile || "",
        email: profile.email || "",
        city: profile.city || "",
        state: profile.state || "",
        pincode: profile.pincode || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (!form.type) return "Type is required";
    if (!form.name) return "Name is required";
    if (!form.contactPerson) return "Contact person is required";
    if (!form.mobile || form.mobile.length < 10) return "Valid mobile number required";
    if (!form.city) return "City is required";
    if (!form.state) return "State is required";
    if (!form.pincode) return "Pincode is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      setSaving(true);
      await saveProfile(form);
      alert("Profile saved successfully!");
      navigate("/beneficiary");
    } catch {
      // error handled in hook
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your profile?")) return;
    try {
      await deleteProfile();
      alert("Profile deleted successfully!");
      navigate("/dashboard");
    } catch {
      // handled in hook
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Beneficiary Profile
        </h1>
        <p className="text-gray-600 mb-8">Complete your profile to start receiving help</p>

        {error && <p className="text-red-600 mb-6 p-3 bg-red-50 rounded-lg">{error}</p>}
        {formError && <p className="text-red-600 mb-6 p-3 bg-red-50 rounded-lg">{formError}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TYPE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Type *
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select type</option>
                <option value="NGO">Old-Age Home</option>
                <option value="Individual">Orphanage</option>
              </select>
            </div>

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* CONTACT PERSON */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person *
              </label>
              <input
                name="contactPerson"
                value={form.contactPerson}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* MOBILE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* CITY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* STATE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* PINCODE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                name="pincode"
                type="number"
                value={form.pincode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
            {/* <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Delete Profile
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
