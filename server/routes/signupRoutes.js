// server/routes/signupRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { Teacher, Student } = require("../models/User");

function normalizeRole(role) {
  if (!role) return role;
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}

router.post("/", async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const formattedRole = normalizeRole(role);

    if (!["Teacher", "Student"].includes(formattedRole)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    if (!password || (!email && !username)) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const payload = { name, username, email, password: hashed, role: formattedRole };

    let saved;
    if (formattedRole === "Teacher") saved = await new Teacher(payload).save();
    else saved = await new Student(payload).save();

    console.log("✅ New user saved:", { id: saved._id, username: saved.username, email: saved.email, role: saved.role });
    res.json({ msg: "Registration successful", userId: saved._id });
  } catch (err) {
    console.error("Signup error:", err);
    if (err.code === 11000) return res.status(400).json({ msg: "Username or email already exists" });
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
