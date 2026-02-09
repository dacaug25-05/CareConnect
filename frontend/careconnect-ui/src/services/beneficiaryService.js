import api from "./api";
import { getUserIdFromToken } from "../utils/jwt";

export const createOrUpdateBeneficiaryProfile = async (payload) => {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error("Not authenticated");
  const res = await api.post(`/api/beneficiaries/${userId}`, payload);
  return res.data;
};

export const getMyBeneficiaryProfile = async () => {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error("Not authenticated");
  const res = await api.get(`/api/beneficiaries/${userId}`);
  return res.data;
};

export const deleteMyBeneficiaryProfile = async () => {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error("Not authenticated");
  const res = await api.delete(`/api/beneficiaries/${userId}`);
  return res.data;
};


export const createHelpRequest = async (payload) => {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error("Not authenticated");
  const res = await api.post(`/api/requests/${userId}`, payload);
  return res.data;
};


export const getMyHelpRequests = async () => {
  const userId = getUserIdFromToken();
  if (!userId) throw new Error("Not authenticated");
  const res = await api.get(`/api/requests/beneficiary/${userId}`);
  return res.data;
};


export const approveHelpRequest = async (requestId) => {
  const res = await api.put(`/api/requests/${requestId}/approve`);
  return res.data;
};

export const verifyBeneficiary = async (payload) => {
  const res = await api.post("/api/beneficiaries/verify", payload);
  return res.data;
};

export const getVerificationLogs = async () => {
  const res = await api.get("/api/beneficiaries/logs");
  return res.data;
};