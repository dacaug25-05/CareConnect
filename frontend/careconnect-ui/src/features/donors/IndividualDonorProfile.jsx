import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthProvider";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { createOrUpdateIndividualDonor  } from "../../services/donorService";

const IndividualDonorProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createOrUpdateIndividualDonor (form, user.token);
      navigate("/post-login");
    } catch {
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          Individual Donor Profile
        </h2>

        <div className="space-y-4">
          <Input label="First Name" name="firstName" onChange={handleChange} />
          <Input label="Last Name" name="lastName" onChange={handleChange} />
          <Input label="City" name="city" onChange={handleChange} />
          <Input label="State" name="state" onChange={handleChange} />
          <Input label="Pincode" name="pincode" onChange={handleChange} />
        </div>

        <div className="mt-6">
          <Button disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IndividualDonorProfile;
