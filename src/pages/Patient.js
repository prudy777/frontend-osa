import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './patient.css';

const Patient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`https://backend-osa.onrender.com/patients/${id}`)
      .then(response => {
        setPatient(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch patient details:', error);
        setError('Failed to fetch patient details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="patient-container">
      <h2>Patient Details</h2>
      <table className="patient-details-table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{patient.id}</td>
          </tr>
          <tr>
            <td>First Name</td>
            <td>{patient.first_name}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{patient.last_name}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{patient.dob}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{patient.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{patient.phone}</td>
          </tr>
          <tr>
            <td>Test Type</td>
            <td>{patient.test_type}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{patient.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Patient;
