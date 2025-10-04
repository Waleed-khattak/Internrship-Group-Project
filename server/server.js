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
const signupRoutes = require("./routes/signupRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ CORS setup
const corsOptions = {
  origin: "https://internrship-group-project-why-smartdesk.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected to SmartDesk"))
  .catch(err => console.error("❌ DB Error:", err));

// ✅ API Routes
app.use("/api/signup", signupRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

// ✅ Serve React frontend (after build)
app.use(express.static(path.join(__dirname, "client/build")));

// ✅ SPA Fallback Route — must be last
app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
