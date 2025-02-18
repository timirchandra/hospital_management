const mongoose = require("mongoose");

const TreatmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  diagnosis: String,
  medications: [String],
  treatmentPlan: String,
});

module.exports = mongoose.model("Treatment", TreatmentSchema);
