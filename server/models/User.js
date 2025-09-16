// server/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  // optional: role field (not required because collections are separate), but OK to store:
  role: { type: String }
}, { timestamps: true });

// Explicit collection names to match your DB
const Student = mongoose.model("Student", userSchema, "Students");
const Teacher = mongoose.model("Teacher", userSchema, "Teachers");
const Admin = mongoose.model("Admin", userSchema, "Admins");

module.exports = { Student, Teacher, Admin };
