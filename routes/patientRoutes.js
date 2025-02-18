const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController'); // Ensure the correct path
// const { protect } = require("../middleware/authMiddleware");

// Ensure patientController has the function you are calling
console.log("Imported Patient Controller: ", patientController);

// Define routes
router.post('/register', patientController.registerPatient); 
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);

module.exports = router;
