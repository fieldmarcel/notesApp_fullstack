/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-refresh/only-export-components */
// import { createContext, useContext, useState, useEffect } from "react";
// import {
//   loginAPI,
//   signupAPI,
//   googleLoginAPI,
//   verifyOtpAPI,
// } from "../services/authServices";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);

//   useEffect(() => {
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       } catch (err) {
//         console.error("Invalid token");
//         logout();
//       }
//     }
//   }, [token]);

//   const signup = async (email, password) => {
//     const res = await signupAPI(email, password);
//     return res;
//   };

//   const verifyOtp = async (email, otp) => {
//     const res = await verifyOtpAPI(email, otp);
//     if (res?.token) {
//       setToken(res.token);
//       localStorage.setItem("token", res.token);
//     }
//     return res;
//   };

//   const login = async (email, password) => {
//     const res = await loginAPI(email, password);
//     if (res?.token) {
//       setToken(res.token);
//       localStorage.setItem("token", res.token);
//     }
//     return res;
//   };

//   const googleLogin = async (googleToken) => {
//     const res = await googleLoginAPI(googleToken);
//     if (res?.token) {
//       setToken(res.token);
//       localStorage.setItem("token", res.token);
//     }
//     return res;
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, token, signup, verifyOtp, login, googleLogin, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




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
