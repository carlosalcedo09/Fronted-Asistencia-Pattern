import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") || null);
  const [user, setUser] = useState(null); 

  const login = (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setAccessToken(access);
    setUser({ access });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    if (storedAccessToken && !accessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
