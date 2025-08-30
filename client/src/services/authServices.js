import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const signupAPI = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const verifyOtpAPI = async (email, otp) => {
  try {
    const res = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const loginAPI = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const googleLoginAPI = async (googleToken) => {
  try {
    const res = await axios.post(`${API_URL}/auth/google`, {
      token: googleToken,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
