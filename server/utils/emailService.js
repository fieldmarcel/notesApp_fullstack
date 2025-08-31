import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOTPEmail = async (to, otp) => {
  const from = process.env.EMAIL_FROM || "no-reply@example.com";
  const subject = "Your Notes App OTP";
  const text = `Your OTP to sign in to Notes App is: ${otp}\n\nThis code expires in 10 minutes. If you didn't request this, ignore.`;
  const html = `<p>Your OTP to sign in to <b>Notes App</b> is: <strong>${otp}</strong></p><p>This code expires in 10 minutes.</p>`;

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};

export { sendOTPEmail };