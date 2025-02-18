const mongoose = require("mongoose");

const LabResultSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "LabTest" },
  result: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LabResult", LabResultSchema);
