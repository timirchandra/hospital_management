import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth"; // Ensure this is set up correctly

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const { token } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (err) {
        setError("Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [token]);

  return (
    <PatientContext.Provider value={{ patients, loading, error }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => React.useContext(PatientContext);
