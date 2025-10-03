const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const verifyRoutes = require("./routes/verifyRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(express.json());

// ✅ CORS Configuration
const allowedOrigins = [
  "https://internrship-group-project-why-smartdesk.onrender.com", // frontend
  "http://localhost:3000" // for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected to SmartDesk");
  })
  .catch((err) => {
    console.error("❌ DB Error:", err);
  });

// ✅ Routes
const signupRoutes = require("./routes/signupRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/signup", signupRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🚀 SmartDesk API is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
