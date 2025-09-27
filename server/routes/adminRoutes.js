const express = require("express");
const router = express.Router();
const { Student, Teacher } = require("../models/User");
const ClassModel = require("../models/Class");
const Subject = require("../models/Subject");
const Exam = require("../models/Exam");
const Fee = require("../models/Fee");
const Announcement = require("../models/Announcement");

// Students CRUD
router.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Teachers CRUD
router.post("/teachers", async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Classes
router.post("/classes", async (req, res) => {
  try {
    const cls = await ClassModel.create(req.body);
    res.json(cls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Subjects
router.post("/subjects", async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve Marks
router.put("/exams/:id/approve", async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fee Records
router.post("/fees", async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    res.json(fee);
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
