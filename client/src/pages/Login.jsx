/* eslint-disable no-unused-vars */
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import rightColumn from "../assets/right_column.png";
import { verifyOtp, resendOtp } from "../services/authServices";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleResendOtp = async () => {
    if (!email) {
      return alert("Enter your email first to resend OTP!");
    }
    try {
      setLoading(true);
      const res = await resendOtp({ email });
      alert(res.message);
    } catch (err) {
      alert(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !otp) {
      return alert("Please enter Email and OTP!");
    }

    try {
      const res = await verifyOtp({ email, otp });

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // if (keepLoggedIn) {
      //   localStorage.setItem("token", res.token); // long-lived
      // } else {
      //   sessionStorage.setItem("token", res.token); // clears on browser close
      // }

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
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

            {/* Email with outlined label */}
            <div className="relative mb-6">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full border rounded-md px-4 pt-5 pb-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ahmad@gmail.com"
              />
              <label
                htmlFor="email"
                className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600 peer-focus:text-blue-500"
              >
                Email
              </label>
            </div>

            {/* OTP with outlined label + eye toggle */}
            <div className="relative mb-6">
              <input
                type={showOtp ? "text" : "password"}
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="peer w-full border rounded-md px-4 pt-5 pb-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123456"
              />
              <label
                htmlFor="otp"
                className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600 peer-focus:text-blue-500"
              >
                OTP
              </label>

              <button
                type="button"
                onClick={() => setShowOtp(!showOtp)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Resend OTP */}
            <p
              onClick={handleResendOtp}
              className="text-blue-600 text-sm font-medium mb-3 cursor-pointer hover:underline"
            >
              {loading ? "Sending..." : "Resend OTP"}
            </p>

            {/* Keep me logged in */}
            <div className="flex items-center justify-center md:justify-start mb-6">
              <input
                type="checkbox"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
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

        {/* Right Section - Image */}
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
