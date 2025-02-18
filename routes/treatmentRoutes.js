const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Dummy controllers
const getTreatments = (req, res) => res.json({ message: "List of treatments" });
const createTreatment = (req, res) => res.json({ message: "Treatment created" });

// Routes
router.get("/", authMiddleware, getTreatments);
router.post("/", authMiddleware, createTreatment);

module.exports = router;
