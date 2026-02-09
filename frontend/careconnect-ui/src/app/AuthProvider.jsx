import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore session on refresh
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

const login = (authData) => {
  setUser(authData);

  // Save full user object
  localStorage.setItem("auth", JSON.stringify(authData));

  // Save token separately for Axios
  localStorage.setItem("token", authData.token);
};


const logout = () => {
  setUser(null);
  localStorage.removeItem("auth");
  localStorage.removeItem("token"); // remove JWT too
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
