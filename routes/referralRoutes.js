const express = require('express');
const router = express.Router();
const { createReferral, updateReferralStatus, getReferralById } = require('../controllers/referralController');

// Create referral
router.post('/create', createReferral);

// Update referral status (ensure the route matches the URL you're calling)
router.put('/update/:id', updateReferralStatus);  // This should match PUT /api/referrals/update/:id

// Get referral by ID
router.get('/:id', getReferralById);

module.exports = router;
