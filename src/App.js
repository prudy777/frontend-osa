import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './Auth/LoginPage';
import SignupPage from './Auth/SignupPage';
import DashboardPage from './pages/Dashboard';
import ProfilePage from './pages/Profile';
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
import Dashboard from './pages/Dashboard';
import PrintedTests from './pages/master';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Define the backend URL constant
const backendUrl = 'https://your-backend-domain.com'; // Update this with your backend URL

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <div className="main-content">
          <Routes>
            {/* Update the routes to use the backendUrl */}
            <Route path="/barcode" element={<BarcodeGenerator backendUrl={backendUrl} />} />
            <Route path='/register' element={<Register backendUrl={backendUrl} />} />
            <Route path='/accepted-patients' element={<AcceptedPatients backendUrl={backendUrl} />} />
            {/* Update other routes similarly */}
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage backendUrl={backendUrl} />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={<SignupPage backendUrl={backendUrl} />} />
            <Route path="/login" element={<LoginPage backendUrl={backendUrl} />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage backendUrl={backendUrl} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage backendUrl={backendUrl} />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage backendUrl={backendUrl} />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
