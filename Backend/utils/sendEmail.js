const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (to, link) => {
  await transporter.sendMail({
    from: `"Bondify" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email for Bondify",
    html: `
      <h2>Welcome to Bondify!</h2>
      <p>Click the link below to verify your email address:</p>
      <a href="${link}">${link}</a>
      <p>If you did not sign up, ignore this email.</p>
    `,
  });
};

exports.sendResetPasswordEmail = async (to, link) => {
  await transporter.sendMail({
    from: `"Bondify" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset your Bondify password",
    html: `
      <h2>Reset your Bondify password</h2>
      <p>Click the link below to set a new password:</p>
      <a href="${link}">${link}</a>
      <p>If you did not request this, ignore this email.</p>
    `,
  });
};