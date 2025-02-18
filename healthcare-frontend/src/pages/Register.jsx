import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast, ToastContainer } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "", password: "", role: "Admin" });
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      setShowToast(true);
      setTimeout(() => {
        navigate("/"); // Redirect to home after registration
      }, 2000);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center text-primary mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" value={userData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={userData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" value={userData.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select name="role" className="form-select" value={userData.role} onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="LabTech">Lab Technician</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success" text="white">
          <Toast.Body>Registration successful!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Register;
