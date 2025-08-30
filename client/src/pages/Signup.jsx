/* eslint-disable no-unused-vars */
import { useState } from "react";
import rightColumn from "../assets/right_column.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Signup() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate(); // ✅ initialize navigation

  const handleSignup = () => {
    if (name && dob && email) {
      // Normally you'd call backend API here
      navigate("/"); // ✅ redirect to login page after signup
    } else {
      alert("Please fill all fields!");
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

          {/* Name */}
          <div className="mb-4 w-full max-w-sm">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DOB */}
          <div className="mb-4 w-full max-w-sm">
            <input
              type="text"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-6 w-full max-w-sm">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSignup}
            className="w-full max-w-sm bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get OTP
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