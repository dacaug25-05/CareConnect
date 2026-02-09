import api from "./api";

export const createOrUpdateIndividualDonor = async (payload) => {
  const res = await api.post("/donors/individual", payload);
  return res.data;
};

export const getMyIndividualDonor = async () => {
  const res = await api.get("/donors/individual/me");
  return res.data;
};

export const deleteMyIndividualDonor = async () => {
  const res = await api.delete("/donors/individual/me");
  return res.data;
};

export const createOrUpdateOrganizationDonor = async (payload) => {
  const formData = new FormData();
  Object.keys(payload).forEach((k) => {
    if (payload[k] !== undefined && payload[k] !== null) {
      formData.append(k, payload[k]);
    }
  });

  const res = await api.post("/donors/organization", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getMyOrganizationDonor = async () => {
  const res = await api.get("/donors/organization/me");
  return res.data;
};

export const deleteMyOrganizationDonor = async () => {
  const res = await api.delete("/donors/organization/me");
  return res.data;
};
