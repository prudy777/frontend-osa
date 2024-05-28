import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Assuming you will style it using CSS

const NavBar = () => {
  // State to manage collapse
  const [collapsed, setCollapsed] = useState(true);

  // Function to toggle collapse
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Function to handle window resize
  const handleResize = () => {
    if (window.innerWidth >= 800) {
      setCollapsed(true);
    }
  };

  // Effect to add resize event listener
  useEffect(() => {
    handleResize(); // Call once to initialize state
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container-fluid">
        {window.innerWidth <= 800 && (
          <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
        <div className={`collapse ${(!collapsed && window.innerWidth <= 800) ? 'show' : ''}`} id="navbarToggleExternalContent">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/barcode">Barcode Generator</Link></li>
          </ul>
        </div>
        {/* Always show links above 800px */}
        {(window.innerWidth >= 800 || !collapsed) && (
          <div className="navbar-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/barcode">Barcode Generator</Link></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
