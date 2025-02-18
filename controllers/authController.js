const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log("🔑 Raw Password Before Hashing:", password);

        // Generate salt (10 rounds by default)
        const salt = await bcrypt.genSalt(10);

        console.log("🔑 Generated Salt:", salt);

        // Hash password using bcrypt (Blowfish-based hashing)
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("🔐 Hashed Password Before Saving:", hashedPassword);

        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Store only the hash
            role
        });

        await newUser.save();
        console.log("✅ User Registered Successfully");

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("❌ Error in registerUser:", error);
        res.status(500).json({ message: "Server Error" });
    }
};



// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

const loginUser = async (req, res) => {
  try {
    console.log("🔹 Request Body:", req.body); // Debugging

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };





// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    console.log("🔹 Req User:", req.user); // Debugging

    if (!req.user) {
      console.log("❌ User is undefined in req!");
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};







// ✅ Make sure all functions are exported correctly
module.exports = { registerUser, loginUser, getUserProfile };
console.log("🔍 Imported Auth Controller Functions:", { registerUser, loginUser, getUserProfile });
