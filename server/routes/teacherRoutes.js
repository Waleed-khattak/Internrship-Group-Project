const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Assignment = require("../models/Assignment");
const Exam = require("../models/Exam");
const Announcement = require("../models/Announcement");

// Mark Attendance
router.post("/attendance", async (req, res) => {
  try {
    const att = await Attendance.create(req.body);
    res.json(att);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assignments
router.post("/assignments", async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Marks submission
router.post("/exams", async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Announcements
router.post("/announcements", async (req, res) => {
  try {
    const ann = await Announcement.create(req.body);
    res.json(ann);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
