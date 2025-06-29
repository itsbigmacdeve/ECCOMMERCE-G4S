import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'; 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );
  const [username, setUsername] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return "";
    try {
      const decoded = jwtDecode(token);
      return decoded.username;
    } catch {
      return "";
    }
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsLoggedIn(!!storedToken);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    const decoded = jwtDecode(token);
    setUsername(decoded.username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    setUsername("");
    window.location.href = "/login"; 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
