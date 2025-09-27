const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  marks: Number,
  totalMarks: Number,
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Exam", examSchema, "Exams");
