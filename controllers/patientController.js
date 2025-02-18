const Patient = require("../models/patientModel");

// ✅ Ensure registerPatient is defined
const registerPatient = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body); // Debugging

        const { name, age, gender, address, contact, wardNumber, status } = req.body;

        if (!name || !age || !gender || !address || !contact || !wardNumber || !status) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newPatient = new Patient({ name, age, gender, address, contact, wardNumber, status });
        await newPatient.save();

        res.status(201).json({ message: "Patient registered successfully", patient: newPatient });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};



// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get a single patient by ID
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error("Error fetching patient:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update patient status
const updatePatientStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const patient = await Patient.findById(req.params.id);
        
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        
        patient.status = status;
        const updatedPatient = await patient.save();
        res.status(200).json({ message: "Patient status updated", patient: updatedPatient });
    } catch (error) {
        console.error("Error updating patient status:", error);
        res.status(500).json({ message: "Server error" });
    }
};




module.exports = { registerPatient, getAllPatients, getPatientById, updatePatientStatus };
