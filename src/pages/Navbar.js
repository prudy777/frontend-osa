import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Assuming you will style it using CSS

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/barcode">Barcode Generator</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
