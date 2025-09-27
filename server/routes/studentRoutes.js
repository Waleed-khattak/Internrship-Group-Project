const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");
const Attendance = require("../models/Attendance");
const Exam = require("../models/Exam");
const Fee = require("../models/Fee");
const Announcement = require("../models/Announcement");

// Profile (student info already from Student model)
// Timetable → fetch class & subjects
// Attendance
router.get("/attendance/:studentId", async (req, res) => {
  try {
    const att = await Attendance.find({ student: req.params.studentId });
    res.json(att);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assignments
router.get("/assignments/:classId", async (req, res) => {
  try {
    const assignments = await Assignment.find({ class: req.params.classId });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exam Results
router.get("/exams/:studentId", async (req, res) => {
  try {
    const exams = await Exam.find({ student: req.params.studentId, approved: true });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fee Records
router.get("/fees/:studentId", async (req, res) => {
  try {
    const fees = await Fee.find({ student: req.params.studentId });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Announcements
router.get("/announcements/:classId", async (req, res) => {
  try {
    const anns = await Announcement.find({ $or: [{ type: "Global" }, { class: req.params.classId }] });
    res.json(anns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
