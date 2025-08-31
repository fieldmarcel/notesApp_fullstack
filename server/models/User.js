// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    dob: { type: String },
    email: { type: String, required: true, unique: true },
    otp: { type: String }, // store OTP temporarily
    otpExpiry: { type: Date }, // expiry time for OTP
    password: { type: String }, // optional (for Google login we won’t need it)
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
