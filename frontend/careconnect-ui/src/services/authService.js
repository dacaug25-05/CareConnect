import api from "./api";

export const registerApi = async (payload) => {
  const res = await api.post("/api/auth/register", payload);
  return res.data;
};

export const loginApi = async (payload) => {
  const res = await api.post("/api/auth/login", payload);

  const auth = {
    token: res.data.accessToken,  
    role: res.data.role,
    approved: res.data.approved,
  };

  localStorage.setItem("auth", JSON.stringify(auth));
  localStorage.setItem("token", auth.token);

  return auth;
};

export const logoutUser = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("token");
  window.location.href = "/login";
};
