const mongoose = require("mongoose");

const LabTestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  testType: String,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

module.exports = mongoose.model("LabTest", LabTestSchema);
