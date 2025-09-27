// server/routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Teacher, Student, Admin } = require("../models/User");

function formatRole(role) {
  if (!role) return role;
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}

router.post("/login", async (req, res) => {
  try {
    // Accept either `identifier` (recommended) OR `email`
    const identifier = req.body.identifier || req.body.email || req.body.username;
    const password = req.body.password;
    const role = formatRole(req.body.role);

    console.log("Login Request:", { identifier, role });

    if (!identifier || !password || !role) {
      return res.status(400).json({ msg: "Please provide identifier, password and role" });
    }

    let UserModel;
    if (role === "Student") UserModel = Student;
    else if (role === "Teacher") UserModel = Teacher;
    else if (role === "Admin") UserModel = Admin;
    else return res.status(400).json({ msg: "Invalid role selected" });

    // find by username OR email (identifier can be either)
    const user = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });

    console.log("Found user:", !!user, user ? { id: user._id, email: user.email, username: user.username, role: user.role } : null);

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("❌ JWT_SECRET missing");
      return res.status(500).json({ msg: "Server configuration error" });
    }

    const token = jwt.sign({ id: user._id, role }, secret, { expiresIn: "1h" });

    return res.json({
      msg: "Login successful",
      token,
      user: { id: user._id, name: user.name, username: user.username, email: user.email, role, isEmailVerified: user.isEmailVerified }
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
