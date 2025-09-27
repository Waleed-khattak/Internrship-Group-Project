const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: String,
  message: String,
  type: { type: String, enum: ["Global", "Class"], default: "Global" },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Announcement", announcementSchema, "Announcements");
