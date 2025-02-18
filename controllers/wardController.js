const Ward = require("../models/ward");
const Patient = require("../models/patientModel");

const admitPatient = async (req, res) => {
  try {
    const { patientId, wardNumber, bedNumber } = req.body;

    // Create new ward admission record
    const newWardAdmission = new Ward({
      patientId,
      wardNumber,
      bedNumber,
    });

    // Save to database
    await newWardAdmission.save();

    res.status(201).json({
      message: "Patient admitted successfully",
      data: newWardAdmission,
    });
  } catch (error) {
    console.error("Error admitting patient:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { admitPatient };
