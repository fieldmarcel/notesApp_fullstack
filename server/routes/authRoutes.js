// server/routes/authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const router = express.Router();

// POST /auth/signup → generate and send OTP
router.post("/signup", async (req, res) => {
  try {
    const { name, dob, email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    console.log("Generated OTP:", otp);

    // Save or update user
    let user = await User.findOne({ email });
    if (user) {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      if (name) user.name = name;
      if (dob) user.dob = dob;
    } else {
      user = new User({ name, dob, email, otp, otpExpiry });
    }
    await user.save();

    // ✅ Create transporter here
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Notes App",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      res.json({ message: "OTP sent successfully" });
    } catch (emailErr) {
      console.error("Email sending error:", emailErr);
      res.status(500).json({ message: "Failed to send OTP email" });
    }
  } catch (err) {
    console.error("Signup route error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /auth/login → verify OTP and issue JWT
router.post("/login", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is correct → clear OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// resend otp
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP with expiry (say 5 min)
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Resend OTP",
      text: `Your new OTP is ${otp}`,
    });

    res.json({ message: "OTP resent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
