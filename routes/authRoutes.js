const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser); // User registration
router.post("/login", loginUser); // ✅ Login route (Fix this if missing)

// Protected route (Requires authentication)
router.get("/profile", protect, getUserProfile);

module.exports = router;
