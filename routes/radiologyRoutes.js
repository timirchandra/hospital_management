const express = require("express");
const router = express.Router();

// Sample Route (Modify as needed)
router.get("/", (req, res) => {
  res.json({ message: "Radiology routes working" });
});

module.exports = router;
