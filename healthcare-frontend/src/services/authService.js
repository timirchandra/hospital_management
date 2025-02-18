import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Register API
export const registerUser = async (userData) => {
  try {
    console.log("Sending registration data:", userData); // Debugging

    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Registration success:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error.response?.data || "Registration failed";
  }
};



// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token); // Save token securely
    }

    return response.data; // Returns { token, user }
  } catch (error) {
    handleError(error);
  }
};

// Get User Profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized");

    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Returns user profile data
  } catch (error) {
    handleError(error);
  }
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // Redirect to home after logout
};
