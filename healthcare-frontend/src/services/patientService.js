import axios from "axios";

const API_URL = "http://localhost:5000/api/patients";

// Function to fetch all patients
export const getAllPatients = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

// Function to register a new patient
export const registerPatient = async (patientData, token) => {
  try {
    const response = await axios.post(`${API_URL}/register`, patientData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error;
  }
};
