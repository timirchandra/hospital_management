const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Dummy lab controller functions (replace with actual logic)
const getLabs = (req, res) => res.json({ message: "List of lab tests" });
const createLabTest = (req, res) => res.json({ message: "Lab test created" });

// Routes
router.get("/", authMiddleware, getLabs);
router.post("/", authMiddleware, createLabTest);

module.exports = router;
