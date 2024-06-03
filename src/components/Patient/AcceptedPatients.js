import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AcceptedPatients.css';
import { Link, useNavigate } from 'react-router-dom';

const AcceptedPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://backend-osa.onrender.com/accepted-patients')
      .then(response => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch accepted patients:', error);
        setError('Failed to fetch accepted patients');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleRowClick = (patient) => {
    navigate('/test-booking', { state: { patient } });
  };

  return (
    <div className="patient-container">
      <h2>Accepted Patients</h2>
      <table className="patient-details-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Test Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id} onClick={() => handleRowClick(patient)}>
              <td>{patient.id}</td>
              <td>{patient.first_name}</td>
              <td>{patient.last_name}</td>
              <td>{patient.dob}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>{patient.test_type}</td>
              <td>{patient.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcceptedPatients;
