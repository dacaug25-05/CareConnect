import { useEffect, useState } from "react";
import {
  getMyBeneficiaryProfile,
  createOrUpdateBeneficiaryProfile,
  deleteMyBeneficiaryProfile,
} from "../services/beneficiaryService";

export default function useBeneficiaryProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================
  // FETCH PROFILE ON LOAD
  // ============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getMyBeneficiaryProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ============================
  // SAVE / UPDATE PROFILE
  // ============================
  const saveProfile = async (formData) => {
    try {
      setLoading(true);
      const data = await createOrUpdateBeneficiaryProfile(formData);
      setProfile(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to save profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // DELETE PROFILE
  // ============================
  const deleteProfile = async () => {
    try {
      setLoading(true);
      await deleteMyBeneficiaryProfile();
      setProfile(null);
    } catch (err) {
      setError(err.message || "Failed to delete profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    saveProfile,
    deleteProfile,
  };
}
