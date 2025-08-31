import axios from "axios";

const API_URL = "http://localhost:5000/auth"; // replace with your deployed URL later

export const sendOtp = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server Error" };
  }
};

export const verifyOtp = async (loginData) => {
  try {
    const res = await axios.post(`${API_URL}/login`, loginData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server Error" };
  }
};

export const resendOtp = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/resend-otp`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error resending OTP" };
  }
};
