import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './patient.css';

const PatientList = ({ refresh }) => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:4000/patients');
      setPatients(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch patients. Please try again.');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [refresh]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:4000/patients/${id}/status`, { status });
      setPatients(prevPatients => prevPatients.map(patient => 
        patient.id === id ? { ...patient, status } : patient
      ));
      alert(`Patient status updated to ${status} successfully!`);
      if (status === 'accepted') {
        navigate(`/patient/${id}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update patient status.');
    }
  };

  const handlePaymentStatusChange = async (id, paymentStatus) => {
    try {
      await axios.put(`http://localhost:4000/patients/${id}/payment-status`, { paymentStatus });
      setPatients(prevPatients => prevPatients.map(patient => 
        patient.id === id ? { ...patient, payment_status: paymentStatus } : patient
      ));
      alert(`Payment status updated to ${paymentStatus} successfully!`);
    } catch (error) {
      console.error(error);
      alert('Failed to update payment status.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/patients/${id}`);
      setPatients(prevPatients => prevPatients.filter(patient => patient.id !== id));
      alert('Patient declined and deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete patient.');
    }
  };

  return (
    <div className="accept-test-container">
      <h2>Accept Test</h2>
      <table className="patient-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Test Type</th>
            <th>Sex</th>
            <th>Home Service</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>
                <td>{patient.dob}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{patient.test_type}</td>
                <td>{patient.sex}</td>
                <td>{patient.home_service === 'Yes' ? 'Yes' : 'No'}</td>
                <td>{patient.status}</td>
                <td>{patient.payment_status || 'Expecting Payment'}</td>
                <td>
                  <button className="accept-button" onClick={() => handleStatusChange(patient.id, 'accepted')}>Accept</button>
                  <button className="decline-button" onClick={() => handleDelete(patient.id)}>Decline</button>
                  <div className="payment-status-buttons">
                    <button onClick={() => handlePaymentStatusChange(patient.id, 'Completed')}>Completed</button>
                    <button onClick={() => handlePaymentStatusChange(patient.id, 'Partial')}>Partial</button>
                    <button onClick={() => handlePaymentStatusChange(patient.id, 'Expecting Payment')}>Expecting</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="empty-table">No patients found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
