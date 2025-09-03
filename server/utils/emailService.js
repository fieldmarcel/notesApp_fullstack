import { config } from 'dotenv';
config({ path: '.env' });

import nodemailer from "nodemailer";

// Debug first
console.log('=== NODEMAILER DEBUG ===');
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS exists:', !!process.env.SMTP_PASS);
console.log('========================');

const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test the connection
transporter.verify(function(error, success) {
  if (error) {
    console.log('❌ SMTP connection failed:', error);
  } else {
    console.log('✅ SMTP server is ready to take our messages');
  }
});

const sendOTPEmail = async (to, otp) => {
  // Additional validation
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error(`Missing SMTP credentials: USER=${!!process.env.SMTP_USER}, PASS=${!!process.env.SMTP_PASS}`);
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "getyour NotesApp OTP here ✅",
    text: `Your OTP to sign in to Notes App is: ${otp}\n\nThis code expires in 10 minutes. If you didn't request this, ignore.`,
    html: `<p>Your OTP to sign in to <b>Notes App</b> is: <strong>${otp}</strong></p><p>This code expires in 10 minutes.</p>`,
  };

  try {
    console.log('Attempting to send email to:', to);
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Email sending error:', error);
    throw error;
  }
};

export { sendOTPEmail };