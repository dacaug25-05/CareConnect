import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthProvider";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { createOrUpdateOrganizationDonor  } from "../../services/donorService";

const OrganizationDonorProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    orgName: "",
    orgType: "",
    regNo: "",
    contactPerson: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOrUpdateOrganizationDonor (form, user.token);
      navigate("/post-login");
    } catch {
      alert("Failed to save organization profile");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">
          Organization Donor Profile
        </h2>

        <div className="space-y-4">
          <Input label="Organization Name" name="orgName" onChange={handleChange} />
          <Input label="Organization Type" name="orgType" onChange={handleChange} />
          <Input label="Registration No" name="regNo" onChange={handleChange} />
          <Input label="Contact Person" name="contactPerson" onChange={handleChange} />
          <Input label="City" name="city" onChange={handleChange} />
          <Input label="State" name="state" onChange={handleChange} />
          <Input label="Pincode" name="pincode" onChange={handleChange} />
        </div>

        <div className="mt-6">
          <Button>Save Profile</Button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationDonorProfile;
