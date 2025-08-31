import OTP from "../models/OTP.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const OTP_TTL_MINUTES = 10;
const SALT_ROUNDS = 10;

const generateNumericOTP = (digits = 6) => {
  const max = 10 ** digits;
  const num = crypto.randomInt(0, max);
  return String(num).padStart(digits, "0");
};

const createAndSaveOTP = async (email) => {
  const otp = generateNumericOTP(6);
  const otpHash = await bcrypt.hash(otp, SALT_ROUNDS);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  // delete previous OTP for the email
  await OTP.deleteMany({ email });

  await OTP.create({ email, otpHash, expiresAt, attempts: 0 });

  return otp; // return raw otp to send via email
};

const verifyAndConsumeOTP = async (email, otp) => {
  const doc = await OTP.findOne({ email });
  if (!doc) return { ok: false, reason: "No OTP found" };
  if (doc.expiresAt < new Date()) {
    await OTP.deleteMany({ email });
    return { ok: false, reason: "Expired" };
  }
  const match = await bcrypt.compare(otp, doc.otpHash);
  if (!match) {
    doc.attempts = (doc.attempts || 0) + 1;
    await doc.save();
    return { ok: false, reason: "Invalid" };
  }
  // consume
  await OTP.deleteMany({ email });
  return { ok: true };
};

export { createAndSaveOTP, verifyAndConsumeOTP, generateNumericOTP };
