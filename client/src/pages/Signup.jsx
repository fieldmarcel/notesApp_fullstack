/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import rightColumn from "../assets/right_column.png";
import { sendOtp } from "../services/authServices";

export default function Signup() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ loading state

  const navigate = useNavigate(); // ✅ initialize navigation

  const handleSignup = async () => {
    if (!name || !dob || !email) {
      return alert("Please fill all fields!");
    }

    try {
      setIsLoading(true);
      const res = await sendOtp({ name, dob, email });
      alert(res.message); // OTP sent
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-[600px] rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center px-6 sm:px-12 py-8 text-center">
          <div className="flex items-center mb-6 md:mb-8">
            <img
              src={logo}
              alt="App Logo"
              className="w-12 h-12 object-contain mr-2"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Sign up</h1>
          <p className="text-gray-500 mb-8 text-sm sm:text-base">
            Sign up to enjoy the feature of HD
          </p>

          {/* Name with outlined label */}
          <div className="relative mb-4 w-full max-w-sm">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full border rounded-md px-4 pt-5 pb-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nishar Ahmad"
            />
            <label
              htmlFor="name"
              className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600 peer-focus:text-blue-500"
            >
              Your Name
            </label>
          </div>

          {/* DOB with outlined label */}
          <div className="relative mb-4 w-full max-w-sm">
            <input
              type="text"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="peer w-full border rounded-md px-4 pt-5 pb-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="DD/MM/YYYY"
            />
            <label
              htmlFor="dob"
              className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600 peer-focus:text-blue-500"
            >
              Date of Birth
            </label>
          </div>

          {/* Email with outlined label */}
          <div className="relative mb-6 w-full max-w-sm">
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

          {/* Button */}
          <button
            onClick={handleSignup}
            className="w-full max-w-sm bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            {isLoading ? "Sending OTP..." : "Get OTP"}
          </button>

          {/* Sign In Link */}
          <p className="mt-4 text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Right Section - Image (hidden on mobile) */}
        <div className="hidden md:block w-1/2 bg-black">
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
