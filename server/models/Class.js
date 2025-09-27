const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Class 10"
  section: { type: String }, // e.g. "A"
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
});

module.exports = mongoose.model("Class", classSchema, "Classes");
