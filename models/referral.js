const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to Patient model
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model (Doctor)
    required: true,
  },
  service: {
    type: String,
    enum: ['Radiology', 'Pathology', 'Blood Bank', 'Physiotherapy', 'Operation Theatre', 'ICU', 'CCU', 'Wards'], // Enum of services
    required: true,
  },
  referTime: {
    type: Date,
    default: Date.now, // Set the default value to the current date/time
  },
  referralDate: {
    type: Date,
    default: Date.now, // Can still keep this for record-keeping if you want
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'], // Referral status
    default: 'Pending',
  },
});

module.exports = mongoose.model('Referral', ReferralSchema);
