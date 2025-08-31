import axios from "axios";

const API_URL = "https://noteapp-7b6u.onrender.com"; // replace with your deployed URL later

export const sendOtp = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server Error" };
  }
};

export const verifyOtp = async (loginData) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, loginData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server Error" };
  }
};

export const resendOtp = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/auth/resend-otp`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error resending OTP" };
  }
};
