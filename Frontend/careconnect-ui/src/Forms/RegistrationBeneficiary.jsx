
import "../CSS/index.css";
import { useState } from "react";

export const RegistrationBeneficiary = () => {
  // State management
  const [user, setUser] = useState({
    BeneficiaryType: "",
    BeneficiaryName: "",
    mobileNumber: "",
    email: "",
    password: "",
    contactPersonName: "",
    contactPersonMobile: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    RegistrationDocName: "",
    registrationNumber: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  /* ========== Event Handlers ========== */
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setUser(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /* ========== Validation ========== */
  
  const validate = () => {
    const newErrors = {};

    // Beneficiary Type validation
    if (!user.BeneficiaryType) {
      newErrors.BeneficiaryType = "Please select a beneficiary type";
    }

    // Beneficiary Name validation
    if (!user.BeneficiaryName.trim()) {
      newErrors.BeneficiaryName = "Beneficiary name is required";
    }

    // Email validation
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile Number validation
    if (!user.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(user.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be 10 digits starting with 6-9";
    }

    // Password validation
    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Contact Person Name validation
    if (!user.contactPersonName.trim()) {
      newErrors.contactPersonName = "Contact person name is required";
    }

    // Contact Person Mobile validation
    if (!user.contactPersonMobile.trim()) {
      newErrors.contactPersonMobile = "Contact person mobile is required";
    } else if (!/^[6-9]\d{9}$/.test(user.contactPersonMobile)) {
      newErrors.contactPersonMobile = "Contact mobile must be 10 digits starting with 6-9";
    }

    // Address Line 1 validation
    if (!user.address_line1.trim()) {
      newErrors.address_line1 = "Address line 1 is required";
    }

    // City validation
    if (!user.city.trim()) {
      newErrors.city = "City is required";
    }

    // State validation
    if (!user.state.trim()) {
      newErrors.state = "State is required";
    }

    // Pincode validation
    if (!user.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(user.pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    // Country validation
    if (!user.country.trim()) {
      newErrors.country = "Country is required";
    }

    // Registration Document Name validation
    if (!user.RegistrationDocName.trim()) {
      newErrors.RegistrationDocName = "Registration document name is required";
    }

    // Registration Number validation
    if (!user.registrationNumber.trim()) {
      newErrors.registrationNumber = "Registration number is required";
    }

    return newErrors;
  };

  /* ========== Form Submission ========== */
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus("");

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus("Please fix the errors above");
      return;
    }

    console.log("✅ FORM SUBMITTED - FINAL DATA:", user);
    setSubmitStatus("Form submitted successfully!");
    
  
  };

  /* ========== Render UI ========== */
  
  return (
    <div className="registration-container">
      <h2>Beneficiary Registration</h2>
      
      <form onSubmit={handleSubmit} noValidate>
        {/* Beneficiary Type */}
        <div className="form-group">
          <label>Beneficiary Type *</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="BeneficiaryType"
                value="orphanage"
                checked={user.BeneficiaryType === "orphanage"}
                onChange={handleInputChange}
                required
              />
              Orphanage
            </label>
            <label>
              <input
                type="radio"
                name="BeneficiaryType"
                value="oldage"
                checked={user.BeneficiaryType === "oldage"}
                onChange={handleInputChange}
                required
              />
              Old Age Home
            </label>
          </div>
          {errors.BeneficiaryType && (
            <span className="error">{errors.BeneficiaryType}</span>
          )}
        </div>

        {/* Beneficiary Name */}
        <div className="form-group">
          <label>Beneficiary Name *</label>
          <input
            type="text"
            name="BeneficiaryName"
            value={user.BeneficiaryName}
            onChange={handleInputChange}
            placeholder="Enter beneficiary name"
            required
          />
          {errors.BeneficiaryName && (
            <span className="error">{errors.BeneficiaryName}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email *</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Mobile Number */}
        <div className="form-group">
          <label>Mobile Number *</label>
          <input
            type="tel"
            name="mobileNumber"
            value={user.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter 10-digit mobile number"
            maxLength="10"
            required
          />
          {errors.mobileNumber && (
            <span className="error">{errors.mobileNumber}</span>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password *</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="Enter password (min 6 characters)"
              required
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(p => !p)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Contact Person Name */}
        <div className="form-group">
          <label>Contact Person Name *</label>
          <input
            type="text"
            name="contactPersonName"
            value={user.contactPersonName}
            onChange={handleInputChange}
            placeholder="Enter contact person name"
            required
          />
          {errors.contactPersonName && (
            <span className="error">{errors.contactPersonName}</span>
          )}
        </div>

        {/* Contact Person Mobile */}
        <div className="form-group">
          <label>Contact Person Mobile Number *</label>
          <input
            type="tel"
            name="contactPersonMobile"
            value={user.contactPersonMobile}
            onChange={handleInputChange}
            placeholder="Enter 10-digit mobile number"
            maxLength="10"
            required
          />
          {errors.contactPersonMobile && (
            <span className="error">{errors.contactPersonMobile}</span>
          )}
        </div>

        {/* Address Line 1 */}
        <div className="form-group">
          <label>Address Line 1 *</label>
          <input
            type="text"
            name="address_line1"
            value={user.address_line1}
            onChange={handleInputChange}
            placeholder="Enter address line 1"
            required
          />
          {errors.address_line1 && (
            <span className="error">{errors.address_line1}</span>
          )}
        </div>

        {/* Address Line 2 */}
        <div className="form-group">
          <label>Address Line 2</label>
          <input
            type="text"
            name="address_line2"
            value={user.address_line2}
            onChange={handleInputChange}
            placeholder="Enter address line 2 (optional)"
          />
        </div>

        {/* City */}
        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={handleInputChange}
            placeholder="Enter city"
            required
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        {/* State */}
        <div className="form-group">
          <label>State *</label>
          <input
            type="text"
            name="state"
            value={user.state}
            onChange={handleInputChange}
            placeholder="Enter state"
            required
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>

        {/* Pincode */}
        <div className="form-group">
          <label>Pincode *</label>
          <input
            type="text"
            name="pincode"
            value={user.pincode}
            onChange={handleInputChange}
            placeholder="Enter 6-digit pincode"
            maxLength="6"
            required
          />
          {errors.pincode && <span className="error">{errors.pincode}</span>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label>Country *</label>
          <input
            type="text"
            name="country"
            value={user.country}
            onChange={handleInputChange}
            placeholder="Enter country"
            required
          />
          {errors.country && <span className="error">{errors.country}</span>}
        </div>

        {/* Registration Document Name */}
        <div className="form-group">
          <label>
            {user.BeneficiaryType
              ? `${user.BeneficiaryType === "oldage" ? "Old Age Home" : "Orphanage"} Registration Document Name *`
              : "Registration Document Name *"}
          </label>
          <input
            type="text"
            name="RegistrationDocName"
            value={user.RegistrationDocName}
            onChange={handleInputChange}
            placeholder="Enter registration document name"
            required
          />
          {errors.RegistrationDocName && (
            <span className="error">{errors.RegistrationDocName}</span>
          )}
        </div>

        {/* Registration Number */}
        <div className="form-group">
          <label>  {user.BeneficiaryType
              ? `${
                  user.BeneficiaryType === "oldage"
                    ? "Old Age Home"
                    : "Orphanage"
                } Registration Number *`
              : "Registration Number *"} </label>
          <input
            type="text"
            name="registrationNumber"
            value={user.registrationNumber}
            onChange={handleInputChange}
            placeholder="Enter registration number"
            required
          />
          {errors.registrationNumber && (
            <span className="error">{errors.registrationNumber}</span>
          )}
        </div>

        {/* Submit Status Message */}
        {submitStatus && (
          <div className={`submit-status ${submitStatus.includes("success") ? "success" : "error"}`}>
            {submitStatus}
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};