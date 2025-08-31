/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-refresh/only-export-components */




import { createContext, useState, useEffect } from "react";
import * as api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const signup = async (data) => {
    const res = await api.signup(data);
    setUser(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);
  };

  const login = async (data) => {
    const res = await api.login(data);
    setUser(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
