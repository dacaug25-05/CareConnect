import api from "./api";

/* ---------- USERS ---------- */

export const getAllUsers = async () => {
  const res = await api.get("/api/admin/users");
  return res.data;
};


export const approveUser = async (email) => {
  const res = await api.put("/api/admin/users/approve", {
    email,
  });
  return res.data;
};

/* ---------- REQUESTS ---------- */

export const getAllRequests = async () => {
  const res = await api.get("/api/requests");
  return res.data;
};

export const updateRequestStatus = async (requestId, status) => {
  if (status === "APPROVED") {
    const res = await api.put(`/api/requests/${requestId}/approve`);
    return res.data;
  }

  if (status === "REJECTED") {
    const res = await api.put(`/api/requests/${requestId}/reject`);
    return res.data;
  }
  
  return;
};
