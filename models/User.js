const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Doctor', 'Nurse', 'LabTech'], required: true }
});

// Hash password before saving (Prevent double hashing)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password is unchanged

  // Check if password is already hashed
  if (this.password.startsWith("$2b$10$")) {
    console.log("⚠ Password already hashed. Skipping rehash.");
    return next();
  }

  console.log("🔍 Pre-save Hook Triggered");
  console.log("🔑 Raw Password Before Hashing:", this.password);

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  console.log("🔐 Hashed Password Before Saving:", this.password);
  next();
});

module.exports = mongoose.model('User', UserSchema);
