const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify token and authenticate user
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next(); // Proceed to the next middleware
        } catch (error) {
            console.error("❌ Error in protect middleware:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

// Middleware to allow only Admin users
const adminProtect = (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
        next(); // Proceed if user is Admin
    } else {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
};

module.exports = { protect, adminProtect };
