// // server.js
// // require('dotenv').config();
// // const dotenv = require("dotenv");
// // dotenv.config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');




// const app = express();


// // Middleware
// app.use(express.json());
// app.use(cors());


// // dotenv.config();



// // Connect to MongoDB
// require("dotenv").config(); // Ensure dotenv is configured at the top
// // const cors = require("cors");
// const connectDB = require("./config/db");

// // Database connection
// connectDB();


// // Routes
// const authRoutes = require('./routes/authRoutes');
// const patientRoutes = require("./routes/patientRoutes");
// const healthSystemRoutes = require('./routes/healthSystemRoutes');
// // const patientRoutes = require("./routes/patientRoutes");
// const wardRoutes = require("./routes/wardRoutes");
// const labRoutes = require("./routes/labRoutes");
// const treatmentRoutes = require("./routes/treatmentRoutes");
// const referralRoutes = require("./routes/referralRoutes");
// const radiologyRoutes = require("./routes/radiologyRoutes");
// const authMiddleware = require("./middleware/authMiddleware");
// // const connectDB = require("./config/db");

// app.use('/api/auth', authRoutes);
// app.use("/api/patients", authMiddleware, patientRoutes);
// app.use('/api/health-system', healthSystemRoutes);
// app.use("/api/wards", authMiddleware, wardRoutes);
// app.use("/api/labs", authMiddleware, labRoutes);
// app.use("/api/treatment", authMiddleware, treatmentRoutes);
// app.use("/api/referrals", authMiddleware, referralRoutes);
// app.use("/api/radiology", authMiddleware, radiologyRoutes);


// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Import Routes
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const wardRoutes = require("./routes/wardRoutes");
const referralRoutes = require("./routes/referralRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/wards", wardRoutes);
app.use("/api/referrals", referralRoutes);

// Serve React Frontend
const clientPath = path.join(__dirname, "client/build");
app.use(express.static(clientPath));

// Catch-All Route for React Router (Frontend)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


