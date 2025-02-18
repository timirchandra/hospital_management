const mongoose = require("mongoose");

const RadiologyResultSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Radiology" },
  result: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RadiologyResult", RadiologyResultSchema);
