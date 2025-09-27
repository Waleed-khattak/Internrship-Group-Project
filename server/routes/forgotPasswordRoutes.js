const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { Teacher, Student, Admin } = require("../models/User");

// Helper to select user model
function getUserModel(role) {
  if (role === "Student") return Student;
  if (role === "Teacher") return Teacher;
  if (role === "Admin") return Admin;
  return null;
}

// Email transporter setup (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // your email
    pass: process.env.EMAIL_PASS   // your email password or app password
  }
});

// Step 1: Request PIN
router.post("/request-pin", async (req, res) => {
  try {
    const { email, role } = req.body;
    const User = getUserModel(role);
    if (!User) return res.status(400).json({ msg: "Invalid role" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Generate 4-digit PIN
    const pin = Math.floor(1000 + Math.random() * 9000);

    // Save PIN and expiry (5 min)
    user.resetPin = pin;
    user.resetPinExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Send email with PIN
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset PIN",
      html: `<p>Hello ${user.name},</p>
             <p>Your password reset PIN is: <b>${pin}</b></p>
             <p>This PIN will expire in 5 minutes.</p>`
    });

    res.json({ msg: "PIN sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Step 2: Reset Password with PIN
router.post("/reset-with-pin", async (req, res) => {
  try {
    const { email, role, pin, newPassword } = req.body;
    const User = getUserModel(role);
    if (!User) return res.status(400).json({ msg: "Invalid role" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.resetPin != pin || Date.now() > user.resetPinExpiry) {
      return res.status(400).json({ msg: "Invalid or expired PIN" });
    }

    const bcrypt = require("bcryptjs");
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetPin = undefined;
    user.resetPinExpiry = undefined;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
