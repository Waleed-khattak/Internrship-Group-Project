const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Present", "Absent", "Late"], required: true }
});

module.exports = mongoose.model("Attendance", attendanceSchema, "Attendance");
