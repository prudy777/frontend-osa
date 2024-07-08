// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const allowedEmail = 'prudy777@gmail.com';
const allowedPassword = 'progees';

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        clearLocalStorage(); // Clear local storage on app load
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (user && token) {
            console.log('User found in localStorage:', user);
            setCurrentUser(user);
        } else {
            console.log('No user found in localStorage.');
        }
    }, []);

    const login = (userData, token) => {
        if (userData.email === allowedEmail && userData.password === allowedPassword) {
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);
            setCurrentUser(userData);
            console.log('User logged in:', userData);
        } else {
            alert('Invalid credentials');
        }
    };

    const logout = () => {
        clearLocalStorage();
        setCurrentUser(null);
        console.log('User logged out');
    };

    const clearLocalStorage = () => {
        localStorage.clear();
        console.log('Local storage cleared');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, clearLocalStorage }}>
            {children}
        </AuthContext.Provider>
    );
};
