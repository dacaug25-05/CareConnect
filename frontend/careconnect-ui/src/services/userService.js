import api from "./api";

export const getMyProfile = async () => {
  const res = await api.get("/api/users/me");
  return res.data;
};

export const getAllUsers = async () => {
  const res = await api.get("/api/admin/users");
  return res.data;
};

export const getUserByEmail = async (email) => {
  const res = await api.get(`/api/admin/users/${email}`);
  return res.data;
};

export const approveUser = async (email) => {
  const res = await api.put("/api/admin/users/approve", { email });
  return res.data;
};

export const deleteUser = async (email) => {
  const res = await api.delete(`/api/admin/users/${email}`);
  return res.data;
};

export const uploadDocument = async (file, docType) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("docType", docType);

  const res = await api.post("/api/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getMyDocuments = async () => {
  const res = await api.get("/api/documents/me");
  return res.data;
};
