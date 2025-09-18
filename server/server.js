const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected to IlmiMarkaz");
  })
  .catch(err => {
    console.error("❌ DB Error:", err);
  });

// Import Routes
const signupRoutes = require("./routes/signupRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/signup", signupRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
