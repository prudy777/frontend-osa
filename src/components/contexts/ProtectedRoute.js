import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // Redirect to the login page if not logged in
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;