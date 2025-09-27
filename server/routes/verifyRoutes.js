// server/routes/verifyRoutes.js
const express = require("express");
const router = express.Router();
const { Student, Teacher, Admin } = require("../models/User");

// --------------------
// Verify Student Email
// POST /api/verify/student/:id
// --------------------
router.post("/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    student.isEmailVerified = true;
    await student.save();

    res.json({ msg: "Student email verified successfully", user: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// --------------------
// Verify Teacher Email
// POST /api/verify/teacher/:id
// --------------------
router.post("/teacher/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ msg: "Teacher not found" });

    teacher.isEmailVerified = true;
    await teacher.save();

    res.json({ msg: "Teacher email verified successfully", user: teacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// --------------------
// Verify Admin Email
// POST /api/verify/admin/:id
// --------------------
router.post("/admin/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    admin.isEmailVerified = true;
    await admin.save();

    res.json({ msg: "Admin email verified successfully", user: admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
