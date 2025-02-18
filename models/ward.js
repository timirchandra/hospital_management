const mongoose = require("mongoose");

const WardSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  wardNumber: { type: String, required: true },
  bedNumber: { type: String, required: true },
  admissionDate: { type: Date, default: Date.now },
  dischargeDate: { type: Date },
});

module.exports = mongoose.model("Ward", WardSchema);
