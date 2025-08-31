// server/utils/tokenService.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // use env in prod

export function generateToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
