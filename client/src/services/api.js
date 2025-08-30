/* eslint-disable no-unused-vars */
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// const api = axios.create({
//   baseURL: API_URL + "/api",
//   withCredentials: false,
// });

// export const setAuthHeader = (token) => {
//   if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   else delete api.defaults.headers.common["Authorization"];
// };

// // Auth
// export const sendOtp = (payload) => api.post("/auth/send-otp", payload);
// export const verifyOtp = (payload) => api.post("/auth/verify-otp", payload);
// export const googleSignin = (payload) => api.post("/auth/google", payload);
// export const refreshToken = (payload) => api.post("/auth/refresh", payload);
// export const logoutApi = (payload) => api.post("/auth/logout", payload);

// // Notes
// export const fetchNotes = () => api.get("/notes");
// export const createNote = (data) => api.post("/notes", data);
// export const deleteNote = (id) => api.delete(`/notes/${id}`);

// export default api;





// client/src/services/api.js

// Fake delay helper
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const signup = async (data) => {
  await wait(500);
  if (!data.email.includes("@")) {
    throw new Error("Invalid email format");
  }
  // return fake token + user
  return { token: "fake-jwt-token", user: { id: 1, name: "Test User", email: data.email } };
};

export const login = async (data) => {
  await wait(500);
  if (data.email === "fail@test.com") {
    throw new Error("Invalid credentials");
  }
  return { token: "fake-jwt-token", user: { id: 1, name: "Demo User", email: data.email } };
};

export const fetchNotes = async () => {
  await wait(300);
  return [
    { id: 1, text: "First Note" },
    { id: 2, text: "Second Note" },
  ];
};

export const createNote = async (note) => {
  await wait(200);
  return { id: Date.now(), text: note };
};

export const deleteNote = async (id) => {
  await wait(200);
  return { success: true };
};
