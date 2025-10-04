const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const verifyRoutes = require("./routes/verifyRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

const corsOptions = {
  origin: "https://internrship-group-project-why-smartdesk.onrender.com",
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected to SmartDesk");
  })
  .catch((err) => {
    console.error("❌ DB Error:", err);
  });

// ✅ Import Routes
const signupRoutes = require("./routes/signupRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/signup", signupRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

// ✅ Serve React build files
app.use(express.static(path.join(__dirname, "client/build")));

// ✅ Handle React routing (for non-API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
