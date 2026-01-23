
import "../CSS/index.css";
import { useState } from "react";

export const RegistrationDonor = () => {
  const [user, setUser] = useState({
    donarName: "",
    donarType: "", // individual | organization
    email: "",
    mobileNumber: "",
    password: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",

    identificationProof: "",
    identificationNumber: "",      // for individual
    registrationNumber: "",        // for organization
    otherDocName: ""               // ONLY when proof = other
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  /* -------------------- helpers -------------------- */

  const individualDocs = [
    { value: "aadhar", label: "Aadhar Card", placeholder: "Enter Aadhar Number" },
    { value: "pan", label: "PAN Card", placeholder: "Enter PAN Number" },
    { value: "dl", label: "Driving Licence", placeholder: "Enter DL Number" },
    { value: "voter", label: "Voter ID", placeholder: "Enter Voter ID Number" },
    { value: "other", label: "Other" }
  ];

  const organizationDocs = [
    { value: "gstin", label: "GSTIN", placeholder: "Enter GSTIN Number" },
    { value: "msme", label: "MSME", placeholder: "Enter MSME Number" },
    { value: "cin", label: "CIN", placeholder: "Enter CIN Number" },
    { value: "other", label: "Other" }
  ];

  const currentDocs =
    user.donarType === "individual" ? individualDocs :
    user.donarType === "organization" ? organizationDocs : [];

  const currentDoc = currentDocs.find(
    d => d.value === user.identificationProof
  );

  /* -------------------- handlers -------------------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!/^\S+@\S+\.\S+$/.test(user.email))
      newErrors.email = "Invalid email format";

    if (!/^[6-9]\d{9}$/.test(user.mobileNumber))
      newErrors.mobileNumber = "Invalid mobile number";

    if (user.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("FINAL DATA:", user);
  };

  /* -------------------- UI -------------------- */

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="container">
        <h2>Donor Registration</h2>

        {/* Donor Name */}
        <label>Donor Name</label>
        <input
          name="donarName"
          value={user.donarName}
          onChange={handleInputChange}
          required
        />

        {/* Donor Type */}
        <label>Donor Type</label>
        <select
          name="donarType"
          value={user.donarType}
          onChange={handleInputChange}
          required
        >
          <option value="">Select</option>
          <option value="individual">Individual</option>
          <option value="organization">Organization</option>
        </select>

        {/* Email */}
        <label>Email</label>
        <input
          name="email"
          value={user.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* Mobile */}
        <label>Mobile Number</label>
        <input
          name="mobileNumber"
          value={user.mobileNumber}
          onChange={handleInputChange}
          required
        />
        {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}

        {/* Password */}
        <label>Password</label>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type={showPassword ? "text" : "password"}
            // type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            required
          />

          <button type="button" onClick={() => setShowPassword(p => !p)}>
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>
        {errors.password && <p className="error">{errors.password}</p>}

        {/* Address Line 1 */}
<label>Address Line 1</label>
<input
  name="address_line1"
  value={user.address_line1}
  onChange={handleInputChange}
  placeholder="House no, Street, Area"
  required
/>

{/* Address Line 2 (optional) */}
<label>Address Line 2</label>
<input
  name="address_line2"
  value={user.address_line2}
  onChange={handleInputChange}
  placeholder="Landmark (optional)"
/>

{/* City */}
<label>City</label>
<input
  name="city"
  value={user.city}
  onChange={handleInputChange}
  required
/>

{/* State */}
<label>State</label>
<input
  name="state"
  value={user.state}
  onChange={handleInputChange}
  required
/>

{/* Pincode */}
<label>Pincode</label>
<input
  name="pincode"
  value={user.pincode}
  onChange={handleInputChange}
  pattern="[0-9]{6}"
  placeholder="6-digit pincode"
  required
/>

{/* Country */}
<label>Country</label>
<input
  name="country"
  value={user.country}
  onChange={handleInputChange}
  required
/>



        {/* Identification Proof */}
        {user.donarType && (
          <>
            <label>Identification Proof</label>
            <select
              name="identificationProof"
              value={user.identificationProof}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Document</option>
              {currentDocs.map(doc => (
                <option key={doc.value} value={doc.value}>
                  {doc.label}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Other Document Name */}
        {user.identificationProof === "other" && (
          <>
            <label>Document Name</label>
            <input
              name="otherDocName"
              value={user.otherDocName}
              onChange={handleInputChange}
              placeholder="Enter document name"
              required
            />
          </>
        )}

        {/* Document Number */}
        {user.identificationProof && (
          <>
            <label>
              {user.donarType === "individual"
                ? "Identification Number"
                : "Registration Number"}
            </label>

            <input
              name={
                user.donarType === "individual"
                  ? "identificationNumber"
                  : "registrationNumber"
              }
              value={
                user.donarType === "individual"
                  ? user.identificationNumber
                  : user.registrationNumber
              }
              onChange={handleInputChange}
              placeholder={
                user.identificationProof === "other"
                  ? "Enter document number"
                  : currentDoc?.placeholder
              }
              required
            />
          </>
        )}

        <button type="submit">Register</button>
      </div>
    </form>
  );
};
