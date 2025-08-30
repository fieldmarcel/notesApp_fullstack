/* eslint-disable no-unused-vars */
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import rightColumn from "../assets/right_column.png";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleLogin = () => {
    if (email && otp) {
      navigate("/dashboard");
    } else {
      alert("Please enter Email and OTP!");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white p-4">
      <div className="flex flex-col md:flex-row w-full max-w-[900px] h-auto md:h-[600px] rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-white flex justify-center items-center px-6 md:px-12 py-8">
          <div className="w-full max-w-sm mx-auto text-center md:text-left">
            {/* Logo */}
            <div className="flex justify-center md:justify-start items-center mb-6 md:mb-8">
              <img
                src={logo}
                alt="App Logo"
                className="w-10 h-10 object-contain mr-2"
              />
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Sign in</h1>
            <p className="text-gray-500 mb-6 md:mb-8">
              Please login to continue to your account.
            </p>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* OTP */}
            <div className="mb-4 relative">
              <input
                type={showOtp ? "text" : "password"}
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowOtp(!showOtp)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Resend OTP */}
            <p className="text-blue-600 text-sm font-medium mb-3 cursor-pointer hover:underline">
              Resend OTP
            </p>

            {/* Keep me logged in */}
            <div className="flex items-center justify-center md:justify-start mb-6">
              <input
                type="checkbox"
                id="keepLoggedIn"
                className="w-4 h-4 mr-2 border-gray-300 rounded"
              />
              <label htmlFor="keepLoggedIn" className="text-sm text-gray-700">
                Keep me logged in
              </label>
            </div>

            {/* Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Sign in
            </button>

            {/* Create Account Link */}
            <p className="mt-4 text-gray-600 text-sm">
              Need an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 font-medium hover:underline"
              >
                Create one
              </a>
            </p>
          </div>
        </div>

        {/* Right Section - Image (hidden on mobile) */}
        <div className="hidden md:block md:w-1/2 bg-black">
          <img
            src={rightColumn}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
