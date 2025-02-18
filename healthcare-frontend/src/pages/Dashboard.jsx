import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Table, Alert, Spinner, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5; // Number of patients per page
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    contact: "",
    wardNumber: "",
    status: "Admitted",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setError("Failed to fetch patients.");
    }
    setLoading(false);
  };

  const registerPatient = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/patients/register", newPatient, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Patient registered successfully.");
      setNewPatient({ name: "", age: "", gender: "", address: "", contact: "", wardNumber: "", status: "Admitted" });
      fetchPatients();
    } catch (error) {
      setError("Failed to register patient.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <h2 className="my-4">Admin Dashboard</h2>
      <Button variant="danger" onClick={handleLogout} className="mb-3">
        Logout
      </Button>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Register Patient Form */}
      <h4>Register Patient</h4>
      <Form onSubmit={registerPatient} className="mb-4">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            value={newPatient.gender}
            onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={newPatient.address}
            onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            value={newPatient.contact}
            onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ward Number</Form.Label>
          <Form.Control
            type="text"
            value={newPatient.wardNumber}
            onChange={(e) => setNewPatient({ ...newPatient, wardNumber: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={newPatient.status}
            onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })}
            required
          >
            <option value="Admitted">Admitted</option>
            <option value="Discharged">Discharged</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-3">
          Register Patient
        </Button>
      </Form>

      {/* Patients Table with Pagination */}
      <h4 className="mt-4">All Patients</h4>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table striped bordered hover className="mt-3">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Ward Number</th>
                <th>Bed Number</th>
                <th>Status</th>
                <th>Registered Date</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.length > 0 ? (
                currentPatients.map((patient, index) => (
                  <tr key={patient._id}>
                    <td>{indexOfFirstPatient + index + 1}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.contact}</td>
                    <td>{patient.address}</td>
                    <td>{patient.wardNumber || "N/A"}</td>
                    <td>{patient.bedNumber || "N/A"}</td>
                    <td>{patient.status}</td>
                    <td>{new Date(patient.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination className="justify-content-center">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
