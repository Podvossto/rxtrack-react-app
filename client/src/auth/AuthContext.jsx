/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import api, { getStoredUser, getToken, storeSession, clearSession } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => (getToken() ? getStoredUser() : null));

  const login = async (username, password) => {
    const { data } = await api.post("/auth/login", { username, password });
    storeSession(data.token, data.user);
    setUser(data.user);
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};
