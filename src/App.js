// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import DashboardPage from './pages/Dashboard';
import NotFoundPage from './pages/NotFound';
import BarcodeGenerator from './hooks/BarcodeGenerator';
import Register from './hooks/Register';
import PatientList from './components/Patient/PatientList';
import AcceptedPatients from './components/Patient/AcceptedPatients';
import NavBar from './pages/Navbar';
import TestBooking from './components/Test/testList';
import Patient from './pages/Patient';
import TestBookingsList from './pages/Test';
import AccountingPage from './pages/accounting';
import PrintedTests from './pages/master';
import About from './pages/Profile';
import OsamedicLogo from './assets/Osamedic2.jpeg';
import TestBookings from './pages/generalscreening';
import TestBookingmen from './pages/malescreening';
import 'bootstrap/dist/css/bootstrap.min.css';
import OsamedicRecordsb12sitescom from './pages/OsamedicRecordsb12sitescom';
import './App.css'; // Assuming your CSS is in this file


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/barcode" element={<BarcodeGenerator/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/accepted-patients" element={<ProtectedRoute><AcceptedPatients /></ProtectedRoute>} />
            <Route path="/patients" element={<ProtectedRoute><PatientList /></ProtectedRoute>} />
            <Route path="/test-booking" element={<ProtectedRoute><TestBooking /></ProtectedRoute>} />
            <Route path="/test-bookings" element={<ProtectedRoute><TestBookingsList /></ProtectedRoute>} />
            <Route path="/patient/:id" element={<ProtectedRoute><Patient /></ProtectedRoute>} />
            <Route path="/masters" element={<ProtectedRoute><PrintedTests /></ProtectedRoute>} />
            <Route path="/accounting/transactions" element={<ProtectedRoute><AccountingPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><OsamedicRecordsb12sitescom /></ProtectedRoute>} />
            <Route path="/general" element={<ProtectedRoute><TestBookings /></ProtectedRoute>} />
            <Route path="/generals" element={<ProtectedRoute><TestBookingmen /></ProtectedRoute>} />
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
