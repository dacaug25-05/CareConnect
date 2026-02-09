/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginApi } from "../../services/authService";
import { useAuth } from "../../app/AuthProvider";
import { getRedirectPathByRole } from "../../utils/roleRedirect";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    const { email, password } = form;

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
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
      const data = await loginApi(form);

      // Expected backend response:
      // { token, role, email }

      login(data);

      const redirectPath = getRedirectPathByRole(data);
      navigate(redirectPath);

    } catch (err) {
      setErrors({
        submit: "Invalid email or password",
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
          Login to CareConnect
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
                  Password <span className="text-red-600">*</span>
                </>
              }
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;