import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Table, Alert, Spinner, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5; // Number of patients per page
  const [admitDetails, setAdmitDetails] = useState({
    patientId: "",
    wardNumber: "",
    bedNumber: "",
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

      if (Array.isArray(response.data)) {
        setPatients(response.data);
      } else {
        setPatients([]);
      }
    } catch (error) {
      setError("Failed to fetch patients.");
    }
    setLoading(false);
  };

  const admitPatient = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/wards/admit", admitDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Patient admitted successfully.");
      setAdmitDetails({ patientId: "", wardNumber: "", bedNumber: "" });
      fetchPatients();
    } catch (error) {
      setError("Failed to admit patient.");
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
      <h2 className="my-4">Doctor Dashboard</h2>
      <Button variant="danger" onClick={handleLogout} className="mb-3">
        Logout
      </Button>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Ward Admission Form */}
      <h4>Admit Patient to Ward</h4>
      <Form onSubmit={admitPatient} className="mb-4">
        <Form.Group>
          <Form.Label>Patient ID</Form.Label>
          <Form.Control
            type="text"
            value={admitDetails.patientId}
            onChange={(e) =>
              setAdmitDetails({ ...admitDetails, patientId: e.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ward Number</Form.Label>
          <Form.Control
            type="text"
            value={admitDetails.wardNumber}
            onChange={(e) =>
              setAdmitDetails({ ...admitDetails, wardNumber: e.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Bed Number</Form.Label>
          <Form.Control
            type="text"
            value={admitDetails.bedNumber}
            onChange={(e) =>
              setAdmitDetails({ ...admitDetails, bedNumber: e.target.value })
            }
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">
          Admit Patient
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
                <th>Patient ID</th>
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
                    <td>{patient._id}</td>
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
                  <td colSpan="11" className="text-center">
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

export default DoctorDashboard;
