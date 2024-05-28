import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Combine CSS styles here

const NavBar = () => {
  // State for collapse and mobile view
  const [collapsed, setCollapsed] = useState(window.innerWidth < 800);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  // Toggle collapse state
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Handle window resize
  const handleResize = () => {
    const isMobileView = window.innerWidth < 800;
    setIsMobile(isMobileView);
    if (!isMobileView) {
      setCollapsed(false); // Ensure collapse is false on larger screens
    }
  };

  // Effect for resize event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // JSX for navigation bar
  return (
    <nav className="navbar">
      <div className="container-fluid">
        {isMobile ? (
          <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>
        ) : null}
        {/* Check collapse state and mobile view */}
        {(isMobile && collapsed) || (!isMobile) ? (
          <ul className={`navbar-nav ${isMobile ? 'mobile-nav' : 'desktop-nav'}`}>
            {/* Links to different pages */}
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/barcode">Barcode Generator</Link></li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
