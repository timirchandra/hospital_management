const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        address: { type: String, required: true },
        contact: { type: String, required: true },
        wardNumber: { type: String, required: true },
        status: { type: String, required: true }
    },
    { timestamps: true } // ✅ Enables `createdAt` & `updatedAt`
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
