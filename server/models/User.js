// server/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    role: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    resetPin: Number,
    resetPinExpiry: Date,
  },
  { timestamps: true }
);

// Explicit collection names
const Student = mongoose.model("Student", userSchema, "Students");
const Teacher = mongoose.model("Teacher", userSchema, "Teachers");
const Admin = mongoose.model("Admin", userSchema, "Admins");

module.exports = { Student, Teacher, Admin };
