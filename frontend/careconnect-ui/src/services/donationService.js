import api from "./api";

export const createDonation = async (payload) => {
  const res = await api.post("/api/donations", payload);
  return res.data;
};

export const getMyDonations = async () => {
  const res = await api.get("/api/donations/me");
  return res.data;
};

export const completeDonation = async (donationId) => {
  const res = await api.put(`/api/donations/${donationId}/complete`);
  return res.data;
};

export const cancelDonation = async (donationId) => {
  const res = await api.put(`/api/donations/${donationId}/cancel`);
  return res.data;
};
