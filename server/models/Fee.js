const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  amount: Number,
  status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
  dueDate: Date
});

module.exports = mongoose.model("Fee", feeSchema, "Fees");
