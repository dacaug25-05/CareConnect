/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { registerApi } from "../../services/authService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    mobile: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Limit mobile input to 10 digits
    if (name === "mobile" && value.length > 10) {
      return;
    }
    
    setForm({ ...form, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    const { email, password, mobile, role } = form;

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    // Mobile validation
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(mobile)) {
        newErrors.mobile = "Mobile number must be exactly 10 digits.";
      }
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    // Role validation
    if (!role) {
      newErrors.role = "Please select a role.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await registerApi(form);
      navigate("/pending-approval");
    } catch (err) {
      setErrors({
        submit: "Registration failed. Email or mobile may already exist.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {errors.submit && (
          <p className="text-red-600 text-sm mb-4 text-center bg-red-50 p-3 rounded">
            {errors.submit}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <Input
              label={
                <>
                  Email <span className="text-red-600">*</span>
                </>

              }
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
             placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              label={
                <>
                  Mobile <span className="text-red-600">*</span>
                </>
              }
              name="mobile"
              type="text"
              value={form.mobile}
              onChange={handleChange}
               placeholder="10 digit number"
            />
            {errors.mobile && (
              <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          <div>
            <Input
              label={
                <>
                  Password <span className="text-red-600">*</span>
                </>
              }
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
               placeholder="Minimum 6 characters required"
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Role <span className="text-red-600">*</span>
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className={`border rounded-md px-3 py-2 ${
                errors.role ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Role</option>
              <option value="INDIVIDUAL_DONOR">Individual Donor</option>
              <option value="ORGANIZATION_DONOR">Organization Donor</option>
              <option value="BENEFICIARY">Beneficiary</option>
            </select>
            {errors.role && (
              <p className="text-red-600 text-xs mt-1">{errors.role}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>

        <p className="text-sm text-center mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;