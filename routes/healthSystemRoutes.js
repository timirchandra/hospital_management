const express = require('express');
const router = express.Router();

// Hello World Route
router.get('/', (req, res) => {
  res.json({ message: 'Hello World from the Health System API!' });
});

module.exports = router; // ✅ Correctly exporting the router
