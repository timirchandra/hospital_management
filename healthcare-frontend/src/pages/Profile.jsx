import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Alert, Spinner, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User Data:", response.data); // Debugging

      if (response.data && response.data._id) {
        setUser(response.data); // Match API response structure
      } else {
        setError("Invalid user data received.");
      }
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setError("Failed to load user profile.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container className="mt-4">
      <h2>User Profile</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : user ? (
        <Card className="shadow-lg p-3 mb-5 bg-white rounded">
          <Card.Body>
            <h4 className="text-primary">Welcome, {user.name} 👋</h4>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="warning">User profile not available.</Alert>
      )}
    </Container>
  );
};

export default Profile;
