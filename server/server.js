const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const verifyRoutes = require("./routes/verifyRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const signupRoutes = require("./routes/signupRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ Allow requests from your frontend URL
const corsOptions = {
  origin: "https://internrship-group-project-why-smartdesk.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected to SmartDesk"))
  .catch((err) => console.error("❌ DB Error:", err));

// ✅ API Routes
app.use("/api/signup", signupRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

// ✅ Root route for testing
app.get("/", (req, res) => {
  res.send("SmartDesk API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
