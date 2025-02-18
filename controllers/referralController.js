const Referral = require('../models/referral');
const Patient = require('../models/patientModel');
const User = require('../models/User');


// Controller function for creating a referral
const createReferral = async (req, res) => {
  try {
    const { patientId, service } = req.body;
    const doctorId = req.user.id; // Get the doctor’s ID from the token (user)

    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Create a new referral
    const referral = new Referral({
      patientId,
      doctorId,
      service,
    });

    // Save the referral to the database
    await referral.save();

    res.status(201).json({
      message: 'Referral created successfully',
      referral,
    });
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all referrals for a patient (optional, depending on your needs)
const updateReferralStatus = async (req, res) => {
    const { id } = req.params; // Get referral ID from the URL
    const { status } = req.body; // Get new status from the request body
  
    try {
      // Find the referral by ID and update the status
      const referral = await Referral.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!referral) {
        return res.status(404).json({ message: 'Referral not found' });
      }
  
      res.status(200).json({
        message: 'Referral updated successfully',
        referral,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating referral status' });
    }
  };




  // Get referral by ID
const getReferralById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const referral = await Referral.findById(id);
  
      if (!referral) {
        return res.status(404).json({ message: 'Referral not found' });
      }
  
      res.status(200).json(referral);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving referral' });
    }
  };

module.exports = { createReferral, updateReferralStatus, getReferralById };
