const express = require("express");
const router = express.Router();
const { admitPatient } = require("../controllers/wardController");
const { protect } = require("../middleware/authMiddleware");

// Route for admitting a patient to a ward
router.post("/admit", protect, admitPatient);

module.exports = router;
