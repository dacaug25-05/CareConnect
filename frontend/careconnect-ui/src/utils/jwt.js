export const decodeJwt = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export const getUserRole = (token) => {
  const decoded = decodeJwt(token);
  return decoded?.role || null;
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  const decoded = decodeJwt(token);
  return decoded?.uid ? parseInt(decoded.uid) : null;
};

export const isApprovedUser = (token) => {
  const decoded = decodeJwt(token);
  return decoded?.approved === true;
};

export const isTokenExpired = (token) => {
  const decoded = decodeJwt(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};
