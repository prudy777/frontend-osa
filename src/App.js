// App.js
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

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/barcode" element={<BarcodeGenerator />} />
            <Route path='/register' element={<Register />} />
            <Route path='/accepted-patients' element={<AcceptedPatients />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/test-booking" element={<TestBooking />} />
            <Route path='/test-bookings' element={<TestBookingsList/>} />
            <Route path="/patient/:id" element={<Patient />} />
            <Route path="/masters" element={<PrintedTests/>}/>
            <Route path='/accounting/transactions' element={<AccountingPage/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
